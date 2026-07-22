import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function SaveLoginPrompt() {
  return (
    <Card className="border-dashed bg-muted/30 shadow-none">
      <CardContent className="flex flex-col items-center gap-4 py-2 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-medium">Want to keep this photo?</p>
          <p className="text-sm text-muted-foreground">
            Log in to save your edits to your dashboard — editing and downloading is always free, no account needed.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:shrink-0">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            nativeButton={false}
            render={<Link href="/login" />}
          >
            Log in
          </Button>
          <Button className="w-full sm:w-auto" nativeButton={false} render={<Link href="/signup" />}>
            Sign up
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
