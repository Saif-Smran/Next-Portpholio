"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Avoid double counting same path or tracking admin routes
    if (
      pathname &&
      pathname !== lastTrackedPath.current &&
      !pathname.startsWith("/admin")
    ) {
      lastTrackedPath.current = pathname;

      try {
        fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: pathname,
            referrer: document.referrer || null,
          }),
        }).catch(() => {});
      } catch (_) {}
    }
  }, [pathname]);

  return null;
}
