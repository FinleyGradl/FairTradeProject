import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Store, MapPin, Clock, Camera } from "lucide-react";

const STEPS = [
  { icon: Store, title: "Basics", desc: "Name, description, categories, fair-trade badges" },
  { icon: MapPin, title: "Location", desc: "Address with map pin placement" },
  { icon: Clock, title: "Hours", desc: "Opening hours for each day of the week" },
  { icon: Camera, title: "Photos", desc: "Storefront and product images" },
];

export default function AddStorePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold text-earth">Add a fair-trade store</h1>
      <p className="mt-2 text-earth/70">
        Help grow the directory by submitting a store in your area. Listings are reviewed
        before going live.
      </p>

      <div className="mt-8 space-y-4">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className="flex items-start gap-4 rounded-xl border border-sage/10 bg-white p-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sage-100">
              <step.icon className="h-5 w-5 text-sage" />
            </div>
            <div>
              <p className="text-xs font-medium text-sage">Step {i + 1}</p>
              <p className="font-semibold text-earth">{step.title}</p>
              <p className="text-sm text-earth/70">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <strong>Prototype note:</strong> The full add-store wizard with auth, geocoding, and
        image upload is planned for Phase 4. Sign-in will be required before submission.
      </div>

      <div className="mt-6 flex gap-3">
        <Button disabled>Start wizard (coming soon)</Button>
        <Link href="/explore">
          <Button variant="outline">Browse existing stores</Button>
        </Link>
      </div>
    </div>
  );
}
