"use client";

import { Clock, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTimer, scheduleItems } from "@/contexts/timer-context";

export function CompactScheduleTimer() {
  const {
    currentTime,
    isRunning,
    currentItemIndex,
    toggleRunning,
    reset,
    getCurrentItemTimeLeft,
    getProgress,
  } = useTimer();

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const currentItem = scheduleItems[currentItemIndex];
  const timeLeft = getCurrentItemTimeLeft();
  const progress = getProgress();

  return (
    <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <div className="flex flex-col">
                <span className="text-xs font-medium tabular-nums text-foreground">
                  {formatTime(currentTime)}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {currentItem?.title || "Workshop"}
                </span>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            <div className="space-y-2">
              <p className="text-sm font-semibold">{currentItem?.title}</p>
              <p className="text-xs text-muted-foreground">
                {currentItem?.description}
              </p>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Progreso</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Tiempo restante: {formatTime(timeLeft)}
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                Sesión {currentItemIndex + 1} de {scheduleItems.length}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex items-center gap-1">
        <Button
          size="sm"
          variant="ghost"
          onClick={toggleRunning}
          className="h-6 w-6 p-0"
        >
          {isRunning ? (
            <Pause className="h-3 w-3" />
          ) : (
            <Play className="h-3 w-3" />
          )}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={reset}
          className="h-6 w-6 p-0"
        >
          <RotateCcw className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
