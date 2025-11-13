"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";
import { useTimer, scheduleItems } from "@/contexts/timer-context";

export function ScheduleTimer() {
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
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Timer del Workshop</h2>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={toggleRunning}
            >
              {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button size="sm" variant="outline" onClick={reset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tiempo total transcurrido */}
        <div className="flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Tiempo transcurrido</p>
            <p className="text-5xl font-bold tabular-nums tracking-tight text-foreground">
              {formatTime(currentTime)}
            </p>
          </div>
        </div>

        {/* Item actual */}
        {currentItem && (
          <div className="space-y-4">
            <div className="rounded-lg border-2 border-primary/30 bg-background/50 p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Sesión actual
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {currentItem.time}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-foreground">
                  {currentItem.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {currentItem.description}
                </p>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Progreso</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-primary transition-all duration-1000 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Tiempo restante */}
                <div className="flex items-center justify-between rounded-lg bg-accent/10 px-3 py-2">
                  <span className="text-sm font-medium text-foreground">
                    Tiempo restante:
                  </span>
                  <span className="text-lg font-bold tabular-nums text-foreground">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>
            </div>

            {/* Siguiente sesión */}
            {currentItemIndex < scheduleItems.length - 1 && (
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  Siguiente:
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">
                    {scheduleItems[currentItemIndex + 1].title}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {scheduleItems[currentItemIndex + 1].time}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Indicador de progreso general */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Progreso del workshop</span>
            <span>
              Sesión {currentItemIndex + 1} de {scheduleItems.length}
            </span>
          </div>
          <div className="flex gap-1">
            {scheduleItems.map((item, idx) => (
              <div
                key={item.id}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  idx < currentItemIndex
                    ? "bg-primary"
                    : idx === currentItemIndex
                      ? "bg-accent"
                      : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
