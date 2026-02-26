"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

/**
 * GoogleAuthSync
 *
 * Invisible component. After a successful Google sign-in,
 * it calls /api/auth/google-sync ONCE to mint our httpOnly 'token' cookie.
 *
 * We use sessionStorage to avoid re-syncing on every page navigation.
 * The sync flag is cleared on logout (session becomes null).
 */
export default function GoogleAuthSync() {
    const { data: session, status } = useSession();
    const isSyncing = useRef(false);

    useEffect(() => {
        // Not authenticated — clear flag so next login re-syncs
        if (status === "unauthenticated") {
            sessionStorage.removeItem("google_synced");
            isSyncing.current = false;
            return;
        }

        // Wait until session is resolved
        if (status !== "authenticated") return;

        // Already synced this browser session
        if (sessionStorage.getItem("google_synced") === "1") return;

        // Already running a sync request
        if (isSyncing.current) return;

        isSyncing.current = true;

        fetch("/api/auth/google-sync", { method: "POST" })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    console.log("[Google Auth] Token cookie synced ✓");
                    sessionStorage.setItem("google_synced", "1");
                } else {
                    console.warn("[Google Auth] Sync response:", data.error);
                }
            })
            .catch((err) => {
                console.error("[Google Auth] Sync failed:", err.message);
            })
            .finally(() => {
                isSyncing.current = false;
            });
    }, [status, session]);

    return null;
}
