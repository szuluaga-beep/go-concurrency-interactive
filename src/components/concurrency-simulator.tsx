"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ExecutionState {
  isRunning: boolean;
  completedCount: number;
  totalTime: number;
}

type LanguageKey = "go" | "javascript" | "python" | "java";

export default function ConcurrencySimulator() {
  const TASK_COUNT = 10000;
  const TASK_DURATION = 1000; // Duración de cada tarea individual en ms

  const [executions, setExecutions] = useState<
    Record<LanguageKey, ExecutionState>
  >({
    go: { isRunning: false, completedCount: 0, totalTime: 0 },
    javascript: { isRunning: false, completedCount: 0, totalTime: 0 },
    python: { isRunning: false, completedCount: 0, totalTime: 0 },
    java: { isRunning: false, completedCount: 0, totalTime: 0 },
  });

  const runSimulation = (lang: LanguageKey) => {
    if (executions[lang].isRunning) return;

    setExecutions((prev) => ({
      ...prev,
      [lang]: { isRunning: true, completedCount: 0, totalTime: 0 },
    }));

    const startTime = Date.now();

    if (lang === "go" || lang === "java") {
      // Go/Java: Paralelismo real con múltiples threads del CPU
      // Pueden ejecutar todas las tareas en paralelo real
      const endTime = startTime + TASK_DURATION;

      const progressInterval = setInterval(() => {
        const now = Date.now();
        if (now >= endTime) {
          clearInterval(progressInterval);
          setExecutions((prev) => ({
            ...prev,
            [lang]: {
              isRunning: false,
              completedCount: TASK_COUNT,
              totalTime: now - startTime,
            },
          }));
        } else {
          const progress = Math.floor(
            ((now - startTime) / TASK_DURATION) * TASK_COUNT,
          );
          setExecutions((prev) => ({
            ...prev,
            [lang]: {
              isRunning: true,
              completedCount: Math.min(progress, TASK_COUNT),
              totalTime: now - startTime,
            },
          }));
        }
      }, 50);
    } else if (lang === "javascript") {
      // JavaScript: Event Loop con asincronía
      // Tiene overhead por el manejo del Event Loop y la cola de callbacks
      // Simula ~3 segundos (más lento que Go/Java pero más rápido que Python secuencial)
      const jsEndTime = startTime + TASK_DURATION * 3;

      const progressInterval = setInterval(() => {
        const now = Date.now();
        if (now >= jsEndTime) {
          clearInterval(progressInterval);
          setExecutions((prev) => ({
            ...prev,
            [lang]: {
              isRunning: false,
              completedCount: TASK_COUNT,
              totalTime: now - startTime,
            },
          }));
        } else {
          const progress = Math.floor(
            ((now - startTime) / (TASK_DURATION * 3)) * TASK_COUNT,
          );
          setExecutions((prev) => ({
            ...prev,
            [lang]: {
              isRunning: true,
              completedCount: Math.min(progress, TASK_COUNT),
              totalTime: now - startTime,
            },
          }));
        }
      }, 50);
    } else if (lang === "python") {
      // Ejecución secuencial por el GIL
      const tasksPerSecond = TASK_COUNT / 5; // 2000 tareas por segundo en secuencial

      const progressInterval = setInterval(() => {
        const now = Date.now();
        const timeElapsed = now - startTime;
        const completed = Math.floor((timeElapsed / 1000) * tasksPerSecond);

        if (completed >= TASK_COUNT) {
          clearInterval(progressInterval);
          setExecutions((prev) => ({
            ...prev,
            [lang]: {
              isRunning: false,
              completedCount: TASK_COUNT,
              totalTime: now - startTime,
            },
          }));
        } else {
          setExecutions((prev) => ({
            ...prev,
            [lang]: {
              isRunning: true,
              completedCount: completed,
              totalTime: now - startTime,
            },
          }));
        }
      }, 50);
    }
  };

  const resetAll = () => {
    setExecutions({
      go: { isRunning: false, completedCount: 0, totalTime: 0 },
      javascript: { isRunning: false, completedCount: 0, totalTime: 0 },
      python: { isRunning: false, completedCount: 0, totalTime: 0 },
      java: { isRunning: false, completedCount: 0, totalTime: 0 },
    });
  };

  const languages: Array<{
    key: LanguageKey;
    label: string;
    color: string;
    description: string;
  }> = [
    {
      key: "go",
      label: "Go",
      color: "bg-green-600/10 border-green-600",
      description: "Paralelo real",
    },
    {
      key: "javascript",
      label: "JavaScript",
      color: "bg-yellow-600/10 border-yellow-600",
      description: "Asíncrono (Event Loop)",
    },
    {
      key: "python",
      label: "Python",
      color: "bg-red-600/10 border-red-600",
      description: "Secuencial (GIL)",
    },
    {
      key: "java",
      label: "Java",
      color: "bg-orange-600/10 border-orange-600",
      description: "Paralelo real",
    },
  ];

  const getProgressPercentage = (lang: LanguageKey) => {
    return (executions[lang].completedCount / TASK_COUNT) * 100;
  };

  const getTimeDisplay = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-600/10 border border-blue-600 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Simulando {TASK_COUNT.toLocaleString()} tareas</strong> que
          cada una toma {TASK_DURATION}ms
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {languages.map(({ key, label, color, description }) => {
          const execution = executions[key];
          const percentage = getProgressPercentage(key);

          return (
            <div key={key} className={`rounded-lg border-2 p-6 ${color}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{label}</h3>
                <span className="text-xs bg-muted px-2 py-1 rounded">
                  {description}
                </span>
              </div>

              <div className="space-y-4">
                {/* Progress bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium">
                      {execution.completedCount.toLocaleString()} /{" "}
                      {TASK_COUNT.toLocaleString()}
                    </p>
                    <p className="text-sm font-medium">
                      {percentage.toFixed(1)}%
                    </p>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        key === "go"
                          ? "bg-green-500"
                          : key === "javascript"
                            ? "bg-yellow-500"
                            : key === "python"
                              ? "bg-red-500"
                              : "bg-orange-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                {/* Time display */}
                <div>
                  {execution.totalTime > 0 && (
                    <p className="text-sm">
                      <span className="font-semibold">Tiempo:</span>{" "}
                      <span className="text-lg font-bold">
                        {getTimeDisplay(execution.totalTime)}
                      </span>
                    </p>
                  )}
                </div>

                {/* Button */}
                <Button
                  onClick={() => runSimulation(key)}
                  disabled={execution.isRunning}
                  className="w-full"
                  variant={execution.isRunning ? "outline" : "default"}
                >
                  {execution.isRunning ? "Ejecutando..." : "Ejecutar"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <Button onClick={resetAll} variant="outline" className="w-full">
        Reiniciar Todo
      </Button>

      <div className="p-4 bg-muted rounded-lg space-y-3">
        <p className="text-sm text-muted-foreground">
          <strong>¿Qué observas?</strong>
        </p>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>
            <strong>Go y Java:</strong> Completan ~1 segundo con paralelismo
            real (10,000 goroutines/threads ejecutándose simultáneamente)
          </li>
          <li>
            <strong>JavaScript:</strong> Completan ~3 segundos. El Event Loop
            maneja asincronía pero tiene overhead al procesar 10,000 callbacks
            en cola
          </li>
          <li>
            <strong>Python:</strong> Tarda ~5 segundos ejecutando de forma
            secuencial (el GIL bloquea el paralelismo real)
          </li>
          <li>
            JavaScript es bueno para I/O asíncrono, pero Go/Java son superiores
            cuando necesitas manejar miles de tareas concurrentes
          </li>
        </ul>
      </div>

      <div className="p-4 bg-blue-600/10 border border-blue-600 rounded-lg space-y-3">
        <p className="text-sm font-semibold text-foreground">
          ⚠️ ¿Por qué Go es mejor que JavaScript aquí?
        </p>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            <strong>1. Escalabilidad:</strong> Go puede manejar{" "}
            <strong>millones</strong> de goroutines simultáneas con bajo uso de
            memoria. JavaScript tiene límites en la cola del Event Loop.
          </p>
          <p>
            <strong>2. Tareas CPU-bound:</strong> Si estas 10,000 tareas
            requieren cálculos intensivos:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>
              <strong>Go:</strong> Usa todos los cores del CPU simultáneamente
            </li>
            <li>
              <strong>JavaScript:</strong> Se bloquea completamente en un solo
              thread (salvo Workers, más complejo)
            </li>
          </ul>
          <p>
            <strong>3. Simplicidad:</strong> En Go, la concurrencia es nativa
            (goroutines + channels). En JavaScript necesitas manejar Promises,
            async/await, o Workers.
          </p>
        </div>
      </div>

      <div className="p-4 bg-green-600/10 border border-green-600 rounded-lg space-y-3">
        <p className="text-sm font-semibold text-foreground">
          📚 Recursos para entender mejor
        </p>
        <div className="text-sm text-muted-foreground space-y-2">
          <div>
            <p className="font-semibold text-foreground mb-1">
              Concurrencia vs Paralelismo:
            </p>
            <ul className="list-none space-y-1 ml-2">
              <li>
                🔗{" "}
                <a
                  href="https://go.dev/blog/waza-talk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Concurrency is not Parallelism - Rob Pike
                </a>
              </li>
              <li>
                🎥{" "}
                <a
                  href="https://www.youtube.com/watch?v=oV9rvDllKEg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Concurrency vs Parallelism Explained
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1">
              Event Loop de JavaScript:
            </p>
            <ul className="list-none space-y-1 ml-2">
              <li>
                🎥{" "}
                <a
                  href="https://www.youtube.com/watch?v=8aGhZQkoFbQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  What the heck is the event loop anyway? - Philip Roberts
                </a>
              </li>
              <li>
                🔗{" "}
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  MDN: Event Loop Documentation
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1">
              Goroutines en Go:
            </p>
            <ul className="list-none space-y-1 ml-2">
              <li>
                🔗{" "}
                <a
                  href="https://go.dev/tour/concurrency/1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  A Tour of Go - Goroutines
                </a>
              </li>
              <li>
                🎥{" "}
                <a
                  href="https://www.youtube.com/watch?v=f6kdp27TYZs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  GopherCon 2018: The Scheduler Saga
                </a>
              </li>
              <li>
                🔗{" "}
                <a
                  href="https://gobyexample.com/goroutines"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Go by Example: Goroutines
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1">
              Comparación profunda:
            </p>
            <ul className="list-none space-y-1 ml-2">
              <li>
                🔗{" "}
                <a
                  href="https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Node.js: Don&apos;t Block the Event Loop
                </a>
              </li>
              <li>
                🔗{" "}
                <a
                  href="https://go.dev/doc/effective_go#concurrency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Effective Go - Concurrency
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1">
              Cuándo usar cada uno:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                <strong>JavaScript:</strong> APIs web, apps en tiempo real,
                servidores I/O-heavy
              </li>
              <li>
                <strong>Go:</strong> Microservicios, procesamiento de datos,
                sistemas distribuidos, apps CPU-heavy
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
