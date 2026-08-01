import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ storeSlug: string }>;
}

export default async function ClaimStorePage({ params }: PageProps) {
  const { storeSlug } = await params;

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-2xl font-bold text-earth">Claim this store</h1>
      <p className="mt-2 text-earth/70">
        Are you the owner of this store? Submit a claim to get edit access.
      </p>

      <div className="mt-8 space-y-4 rounded-xl border border-sage/10 bg-white p-6">
        <div>
          <label className="text-sm font-medium text-earth">Business email</label>
          <input
            disabled
            placeholder="you@yourstore.com"
            className="mt-1 w-full rounded-lg border border-sage/20 px-3 py-2 text-sm opacity-60"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-earth">Proof of ownership</label>
          <textarea
            disabled
            placeholder="Describe how you can verify ownership (website, invoice, etc.)"
            rows={4}
            className="mt-1 w-full rounded-lg border border-sage/20 px-3 py-2 text-sm opacity-60"
          />
        </div>
        <Button disabled className="w-full">
          Submit claim (Phase 6)
        </Button>
      </div>

      <p className="mt-4 text-center text-sm text-earth/50">
        Store: <code className="text-sage">{storeSlug}</code>
      </p>

      <div className="mt-6 text-center">
        <Link href={`/stores/${storeSlug}`}>
          <Button variant="outline">← Back to store</Button>
        </Link>
      </div>
    </div>
  );
}
