"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PhilosopherState = "thinking" | "hungry" | "eating" | "waiting" | "starving";

interface Philosopher {
  id: number;
  state: PhilosopherState;
  mealsEaten: number;
  waitingTime: number;
}

interface Fork {
  id: number;
  inUse: boolean;
  heldBy: number | null;
}

export default function ProblemsPage() {
  const [philosophers, setPhilosophers] = useState<Philosopher[]>([
    { id: 0, state: "thinking", mealsEaten: 0, waitingTime: 0 },
    { id: 1, state: "thinking", mealsEaten: 0, waitingTime: 0 },
    { id: 2, state: "thinking", mealsEaten: 0, waitingTime: 0 },
    { id: 3, state: "thinking", mealsEaten: 0, waitingTime: 0 },
    { id: 4, state: "thinking", mealsEaten: 0, waitingTime: 0 },
  ]);

  const [forks, setForks] = useState<Fork[]>([
    { id: 0, inUse: false, heldBy: null },
    { id: 1, inUse: false, heldBy: null },
    { id: 2, inUse: false, heldBy: null },
    { id: 3, inUse: false, heldBy: null },
    { id: 4, inUse: false, heldBy: null },
  ]);

  const [simulationMode, setSimulationMode] = useState<
    "deadlock" | "livelock" | "starvation" | "solution" | null
  >(null);
  const [isRunning, setIsRunning] = useState(false);
  const philosophersRef = useRef(philosophers);
  const forksRef = useRef(forks);

  useEffect(() => {
    philosophersRef.current = philosophers;
  }, [philosophers]);

  useEffect(() => {
    forksRef.current = forks;
  }, [forks]);

  const getPhilosopherColor = (state: PhilosopherState): string => {
    switch (state) {
      case "thinking":
        return "#99D1FC"; // info blue
      case "hungry":
        return "#DFFF61"; // accent yellow
      case "waiting":
        return "#FFA500"; // orange
      case "eating":
        return "#00825A"; // primary green
      case "starving":
        return "#FF4444"; // red
      default:
        return "#666";
    }
  };

  const getPhilosopherPosition = (index: number) => {
    const angle = (index * 2 * Math.PI) / 5 - Math.PI / 2;
    const radius = 150;
    return {
      x: 250 + radius * Math.cos(angle),
      y: 250 + radius * Math.sin(angle),
    };
  };

  const getForkPosition = (index: number) => {
    const angle = (index * 2 * Math.PI) / 5 + Math.PI / 5 - Math.PI / 2;
    const radius = 110;
    return {
      x: 250 + radius * Math.cos(angle),
      y: 250 + radius * Math.sin(angle),
    };
  };

  const startDeadlockSimulation = () => {
    setIsRunning(true);
    setSimulationMode("deadlock");

    // Reset state
    setPhilosophers((prev) =>
      prev.map((p) => ({ ...p, state: "thinking", mealsEaten: 0, waitingTime: 0 }))
    );
    setForks((prev) => prev.map((f) => ({ ...f, inUse: false, heldBy: null })));

    // All philosophers get hungry at once
    setTimeout(() => {
      setPhilosophers((prev) => prev.map((p) => ({ ...p, state: "hungry" })));

      // Each philosopher picks up left fork
      setTimeout(() => {
        setPhilosophers((prev) => prev.map((p) => ({ ...p, state: "waiting" })));
        setForks((prev) =>
          prev.map((f, i) => ({ ...f, inUse: true, heldBy: i }))
        );

        // Try to pick up right fork - DEADLOCK!
        setTimeout(() => {
          setPhilosophers((prev) =>
            prev.map((p) => ({ ...p, state: "waiting", waitingTime: p.waitingTime + 1 }))
          );
        }, 1500);
      }, 1000);
    }, 500);
  };

  const startLivelockSimulation = () => {
    setIsRunning(true);
    setSimulationMode("livelock");

    // Reset state
    setPhilosophers((prev) =>
      prev.map((p) => ({ ...p, state: "thinking", mealsEaten: 0, waitingTime: 0 }))
    );
    setForks((prev) => prev.map((f) => ({ ...f, inUse: false, heldBy: null })));

    let iteration = 0;
    const livelockInterval = setInterval(() => {
      if (iteration >= 6) {
        clearInterval(livelockInterval);
        return;
      }

      // All get hungry
      setPhilosophers((prev) => prev.map((p) => ({ ...p, state: "hungry" })));

      setTimeout(() => {
        // Pick up left fork
        setPhilosophers((prev) => prev.map((p) => ({ ...p, state: "waiting" })));
        setForks((prev) =>
          prev.map((f, i) => ({ ...f, inUse: true, heldBy: i }))
        );

        setTimeout(() => {
          // Can't get right fork, being "polite" - put down left fork
          setPhilosophers((prev) => prev.map((p) => ({ ...p, state: "thinking" })));
          setForks((prev) =>
            prev.map((f) => ({ ...f, inUse: false, heldBy: null }))
          );
        }, 800);
      }, 500);

      iteration++;
    }, 2000);
  };

  const startStarvationSimulation = () => {
    setIsRunning(true);
    setSimulationMode("starvation");

    // Reset state
    setPhilosophers((prev) =>
      prev.map((p) => ({ ...p, state: "thinking", mealsEaten: 0, waitingTime: 0 }))
    );
    setForks((prev) => prev.map((f) => ({ ...f, inUse: false, heldBy: null })));

    const starvationInterval = setInterval(() => {
      // Philosophers 0, 1, 3, 4 take turns eating, philosopher 2 never gets a chance
      const availablePhils = [0, 1, 3, 4];
      const luckyPhil = availablePhils[Math.floor(Math.random() * availablePhils.length)];

      setPhilosophers((prev) =>
        prev.map((p) => {
          if (p.id === luckyPhil) {
            return { ...p, state: "eating", mealsEaten: p.mealsEaten + 1 };
          }
          if (p.id === 2) {
            return { ...p, state: p.waitingTime > 3 ? "starving" : "waiting", waitingTime: p.waitingTime + 1 };
          }
          return { ...p, state: "thinking" };
        })
      );

      const leftFork = luckyPhil;
      const rightFork = (luckyPhil + 1) % 5;

      setForks((prev) =>
        prev.map((f, i) => {
          if (i === leftFork || i === rightFork) {
            return { ...f, inUse: true, heldBy: luckyPhil };
          }
          return { ...f, inUse: false, heldBy: null };
        })
      );

      setTimeout(() => {
        setPhilosophers((prev) =>
          prev.map((p) =>
            p.id === luckyPhil ? { ...p, state: "thinking" } : p
          )
        );
        setForks((prev) =>
          prev.map((f, i) => {
            if (i === leftFork || i === rightFork) {
              return { ...f, inUse: false, heldBy: null };
            }
            return f;
          })
        );
      }, 1500);
    }, 2500);

    setTimeout(() => {
      clearInterval(starvationInterval);
      setIsRunning(false);
    }, 20000);
  };

  const startSolutionSimulation = () => {
    setIsRunning(true);
    setSimulationMode("solution");

    // Reset state
    setPhilosophers((prev) =>
      prev.map((p) => ({ ...p, state: "thinking", mealsEaten: 0, waitingTime: 0 }))
    );
    setForks((prev) => prev.map((f) => ({ ...f, inUse: false, heldBy: null })));

    let philQueue = [0, 1, 2, 3, 4];
    let currentIndex = 0;

    const solutionInterval = setInterval(() => {
      if (currentIndex >= 15) {
        clearInterval(solutionInterval);
        setIsRunning(false);
        return;
      }

      // Pick next philosopher in round-robin fashion
      const philToEat = philQueue[currentIndex % 5];
      const leftFork = philToEat;
      const rightFork = (philToEat + 1) % 5;

      // Set hungry
      setPhilosophers((prev) =>
        prev.map((p) =>
          p.id === philToEat ? { ...p, state: "hungry" } : p
        )
      );

      setTimeout(() => {
        // Eating
        setPhilosophers((prev) =>
          prev.map((p) =>
            p.id === philToEat
              ? { ...p, state: "eating", mealsEaten: p.mealsEaten + 1 }
              : p
          )
        );

        setForks((prev) =>
          prev.map((f, i) => {
            if (i === leftFork || i === rightFork) {
              return { ...f, inUse: true, heldBy: philToEat };
            }
            return f;
          })
        );

        setTimeout(() => {
          // Done eating
          setPhilosophers((prev) =>
            prev.map((p) =>
              p.id === philToEat ? { ...p, state: "thinking" } : p
            )
          );

          setForks((prev) =>
            prev.map((f, i) => {
              if (i === leftFork || i === rightFork) {
                return { ...f, inUse: false, heldBy: null };
              }
              return f;
            })
          );
        }, 1200);
      }, 500);

      currentIndex++;
    }, 2000);
  };

  const stopSimulation = () => {
    setIsRunning(false);
    setSimulationMode(null);
    setPhilosophers((prev) =>
      prev.map((p) => ({ ...p, state: "thinking", mealsEaten: 0, waitingTime: 0 }))
    );
    setForks((prev) => prev.map((f) => ({ ...f, inUse: false, heldBy: null })));
  };

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Problemas de Concurrencia</h1>
        <p className="text-lg text-muted-foreground">
          Explorando los desafíos clásicos de la programación concurrente a través del problema de los filósofos comensales
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>El Problema de los Filósofos Comensales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">¿Qué es este problema?</h3>
            <p>
              Imaginemos 5 filósofos sentados alrededor de una mesa circular. Su vida consiste en solo dos actividades: <strong>pensar</strong> y <strong>comer</strong>.
            </p>
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <p className="font-semibold">Las reglas del juego:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">1.</span>
                  <span>Hay exactamente <strong>5 tenedores</strong> en la mesa (uno entre cada par de filósofos)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <span>Para <strong>comer</strong>, un filósofo necesita <strong>AMBOS</strong> tenedores: el de su izquierda Y el de su derecha</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <span>Un tenedor solo puede ser usado por <strong>UN</strong> filósofo a la vez (no se puede compartir)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">4.</span>
                  <span>Después de comer, el filósofo <strong>suelta ambos tenedores</strong> y vuelve a pensar</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 p-4 rounded-lg">
            <p className="font-semibold text-orange-800 dark:text-orange-200 mb-2">⚠️ El Desafío:</p>
            <p className="text-sm text-orange-700 dark:text-orange-300">
              ¿Cómo diseñamos un sistema donde todos los filósofos puedan comer eventualmente, sin que se bloqueen mutuamente
              esperando por tenedores? Este problema representa la sincronización de <strong>procesos concurrentes</strong> que compiten
              por <strong>recursos limitados</strong> (los tenedores son como memoria, CPU, locks, etc.).
            </p>
          </div>

          <div className="flex justify-center my-8">
            <svg width="500" height="500" viewBox="0 0 500 500" className="max-w-full">
              {/* Table surface */}
              <circle
                cx="250"
                cy="250"
                r="80"
                fill="currentColor"
                opacity="0.05"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4,4"
              />
              <text
                x="250"
                y="250"
                textAnchor="middle"
                fontSize="14"
                fill="currentColor"
                opacity="0.5"
                fontWeight="bold"
              >
                MESA
              </text>

              {/* Connection lines from philosophers to their forks */}
              {philosophers.map((_phil, i) => {
                const philPos = getPhilosopherPosition(i);
                const leftForkPos = getForkPosition(i);
                const rightForkPos = getForkPosition((i + 4) % 5); // Previous fork

                // Left fork connection
                const leftFork = forks[i];
                if (leftFork.heldBy === i) {
                  return (
                    <g key={`connection-${i}`}>
                      <line
                        x1={philPos.x}
                        y1={philPos.y}
                        x2={leftForkPos.x}
                        y2={leftForkPos.y}
                        stroke="#00825A"
                        strokeWidth="2"
                        strokeDasharray="3,3"
                        opacity="0.5"
                      />
                      <line
                        x1={philPos.x}
                        y1={philPos.y}
                        x2={rightForkPos.x}
                        y2={rightForkPos.y}
                        stroke={forks[(i + 4) % 5].heldBy === i ? "#00825A" : "#666"}
                        strokeWidth="2"
                        strokeDasharray="3,3"
                        opacity={forks[(i + 4) % 5].heldBy === i ? 0.5 : 0.2}
                      />
                    </g>
                  );
                }
                return null;
              })}

              {/* Forks - improved visual */}
              {forks.map((fork, i) => {
                const pos = getForkPosition(i);
                const isInUse = fork.inUse;
                return (
                  <g key={`fork-${i}`}>
                    {/* Fork shadow/background */}
                    <ellipse
                      cx={pos.x}
                      cy={pos.y + 2}
                      rx="12"
                      ry="8"
                      fill="black"
                      opacity="0.1"
                    />
                    {/* Fork plate */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="12"
                      fill={isInUse ? "#00825A20" : "#66666620"}
                      stroke={isInUse ? "#00825A" : "#888"}
                      strokeWidth="2"
                    />
                    {/* Fork icon - simplified utensil */}
                    <g transform={`translate(${pos.x}, ${pos.y})`}>
                      <line x1="-3" y1="-4" x2="-3" y2="4" stroke={isInUse ? "#00825A" : "#666"} strokeWidth="1.5" />
                      <line x1="0" y1="-4" x2="0" y2="4" stroke={isInUse ? "#00825A" : "#666"} strokeWidth="1.5" />
                      <line x1="3" y1="-4" x2="3" y2="4" stroke={isInUse ? "#00825A" : "#666"} strokeWidth="1.5" />
                      <line x1="-3" y1="-4" x2="3" y2="-4" stroke={isInUse ? "#00825A" : "#666"} strokeWidth="1.5" />
                    </g>
                    {/* Fork number */}
                    <text
                      x={pos.x}
                      y={pos.y + 28}
                      textAnchor="middle"
                      fontSize="11"
                      fill="currentColor"
                      fontWeight="bold"
                      opacity="0.6"
                    >
                      T{i}
                    </text>
                    {/* Ownership indicator */}
                    {fork.inUse && fork.heldBy !== null && (
                      <text
                        x={pos.x}
                        y={pos.y + 40}
                        textAnchor="middle"
                        fontSize="9"
                        fill="#00825A"
                        fontWeight="bold"
                      >
                        → P{fork.heldBy}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Philosophers - improved visual */}
              {philosophers.map((phil, i) => {
                const pos = getPhilosopherPosition(i);
                const color = getPhilosopherColor(phil.state);
                return (
                  <g key={`phil-${i}`}>
                    {/* Philosopher shadow */}
                    <circle
                      cx={pos.x}
                      cy={pos.y + 3}
                      r="30"
                      fill="black"
                      opacity="0.15"
                    />
                    {/* Philosopher body */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="30"
                      fill={color}
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    {/* Philosopher face */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="28"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                    {/* Philosopher ID */}
                    <text
                      x={pos.x}
                      y={pos.y + 6}
                      textAnchor="middle"
                      fontSize="20"
                      fontWeight="bold"
                      fill="#000"
                    >
                      {i}
                    </text>
                    {/* State label */}
                    <rect
                      x={pos.x - 40}
                      y={pos.y - 52}
                      width="80"
                      height="20"
                      rx="10"
                      fill="currentColor"
                      opacity="0.1"
                    />
                    <text
                      x={pos.x}
                      y={pos.y - 38}
                      textAnchor="middle"
                      fontSize="11"
                      fill="currentColor"
                      fontWeight="bold"
                    >
                      {phil.state.toUpperCase()}
                    </text>
                    {/* Meals counter */}
                    <circle
                      cx={pos.x}
                      cy={pos.y + 48}
                      r="14"
                      fill="currentColor"
                      opacity="0.1"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <text
                      x={pos.x}
                      y={pos.y + 52}
                      textAnchor="middle"
                      fontSize="11"
                      fill="currentColor"
                      fontWeight="bold"
                    >
                      🍝 {phil.mealsEaten}
                    </text>
                    {/* Waiting indicator */}
                    {phil.waitingTime > 0 && (
                      <text
                        x={pos.x}
                        y={pos.y + 68}
                        textAnchor="middle"
                        fontSize="9"
                        fill="#FF4444"
                        fontWeight="bold"
                      >
                        ⏱ {phil.waitingTime}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
            <p className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💡 Cómo leer la visualización:</p>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 ml-4">
              <li><strong>P0-P4:</strong> Los 5 filósofos (círculos grandes con números)</li>
              <li><strong>T0-T4:</strong> Los 5 tenedores (círculos pequeños entre filósofos)</li>
              <li><strong>Líneas punteadas:</strong> Muestran qué filósofo está sosteniendo qué tenedor</li>
              <li><strong>🍝 Número:</strong> Cantidad de veces que el filósofo ha comido</li>
              <li><strong>⏱ Número:</strong> Tiempo que lleva esperando (indica posible inanición)</li>
            </ul>
          </div>

          <div className="flex gap-2 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#99D1FC" }} />
              <span className="text-sm">Pensando</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#DFFF61" }} />
              <span className="text-sm">Hambriento</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#FFA500" }} />
              <span className="text-sm">Esperando</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#00825A" }} />
              <span className="text-sm">Comiendo</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#FF4444" }} />
              <span className="text-sm">Inanición</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="race-condition" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="race-condition">Race Condition</TabsTrigger>
          <TabsTrigger value="deadlock">Deadlock</TabsTrigger>
          <TabsTrigger value="livelock">Livelock</TabsTrigger>
          <TabsTrigger value="starvation">Starvation</TabsTrigger>
          <TabsTrigger value="solution">Solución</TabsTrigger>
        </TabsList>

        <TabsContent value="race-condition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Race Condition (Condición de Carrera)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold">¿Qué es?</h3>
                <p className="text-sm">
                  Cuando dos procesos acceden al <strong>mismo recurso simultáneamente</strong> sin coordinación,
                  y el resultado depende de quién llega primero. Es <strong>impredecible</strong> y puede causar errores.
                </p>

                <div className="bg-yellow-50 dark:bg-yellow-950/20 border-2 border-yellow-400 dark:border-yellow-600 p-4 rounded-lg">
                  <p className="font-bold text-yellow-900 dark:text-yellow-200 mb-2">💡 Analogía: Cuenta Bancaria</p>
                  <div className="grid md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="font-semibold text-blue-700 dark:text-blue-300">Cajero A:</p>
                      <p>1. Lee saldo: $100 ✓</p>
                      <p>2. Retira: $80</p>
                      <p>3. Escribe: $20</p>
                    </div>
                    <div>
                      <p className="font-semibold text-purple-700 dark:text-purple-300">Cajero B:</p>
                      <p>1. Lee saldo: $100 ✓</p>
                      <p>2. Retira: $60</p>
                      <p>3. Escribe: $40</p>
                    </div>
                  </div>
                  <p className="text-xs text-red-700 dark:text-red-300 mt-2 font-bold">
                    ❌ Retiraron $140 total, pero solo había $100. ¡Ambos leyeron antes de que cualquiera escribiera!
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">En los Filósofos:</h3>
                <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border border-orange-300 dark:border-orange-700 p-3 rounded-lg text-sm">
                  <p><strong>P0 y P1</strong> verifican el tenedor T0 simultáneamente:</p>
                  <ul className="ml-4 mt-2 space-y-1 text-xs">
                    <li>✓ Ambos leen: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">disponible = true</code></li>
                    <li>❌ Ambos ejecutan: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">tomar_tenedor()</code></li>
                    <li>💥 <strong>¡Ambos creen que tienen el tenedor!</strong> Estado inconsistente.</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Ejemplo en Código:</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-400 p-3 rounded-lg">
                    <p className="font-bold text-red-700 dark:text-red-300 mb-2 text-sm">❌ CON Race:</p>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs">{`counter = 0

// Goroutine 1: Lee 0, escribe 1
// Goroutine 2: Lee 0, escribe 1

// Resultado: 1 ❌ (esperábamos 2)`}</pre>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-400 p-3 rounded-lg">
                    <p className="font-bold text-green-700 dark:text-green-300 mb-2 text-sm">✅ SIN Race (Mutex):</p>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs">{`var mu sync.Mutex

mu.Lock()
counter++  // Solo 1 a la vez
mu.Unlock()

// Resultado: 2 ✅`}</pre>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Soluciones:</h3>
                <div className="space-y-2 text-sm">
                  <div className="border-l-4 border-primary pl-3">
                    <p><strong>🔒 Mutex:</strong> Candado que solo permite un proceso a la vez</p>
                    <code className="text-xs">mu.Lock() → operación → mu.Unlock()</code>
                  </div>
                  <div className="border-l-4 border-green-500 pl-3">
                    <p><strong>⚡ Atómicas:</strong> Operaciones garantizadas como indivisibles</p>
                    <code className="text-xs">atomic.AddInt64(&counter, 1)</code>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-3">
                    <p><strong>📨 Channels:</strong> Comunicar en vez de compartir memoria</p>
                    <code className="text-xs">fork := &lt;-forkChan</code>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-300 dark:border-blue-700 p-3 rounded-lg">
                <p className="font-semibold text-blue-900 dark:text-blue-200 mb-2 text-sm">💡 Conexión con otros problemas:</p>
                <div className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
                  <p>• <strong>Race Condition</strong> = Problema raíz (acceso sin sincronización)</p>
                  <p>• <strong>Deadlock/Livelock/Starvation</strong> = Consecuencias de resolver races incorrectamente</p>
                  <p className="pt-1 font-semibold">✅ Se necesita sincronización bien diseñada</p>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-300 dark:border-purple-700 p-3 rounded-lg">
                <p className="font-semibold text-purple-800 dark:text-purple-200 mb-1 text-sm">🔍 Race Detector de Go:</p>
                <pre className="bg-gray-900 text-green-400 p-2 rounded text-xs">{`go run -race main.go
go test -race ./...`}</pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deadlock" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deadlock (Interbloqueo)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">¿Qué es un Deadlock?</h3>
                <p>
                  Un deadlock ocurre cuando dos o más procesos están esperando indefinidamente por recursos que están siendo retenidos por otros procesos en el conjunto.
                  Ningún proceso puede avanzar.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">En los Filósofos:</h3>
                <p>
                  Si todos los filósofos toman su tenedor izquierdo al mismo tiempo, ninguno podrá tomar el tenedor derecho porque ya está siendo usado.
                  Todos quedan esperando eternamente.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Condiciones necesarias para Deadlock:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Exclusión mutua:</strong> Los recursos no pueden ser compartidos</li>
                  <li><strong>Hold and wait:</strong> Procesos mantienen recursos mientras esperan otros</li>
                  <li><strong>No preemption:</strong> Los recursos no pueden ser forzosamente liberados</li>
                  <li><strong>Espera circular:</strong> Existe un ciclo de procesos esperando recursos</li>
                </ul>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={startDeadlockSimulation}
                  disabled={isRunning}
                >
                  Demostrar Deadlock
                </Button>
                <Button variant="outline" onClick={stopSimulation} disabled={!isRunning}>
                  Detener
                </Button>
              </div>

              {simulationMode === "deadlock" && (
                <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-destructive">
                    ⚠️ Deadlock detectado: Todos los filósofos tienen su tenedor izquierdo pero están esperando el derecho indefinidamente.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="livelock" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Livelock (Bloqueo Activo)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">¿Qué es un Livelock?</h3>
                <p>
                  Similar a un deadlock, pero los procesos están activamente cambiando de estado en respuesta a los otros, sin hacer progreso real.
                  Es como dos personas tratando de pasar en un pasillo estrecho y ambos se mueven al mismo lado simultáneamente.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">En los Filósofos:</h3>
                <p>
                  Todos los filósofos toman su tenedor izquierdo, ven que el derecho no está disponible, y "educadamente" sueltan su tenedor.
                  Luego intentan de nuevo, repitiéndose indefinidamente sin que nadie coma.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Diferencia con Deadlock:</h3>
                <p className="text-sm">
                  En un deadlock, los procesos están bloqueados esperando. En un livelock, están activos pero no avanzan.
                  Es como estar atascado en un ciclo de "después de ti" perpetuo.
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={startLivelockSimulation}
                  disabled={isRunning}
                >
                  Demostrar Livelock
                </Button>
                <Button variant="outline" onClick={stopSimulation} disabled={!isRunning}>
                  Detener
                </Button>
              </div>

              {simulationMode === "livelock" && (
                <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-orange-600">
                    🔄 Livelock en progreso: Los filósofos continuamente toman y sueltan tenedores sin poder comer.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="starvation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Starvation (Inanición)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">¿Qué es Starvation?</h3>
                <p>
                  La inanición ocurre cuando un proceso no puede obtener los recursos necesarios porque otros procesos constantemente los acaparan.
                  El proceso está técnicamente listo para ejecutarse, pero nunca obtiene su turno.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">En los Filósofos:</h3>
                <p>
                  Debido a mala suerte o algoritmos de scheduling injustos, un filósofo nunca consigue ambos tenedores mientras otros comen repetidamente.
                  El sistema no está en deadlock, pero este filósofo está "muriendo de hambre".
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Causas comunes:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Políticas de scheduling sin garantías de fairness</li>
                  <li>Prioridades estáticas donde procesos de alta prioridad acaparan recursos</li>
                  <li>Race conditions en la adquisición de recursos</li>
                  <li>Falta de límites en el tiempo de posesión de recursos</li>
                </ul>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={startStarvationSimulation}
                  disabled={isRunning}
                >
                  Demostrar Starvation
                </Button>
                <Button variant="outline" onClick={stopSimulation} disabled={!isRunning}>
                  Detener
                </Button>
              </div>

              {simulationMode === "starvation" && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-red-600">
                    😢 Observa al filósofo 2: Nunca consigue comer mientras otros lo hacen repetidamente. Está sufriendo inanición.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="solution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Soluciones con Concurrencia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Estrategias de Solución:</h3>
              </div>

              <div className="grid gap-4">
                <div className="border rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-primary">1. Resource Ordering</h4>
                  <p className="text-sm">
                    Los filósofos siempre toman el tenedor con número menor primero. Esto rompe la espera circular necesaria para deadlock.
                  </p>
                </div>

                <div className="border rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-primary">2. Arbitro/Mutex (Simulación actual)</h4>
                  <p className="text-sm">
                    Un árbitro central (mutex) garantiza que solo un filósofo puede intentar tomar tenedores a la vez.
                    Implementado como round-robin para garantizar fairness.
                  </p>
                </div>

                <div className="border rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-primary">3. Chandy/Misra Solution</h4>
                  <p className="text-sm">
                    Usando mensajes (channels en Go): Los tenedores tienen estados "limpio" o "sucio".
                    Los filósofos solicitan tenedores mediante mensajes y usan prioridades para evitar starvation.
                  </p>
                </div>

                <div className="border rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-primary">4. Límite de Comensales</h4>
                  <p className="text-sm">
                    Permitir que máximo 4 filósofos intenten comer simultáneamente. Garantiza que al menos uno puede obtener ambos tenedores.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Go y la Concurrencia:</h3>
                <p className="text-sm">
                  Go proporciona primitivas excelentes para resolver estos problemas:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Goroutines:</strong> Cada filósofo puede ser una goroutine ligera</li>
                  <li><strong>Channels:</strong> Para comunicación segura entre goroutines (solicitar/liberar tenedores)</li>
                  <li><strong>Select:</strong> Para manejar múltiples operaciones de channel simultáneamente</li>
                  <li><strong>Sync package:</strong> Mutexes y WaitGroups para sincronización</li>
                </ul>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={startSolutionSimulation}
                  disabled={isRunning}
                >
                  Ver Solución en Acción
                </Button>
                <Button variant="outline" onClick={stopSimulation} disabled={!isRunning}>
                  Detener
                </Button>
              </div>

              {simulationMode === "solution" && (
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-primary">
                    ✅ Sistema funcionando correctamente: Todos los filósofos comen en turnos justos sin deadlocks, livelocks o inanición.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ejemplo en Go</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`// Solución usando channels en Go
type Fork struct {
    id int
}

type Table struct {
    forks []*Fork
    request chan *Fork
    release chan *Fork
}

func philosopher(id int, table *Table) {
    for {
        // Pensar
        time.Sleep(time.Millisecond * 100)

        // Solicitar tenedores
        leftFork := <-table.request
        rightFork := <-table.request

        // Comer
        fmt.Printf("Filósofo %d comiendo\\n", id)
        time.Sleep(time.Millisecond * 50)

        // Liberar tenedores
        table.release <- leftFork
        table.release <- rightFork
    }
}

func arbitro(table *Table) {
    for {
        select {
        case fork := <-table.release:
            table.forks = append(table.forks, fork)
        case table.request <- table.forks[0]:
            table.forks = table.forks[1:]
        }
    }
}`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
