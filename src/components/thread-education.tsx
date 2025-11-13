"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

type Message = {
  id: number;
  from: number;
  to: number;
  progress: number;
};

type Process = {
  id: number;
  state: "idle" | "sending" | "receiving" | "processing";
  progress: number;
};

export function ThreadEducation() {
  return (
    <div className="space-y-6">
      {/* Definiciones */}
      <Card>
        <CardHeader>
          <CardTitle>Conceptos Clave</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 p-3">
            <h4 className="font-semibold text-sm">Thread</h4>
            <p className="text-sm text-muted-foreground">
              Unidad de ejecución. Cada thread ejecuta código
              independientemente.
            </p>
          </div>

          <div className="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/20 p-3">
            <h4 className="font-semibold text-sm">CPU Core</h4>
            <p className="text-sm text-muted-foreground">
              Puede ejecutar 1 thread a la vez. Múltiples cores = ejecución
              paralela real.
            </p>
          </div>

          <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-3">
            <h4 className="font-semibold text-sm">Context Switching</h4>
            <p className="text-sm text-muted-foreground">
              El SO cambia entre threads rápidamente cuando hay más threads que
              cores.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Concurrencia vs Paralelismo - Interactive */}
      <Card>
        <CardHeader>
          <CardTitle>Concurrencia vs Paralelismo</CardTitle>
          <CardDescription>
            Visualización interactiva de procesos comunicándose (CSP)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="concurrency" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="concurrency">Concurrencia</TabsTrigger>
              <TabsTrigger value="parallelism">Paralelismo</TabsTrigger>
            </TabsList>

            <TabsContent value="concurrency" className="space-y-4">
              <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">
                  1 Core - Procesos alternando ejecución
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Los procesos se comunican pero solo uno ejecuta a la vez
                  (context switching)
                </p>
                <ConcurrencyVisualizer />
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold mb-1">
                    ¿Qué es la Concurrencia?
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Es la capacidad de <strong>estructurar un programa</strong> para que múltiples
                    tareas <strong>progresen de forma independiente</strong>, aunque no necesariamente
                    se ejecuten al mismo tiempo. Es como un chef que cocina varios platillos:
                    mientras algo hierve, puede picar verduras; mientras el horno calienta, puede
                    preparar la salsa.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-1">
                    Context Switching en acción
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Con un solo core, el CPU cambia rápidamente entre procesos (cada ~300ms en la
                    visualización). El proceso activo (amarillo) ejecuta un poco de trabajo, luego
                    el CPU cambia al siguiente. Aunque solo uno ejecuta a la vez, todos avanzan
                    "simultáneamente" desde nuestra perspectiva.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-1">
                    ¿Cuándo usar Concurrencia?
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Ideal para tareas I/O-bound</strong> (operaciones que esperan): peticiones
                    web, lectura de archivos, consultas a base de datos. Mientras un proceso espera
                    respuesta, otro puede trabajar. No necesitas múltiples cores para beneficiarte.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="parallelism" className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">
                  4 Cores - Ejecución simultánea real
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Todos los procesos ejecutan al mismo tiempo en cores
                  diferentes
                </p>
                <ParallelismVisualizer />
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold mb-1">
                    ¿Qué es el Paralelismo?
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Es la capacidad de <strong>ejecutar múltiples tareas literalmente al mismo
                    tiempo</strong> usando diferentes cores del CPU. Es como tener 4 chefs en la
                    cocina: cada uno puede trabajar en un platillo diferente simultáneamente.
                    Mientras el chef 1 pica verduras, el chef 2 cocina pasta, el chef 3 prepara
                    la salsa, y el chef 4 hornea el pan, todo al mismo tiempo.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-1">
                    Ejecución simultánea real
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Cada proceso (P0, P1, P2, P3) tiene su propio core dedicado. No hay context
                    switching ni esperas. Todos ejecutan continuamente y avanzan a su máxima
                    velocidad. Las barras de progreso avanzan simultáneamente porque realmente
                    están trabajando en paralelo.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-1">
                    ¿Cuándo usar Paralelismo?
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Ideal para tareas CPU-bound</strong> (cálculo intensivo): procesamiento
                    de imágenes, cálculos matemáticos complejos, compilación de código, renderizado
                    de video. Aquí sí necesitas múltiples cores físicos para obtener el beneficio
                    de velocidad.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* CSP Explanation */}
      <Card className="border-l-4 border-primary">
        <CardHeader>
          <CardTitle className="text-base">
            CSP: Communicating Sequential Processes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            Go está basado en el modelo{" "}
            <strong>CSP de Tony Hoare (1978)</strong>:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>
              Procesos secuenciales independientes (goroutines) que se comunican
            </li>
            <li>
              Comunicación a través de canales (channels), no memoria compartida
            </li>
            <li>"No compartas memoria comunicándote; comunícate compartiendo memoria"</li>
            <li>Sincronización automática al enviar/recibir por canales</li>
          </ul>
        </CardContent>
      </Card>

     
    </div>
  );
}

