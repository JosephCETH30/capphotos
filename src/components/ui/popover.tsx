"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { cn } from "@/lib/utils"

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  React.useEffect(() => {
    // cmdk scrolls its initially-selected item into view before the popup's floating
    // positioner has placed it on screen, and opening/closing the popup can move focus
    // in ways that trigger the browser's default scroll-into-view. Either can escalate
    // to scrolling the whole page instead of just the popup's own list. A capture-phase
    // click listener catches both the trigger (open) and item selection (close) — unlike
    // `onOpenChange`, which Base UI only fires for its own internal transitions, not when
    // a controlled `open` prop is set directly by the consumer (as our pickers do on select).
    function handleClickCapture(event: MouseEvent) {
      const target = event.target as HTMLElement | null
      if (!target?.closest('[data-slot="popover-trigger"], [data-slot="popover-content"]')) return

      const scrollYBeforeTransition = window.scrollY
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (Math.abs(window.scrollY - scrollYBeforeTransition) > 4) {
            window.scrollTo({ top: scrollYBeforeTransition, behavior: "instant" })
          }
        })
      })
    }

    document.addEventListener("click", handleClickCapture, true)
    return () => document.removeEventListener("click", handleClickCapture, true)
  }, [])

  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  // Auto-focusing the popup's first tabbable element on open triggers the browser's
  // native scroll-into-view for a portaled, position:fixed element — on touch devices
  // this jumps the whole page to the top before the popup is even positioned. Only
  // move focus automatically for mouse/keyboard opens, where that scroll never fires.
  initialFocus = ((openType) => openType !== "touch" && openType !== "pen") satisfies NonNullable<
    PopoverPrimitive.Popup.Props["initialFocus"]
  >,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          initialFocus={initialFocus}
          className={cn(
            "z-50 flex w-72 origin-(--transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-0.5 text-sm", className)}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn("font-medium", className)}
      {...props}
    />
  )
}

function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
