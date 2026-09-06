// src/i18n/navigation.ts
//
// Locale-bewusste Ersatzstücke für next/link, next/navigation etc.
// Überall im Code, wo bisher `next/link` (Link) oder `next/navigation`
// (usePathname, useRouter, redirect) importiert wurde, ab jetzt von hier
// importieren — das Präfix (/de, /en) wird dann automatisch mitgeführt.
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