function ConcurrencyVisualizer() {
  const [isRunning, setIsRunning] = useState(false);
  const [processes, setProcesses] = useState<Process[]>([
    { id: 0, state: "idle", progress: 0 },
    { id: 1, state: "idle", progress: 0 },
    { id: 2, state: "idle", progress: 0 },
  ]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeProcessIndex, setActiveProcessIndex] = useState(0);
  const messageIdRef = useRef(0);
  const isRunningRef = useRef(false);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (!isRunningRef.current) return;

      setActiveProcessIndex((prev) => (prev + 1) % 3);

      // Update active process
      setProcesses((prev) =>
        prev.map((p, idx) => {
          if (idx === activeProcessIndex) {
            const newProgress = (p.progress + 20) % 100;
            // Send message when process completes a cycle
            if (newProgress < p.progress) {
              const targetId = (p.id + 1) % 3;
              setMessages((msgs) => [
                ...msgs,
                {
                  id: messageIdRef.current++,
                  from: p.id,
                  to: targetId,
                  progress: 0,
                },
              ]);
              return { ...p, state: "sending" as const, progress: newProgress };
            }
            return { ...p, state: "processing" as const, progress: newProgress };
          }
          return { ...p, state: "idle" as const };
        })
      );

      // Update messages
      setMessages((prev) =>
        prev
          .map((msg) => ({ ...msg, progress: msg.progress + 10 }))
          .filter((msg) => msg.progress <= 100)
      );
    }, 300);

    return () => clearInterval(interval);
  }, [isRunning, activeProcessIndex]);

  const handleReset = () => {
    setIsRunning(false);
    setProcesses([
      { id: 0, state: "idle", progress: 0 },
      { id: 1, state: "idle", progress: 0 },
      { id: 2, state: "idle", progress: 0 },
    ]);
    setMessages([]);
    setActiveProcessIndex(0);
    messageIdRef.current = 0;
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-center">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>
        <Button size="sm" variant="outline" onClick={handleReset}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      <svg viewBox="0 0 400 200" className="w-full h-48 border rounded-lg bg-white dark:bg-gray-900">
        {/* CPU Core indicator */}
        <rect x="10" y="10" width="380" height="30" rx="4" fill="rgba(234, 179, 8, 0.1)" stroke="rgb(234, 179, 8)" strokeWidth="2" />
        <text x="200" y="30" textAnchor="middle" className="fill-yellow-700 dark:fill-yellow-400 text-xs font-semibold">
          CPU Core (1 proceso activo a la vez)
        </text>

        {/* Processes */}
        {processes.map((proc, idx) => {
          const x = 50 + idx * 120;
          const y = 80;
          const isActive = idx === activeProcessIndex && isRunning;

          return (
            <g key={proc.id}>
              {/* Process circle */}
              <circle
                cx={x}
                cy={y}
                r="25"
                fill={isActive ? "rgb(234, 179, 8)" : "rgb(156, 163, 175)"}
                stroke={isActive ? "rgb(202, 138, 4)" : "rgb(107, 114, 128)"}
                strokeWidth="3"
              />
              <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                className="fill-white text-sm font-bold"
              >
                P{proc.id}
              </text>

              {/* Progress bar */}
              <rect
                x={x - 20}
                y={y + 35}
                width="40"
                height="6"
                rx="3"
                fill="rgba(156, 163, 175, 0.3)"
              />
              <rect
                x={x - 20}
                y={y + 35}
                width={(proc.progress / 100) * 40}
                height="6"
                rx="3"
                fill="rgb(34, 197, 94)"
              />

              {/* State label */}
              <text
                x={x}
                y={y + 55}
                textAnchor="middle"
                className="fill-gray-600 dark:fill-gray-400 text-xs"
              >
                {isActive ? "Ejecutando" : "Esperando"}
              </text>
            </g>
          );
        })}

        {/* Messages/Channels */}
        {messages.map((msg) => {
          const fromX = 50 + msg.from * 120;
          const toX = 50 + msg.to * 120;
          const y = 80;
          const currentX = fromX + ((toX - fromX) * msg.progress) / 100;

          return (
            <g key={msg.id}>
              {/* Channel line */}
              <line
                x1={fromX + 25}
                y1={y}
                x2={toX - 25}
                y2={y}
                stroke="rgb(99, 102, 241)"
                strokeWidth="2"
                strokeDasharray="4 2"
                opacity="0.5"
              />
              {/* Message packet */}
              <circle cx={currentX} cy={y} r="5" fill="rgb(99, 102, 241)" />
            </g>
          );
        })}
      </svg>

      <p className="text-xs text-center text-muted-foreground">
        Context switching: Solo un proceso ejecuta a la vez en el único core disponible
      </p>
    </div>
  );
}

