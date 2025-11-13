"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { CompactScheduleTimer } from "@/components/compact-schedule-timer";

export function LayoutHeader() {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-border bg-card p-2">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="font-semibold text-foreground">Concurrencia en Go</h1>
      </div>
      <CompactScheduleTimer />
    </div>
  );
}
