"use client";

import { useEffect } from "react";

/**
 * Keys written by the removed per-item progress tracking. Nothing reads them any
 * more, so this clears them from browsers that used the site before the removal.
 * Safe to delete once visitors have loaded the site again.
 */
const RETIRED_KEYS = ["jij.modules.v1", "jij.lessons.completed.v1"];

export function LegacyStorageCleanup() {
  useEffect(() => {
    try {
      for (const key of RETIRED_KEYS) window.localStorage.removeItem(key);
    } catch {
      /* storage may be unavailable */
    }
  }, []);

  return null;
}