function ParallelismVisualizer() {
  const [isRunning, setIsRunning] = useState(false);
  const [processes, setProcesses] = useState<Process[]>([
    { id: 0, state: "idle", progress: 0 },
    { id: 1, state: "idle", progress: 0 },
    { id: 2, state: "idle", progress: 0 },
    { id: 3, state: "idle", progress: 0 },
  ]);
  const isRunningRef = useRef(false);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (!isRunningRef.current) return;

      setProcesses((prev) =>
        prev.map((p) => {
          const newProgress = (p.progress + 5) % 100;
          return {
            ...p,
            state: "processing" as const,
            progress: newProgress,
          };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setProcesses([
      { id: 0, state: "idle", progress: 0 },
      { id: 1, state: "idle", progress: 0 },
      { id: 2, state: "idle", progress: 0 },
      { id: 3, state: "idle", progress: 0 },
    ]);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-center">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>
        <Button size="sm" variant="outline" onClick={handleReset}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      <svg viewBox="0 0 400 280" className="w-full h-64 border rounded-lg bg-white dark:bg-gray-900">
        {/* CPU Cores */}
        {processes.map((proc, idx) => {
          const y = 40 + idx * 60;
          const isActive = isRunning;

          return (
            <g key={proc.id}>
              {/* Core container */}
              <rect
                x="20"
                y={y - 20}
                width="360"
                height="50"
                rx="4"
                fill="rgba(59, 130, 246, 0.1)"
                stroke="rgb(59, 130, 246)"
                strokeWidth="2"
              />

              {/* Core label */}
              <text
                x="35"
                y={y}
                className="fill-blue-700 dark:fill-blue-400 text-xs font-semibold"
              >
                Core {proc.id}
              </text>

              {/* Process circle */}
              <circle
                cx="120"
                cy={y}
                r="18"
                fill={isActive ? "rgb(59, 130, 246)" : "rgb(156, 163, 175)"}
                stroke={isActive ? "rgb(37, 99, 235)" : "rgb(107, 114, 128)"}
                strokeWidth="2"
              />
              <text
                x="120"
                y={y + 4}
                textAnchor="middle"
                className="fill-white text-xs font-bold"
              >
                P{proc.id}
              </text>

              {/* Progress bar */}
              <rect
                x="160"
                y={y - 8}
                width="200"
                height="16"
                rx="8"
                fill="rgba(156, 163, 175, 0.3)"
              />
              <rect
                x="160"
                y={y - 8}
                width={(proc.progress / 100) * 200}
                height="16"
                rx="8"
                fill="rgb(34, 197, 94)"
              >
                {isActive && (
                  <animate
                    attributeName="fill"
                    values="rgb(34, 197, 94);rgb(74, 222, 128);rgb(34, 197, 94)"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                )}
              </rect>

              {/* Progress text */}
              <text
                x="370"
                y={y + 4}
                className="fill-gray-600 dark:fill-gray-400 text-xs font-medium"
              >
                {Math.round(proc.progress)}%
              </text>
            </g>
          );
        })}
      </svg>

      <p className="text-xs text-center text-muted-foreground">
        Paralelismo real: Todos los procesos ejecutan simultáneamente en cores separados
      </p>
    </div>
  );
}
