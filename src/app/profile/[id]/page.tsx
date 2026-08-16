import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/store/RatingStars";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { id }, select: { name: true } });
  return { title: user?.name ? `${user.name} — Profil` : "Profil" };
}

export default async function PublicProfilePage({ params }: Props) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      avatarUrl: true,
      createdAt: true,
      reviews: {
        where: { status: "published" },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          rating: true,
          title: true,
          body: true,
          createdAt: true,
          store: { select: { slug: true, name: true } },
        },
      },
      storesCreated: {
        select: { id: true, slug: true, name: true, city: true, status: true },
        orderBy: { createdAt: "desc" },
      },
      storesOwned: {
        select: { id: true, slug: true, name: true, city: true, status: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) notFound();

  // A store can show up in both lists (creator == owner) — dedupe by id.
  const storesById = new Map<string, (typeof user.storesCreated)[number]>();
  for (const store of [...user.storesCreated, ...user.storesOwned]) {
    storesById.set(store.id, store);
  }
  const stores = Array.from(storesById.values());

  const fallbackInitial = (user.name ?? "?").charAt(0).toUpperCase();
  const memberSince = new Date(user.createdAt).toLocaleDateString("de-DE", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-sage text-2xl font-semibold text-white">
          {user.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            fallbackInitial
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-earth">{user.name ?? "Unbekannt"}</h1>
          <p className="text-sm text-earth/60">Mitglied seit {memberSince}</p>
        </div>
      </div>

      {stores.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Stores ({stores.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {stores.map((store) => (
              <Link
                key={store.id}
                href={`/stores/${store.slug}`}
                className="flex items-center justify-between rounded-lg border border-sage/10 p-3 hover:bg-sage-50"
              >
                <div>
                  <p className="font-medium text-earth">{store.name}</p>
                  <p className="text-sm text-earth/60">{store.city}</p>
                </div>
                <Badge variant={store.status === "active" ? "success" : "secondary"}>
                  {store.status}
                </Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Bewertungen ({user.reviews.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {user.reviews.length === 0 && (
            <p className="text-sm text-earth/60">Noch keine Bewertungen geschrieben.</p>
          )}
          {user.reviews.map((review) => (
            <div key={review.id} className="rounded-lg border border-sage/10 p-4">
              <div className="flex items-center justify-between">
                <RatingStars rating={review.rating} size="sm" />
                <span className="text-xs text-earth/50">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <Link
                href={`/stores/${review.store.slug}`}
                className="mt-1 block text-sm font-medium text-sage hover:underline"
              >
                {review.store.name}
              </Link>
              {review.title && <p className="mt-1 font-medium text-earth">{review.title}</p>}
              <p className="mt-1 text-sm text-earth/80">{review.body}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}