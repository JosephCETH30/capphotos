"use client";

import { useEffect, useState } from "react";
import { Bug, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const IDLE_MS = 10_000;
const BUG_REPORT_URL = "https://www.instagram.com/yosephrafaell/";
const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "touchstart", "scroll", "wheel"] as const;

export function BugReportIdlePrompt() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Once shown, stop tracking activity — the point is to catch a user who's paused, not to
    // chase or hide the prompt out from under them the moment they move the mouse to read it.
    if (dismissed || visible) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    function resetTimer() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setVisible(true), IDLE_MS);
    }

    resetTimer();
    ACTIVITY_EVENTS.forEach((event) => window.addEventListener(event, resetTimer, { passive: true }));

    return () => {
      clearTimeout(timeoutId);
      ACTIVITY_EVENTS.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [dismissed, visible]);

  if (!visible || dismissed) return null;

  return (
    <Card className="fixed right-4 bottom-4 z-50 w-[min(20rem,calc(100vw-2rem))] shadow-lg">
      <CardContent className="relative flex items-start gap-3 py-2 pr-6">
        <Bug className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
        <p className="text-sm">
          <span className="font-medium">Found an error or bug?</span>{" "}
          <span className="text-muted-foreground">Let Yoseph know on</span>{" "}
          <a
            href={BUG_REPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-2"
          >
            Instagram
          </a>
          <span className="text-muted-foreground">.</span>
        </p>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="absolute top-1 right-1"
          onClick={() => setDismissed(true)}
        >
          <X className="size-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </CardContent>
    </Card>
  );
}
