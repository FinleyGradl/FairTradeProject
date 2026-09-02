// path: src/lib/validators/product.ts
import { z } from "zod";

export const productBaseSchema = z.object({
  name: z.string().min(2).max(120),
  description: z.string().max(2000).optional().or(z.literal("")),
  price: z.number().min(0).max(1_000_000).optional().nullable(),
  currency: z.string().length(3).default("EUR"),
  category: z.string().max(60).optional().or(z.literal("")),
  // Either a full external URL, or one of our own uploaded-file paths —
  // mirrors storeBaseSchema.coverImage in lib/validators/store.ts.
  imageUrl: z
    .string()
    .refine((v) => v.startsWith("/api/uploads/") || z.string().url().safeParse(v).success, {
      message: "Ungültige Bild-URL.",
    })
    .optional()
    .or(z.literal("")),
  inStock: z.boolean().default(true),
});

export const productCreateSchema = productBaseSchema;
export const productUpdateSchema = productBaseSchema.partial();

// Deliberately the same field set as productBaseSchema (minus currency,
// which never changes once set) — unlike storeEditSuggestionSchema, there's
// no smaller "safe" subset here since every product field is the kind of
// thing an outside visitor might reasonably notice (price changed, back in
// stock, wrong description, ...).
export const productSuggestionFieldsSchema = z.object({
  name: productBaseSchema.shape.name.optional(),
  description: z.string().max(2000).optional().or(z.literal("")),
  price: z.number().min(0).max(1_000_000).optional().nullable(),
  category: z.string().max(60).optional().or(z.literal("")),
  imageUrl: productBaseSchema.shape.imageUrl,
  inStock: z.boolean().optional(),
});

export const productSuggestionSchema = z
  .object({
    type: z.enum(["create", "edit", "delete"]),
    productId: z.string().optional(),
    note: z.string().max(500).optional().or(z.literal("")),
  })
  .and(productSuggestionFieldsSchema)
  .refine((data) => data.type === "create" || Boolean(data.productId), {
    message: "Für „bearbeiten“/„löschen“ wird ein Produkt benötigt.",
    path: ["productId"],
  })
  .refine(
    (data) =>
      data.type !== "edit" ||
      Object.entries(data).some(
        ([key, value]) => !["type", "productId", "note"].includes(key) && value !== undefined
      ),
    { message: "Bitte ändere mindestens ein Feld." }
  )
  .refine((data) => data.type !== "create" || Boolean(data.name), {
    message: "Bitte gib einen Namen an.",
    path: ["name"],
  });

export const productSuggestionVoteSchema = z.object({
  vote: z.enum(["confirm", "dispute"]),
});

export const productReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  title: z.string().max(120).optional(),
  body: z.string().min(10).max(2000),
});

export const productsQuerySchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  store_id: z.string().optional(),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
  radius: z.coerce.number().min(1).max(300).default(15),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(20),
});

export type ProductCreateInput = z.infer<typeof productCreateSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
export type ProductSuggestionInput = z.infer<typeof productSuggestionSchema>;
export type ProductReviewInput = z.infer<typeof productReviewSchema>;
export type ProductsQuery = z.infer<typeof productsQuerySchema>;
