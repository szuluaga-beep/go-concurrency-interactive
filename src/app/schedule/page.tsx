"use client";

import { Card } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { ScheduleTimer } from "@/components/schedule-timer";

export default function SchedulePage() {
  const scheduleItems = [
    {
      id: "threads",
      time: "11:00 - 11:10",
      title: "Threads & Concurrencia",
      description:
        "Fundamentos de threads del CPU y diferencia entre concurrencia y paralelismo",
      type: "theory",
    },
    {
      id:"problems-with-concurrency",
      time: "11:10 - 11:20",
      title: "Problemas con la Concurrencia",
      description:
        "Condiciones de carrera, deadlocks y otros desafíos comunes en programación concurrente",
      type: "theory",
    },
    {
      id: "why-go",
      time: "11:20 - 11:25",
      title: "¿Por qué Go?",
      description:
        "Ventajas de Go para programación concurrente y su modelo de concurrencia",
      type: "theory",
    },
    {
      id: "visualization",
      time: "11:25 - 11:30",
      title: "Visualización Interactiva",
      description:
        "Exploración de simuladores de concurrencia y ejercicios prácticos",
      type: "hands-on",
    },
    {
      id: "goroutines",
      time: "11:30 - 11:45",
      title: "Goroutines",
      description:
        "Introducción a goroutines: creación, manejo y mejores prácticas",
      type: "hands-on",
    },
    {
      id: "channels",
      time: "11:45 - 12:00",
      title: "Channels",
      description:
        "Comunicación entre goroutines usando channels y patrones comunes",
      type: "hands-on",
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "intro":
        return "border-l-4 border-l-info bg-info/5";
      case "theory":
        return "border-l-4 border-l-primary bg-primary/5";
      case "hands-on":
        return "border-l-4 border-l-accent bg-accent/5";
      case "break":
        return "border-l-4 border-l-secondary bg-secondary/5";
      case "closing":
        return "border-l-4 border-l-purple-500 bg-purple-500/5";
      default:
        return "";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "intro":
        return "Introducción";
      case "theory":
        return "Teoría";
      case "hands-on":
        return "Práctica";
      case "break":
        return "Descanso";
      case "closing":
        return "Cierre";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Cronograma del Workshop
          </h1>
          <p className="text-lg text-muted-foreground">
            Agenda completa del espacio Concurrencia en Go
          </p>
        </div>

        {/* Workshop Info */}
        <Card className="border-border bg-card p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Fecha</p>
                <p className="text-sm text-muted-foreground">
                  14 de Noviembre 2025
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Clock className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Duración</p>
                <p className="text-sm text-muted-foreground">1 hora</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Timer */}
        <ScheduleTimer />

        {/* Legend */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Teoría</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-accent" />
            <span className="text-sm text-muted-foreground">Práctica</span>
          </div>
        </div>

        {/* Schedule Timeline */}
        <div className="space-y-4">
          {scheduleItems.map((item) => (
            <Card
              key={item.id}
              className={`overflow-hidden border-border ${getTypeColor(
                item.type
              )} transition-shadow hover:shadow-md`}
            >
              <div className="p-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center rounded-full bg-background px-3 py-1 text-xs font-medium text-foreground">
                        {item.time}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-background/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                        {getTypeLabel(item.type)}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
