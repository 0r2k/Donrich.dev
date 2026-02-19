"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { trackPlausibleEvent } from "@/lib/analytics/plausible";

const SCROLL_THRESHOLDS = [50, 75, 100] as const;
const SESSION_MILESTONES_SECONDS = [30, 60, 120, 300] as const;

function getDurationBucket(seconds: number) {
  if (seconds < 30) return "<30s";
  if (seconds < 60) return "30-59s";
  if (seconds < 120) return "1-2m";
  if (seconds < 300) return "2-5m";
  if (seconds < 600) return "5-10m";
  return "10m+";
}

export function SiteAnalytics() {
  const pathname = usePathname();
  const sessionStartRef = useRef<number | null>(null);
  const sentMilestonesRef = useRef<Set<number>>(new Set());
  const sentSessionDurationRef = useRef(false);

  useEffect(() => {
    if (sessionStartRef.current === null) {
      sessionStartRef.current = Date.now();
    }
  }, []);

  useEffect(() => {
    const reachedThresholds = new Set<number>();

    const handleScroll = () => {
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const depth = Math.min(100, Math.round((window.scrollY / maxScroll) * 100));

      SCROLL_THRESHOLDS.forEach((threshold) => {
        if (depth >= threshold && !reachedThresholds.has(threshold)) {
          reachedThresholds.add(threshold);
          trackPlausibleEvent("Scroll Reach", {
            percent: threshold,
            path: pathname
          });
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (sessionStartRef.current === null) {
      sessionStartRef.current = Date.now();
    }

    const intervalId = window.setInterval(() => {
      if (sessionStartRef.current === null) {
        return;
      }

      const seconds = Math.floor((Date.now() - sessionStartRef.current) / 1000);

      SESSION_MILESTONES_SECONDS.forEach((milestone) => {
        if (seconds >= milestone && !sentMilestonesRef.current.has(milestone)) {
          sentMilestonesRef.current.add(milestone);
          trackPlausibleEvent("Session Milestone", {
            seconds: milestone
          });
        }
      });
    }, 1_000);

    const sendFinalSessionDuration = () => {
      if (sentSessionDurationRef.current) {
        return;
      }

      if (sessionStartRef.current === null) {
        return;
      }

      sentSessionDurationRef.current = true;
      const seconds = Math.max(1, Math.floor((Date.now() - sessionStartRef.current) / 1000));

      trackPlausibleEvent("Session Duration", {
        seconds,
        bucket: getDurationBucket(seconds)
      });
    };

    window.addEventListener("pagehide", sendFinalSessionDuration);
    window.addEventListener("beforeunload", sendFinalSessionDuration);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("pagehide", sendFinalSessionDuration);
      window.removeEventListener("beforeunload", sendFinalSessionDuration);
    };
  }, []);

  return null;
}
