"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ExecutionState {
  isRunning: boolean
  completedCount: number
  totalTime: number
}

type LanguageKey = "go" | "javascript" | "python" | "java"

export default function ConcurrencySimulator() {
  const TASK_COUNT = 10000
  const TASK_DURATION = 1000

  const [executions, setExecutions] = useState<Record<LanguageKey, ExecutionState>>({
    go: { isRunning: false, completedCount: 0, totalTime: 0 },
    javascript: { isRunning: false, completedCount: 0, totalTime: 0 },
    python: { isRunning: false, completedCount: 0, totalTime: 0 },
    java: { isRunning: false, completedCount: 0, totalTime: 0 },
  })

  const runSimulation = (lang: LanguageKey) => {
    if (executions[lang].isRunning) return

    setExecutions((prev) => ({
      ...prev,
      [lang]: { isRunning: true, completedCount: 0, totalTime: 0 },
    }))

    const startTime = Date.now()

    if (lang === "go" || lang === "javascript" || lang === "java") {
      // Concurrencia real: todas las tareas corren en paralelo
      const endTime = startTime + TASK_DURATION

      // Actualizar el progreso gradualmente
      const progressInterval = setInterval(() => {
        const now = Date.now()
        if (now >= endTime) {
          clearInterval(progressInterval)
          setExecutions((prev) => ({
            ...prev,
            [lang]: {
              isRunning: false,
              completedCount: TASK_COUNT,
              totalTime: now - startTime,
            },
          }))
        } else {
          const progress = Math.floor(((now - startTime) / TASK_DURATION) * TASK_COUNT)
          setExecutions((prev) => ({
            ...prev,
            [lang]: {
              isRunning: true,
              completedCount: Math.min(progress, TASK_COUNT),
              totalTime: now - startTime,
            },
          }))
        }
      }, 50)
    } else if (lang === "python") {
      // Ejecución secuencial por el GIL
      const tasksPerSecond = TASK_COUNT / 5 // 2000 tareas por segundo en secuencial

      const progressInterval = setInterval(() => {
        const now = Date.now()
        const timeElapsed = now - startTime
        const completed = Math.floor((timeElapsed / 1000) * tasksPerSecond)

        if (completed >= TASK_COUNT) {
          clearInterval(progressInterval)
          setExecutions((prev) => ({
            ...prev,
            [lang]: {
              isRunning: false,
              completedCount: TASK_COUNT,
              totalTime: now - startTime,
            },
          }))
        } else {
          setExecutions((prev) => ({
            ...prev,
            [lang]: {
              isRunning: true,
              completedCount: completed,
              totalTime: now - startTime,
            },
          }))
        }
      }, 50)
    }
  }

  const resetAll = () => {
    setExecutions({
      go: { isRunning: false, completedCount: 0, totalTime: 0 },
      javascript: { isRunning: false, completedCount: 0, totalTime: 0 },
      python: { isRunning: false, completedCount: 0, totalTime: 0 },
      java: { isRunning: false, completedCount: 0, totalTime: 0 },
    })
  }

  const languages: Array<{
    key: LanguageKey
    label: string
    color: string
    description: string
  }> = [
    { key: "go", label: "Go", color: "bg-green-600/10 border-green-600", description: "Paralelo real" },
    { key: "javascript", label: "JavaScript", color: "bg-yellow-600/10 border-yellow-600", description: "Paralelo con Workers" },
    { key: "python", label: "Python", color: "bg-red-600/10 border-red-600", description: "Secuencial (GIL)" },
    { key: "java", label: "Java", color: "bg-orange-600/10 border-orange-600", description: "Paralelo real" },
  ]

  const getProgressPercentage = (lang: LanguageKey) => {
    return (executions[lang].completedCount / TASK_COUNT) * 100
  }

  const getTimeDisplay = (ms: number) => {
    if (ms < 1000) return `${ms}ms`
    return `${(ms / 1000).toFixed(2)}s`
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-600/10 border border-blue-600 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Simulando {TASK_COUNT.toLocaleString()} tareas</strong> que cada una toma {TASK_DURATION}ms
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {languages.map(({ key, label, color, description }) => {
          const execution = executions[key]
          const percentage = getProgressPercentage(key)

          return (
            <div key={key} className={`rounded-lg border-2 p-6 ${color}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{label}</h3>
                <span className="text-xs bg-muted px-2 py-1 rounded">{description}</span>
              </div>

              <div className="space-y-4">
                {/* Progress bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium">
                      {execution.completedCount.toLocaleString()} / {TASK_COUNT.toLocaleString()}
                    </p>
                    <p className="text-sm font-medium">{percentage.toFixed(1)}%</p>
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
                      <span className="text-lg font-bold">{getTimeDisplay(execution.totalTime)}</span>
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
          )
        })}
      </div>

      <Button onClick={resetAll} variant="outline" className="w-full">
        Reiniciar Todo
      </Button>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <p className="text-sm text-muted-foreground">
          <strong>¿Qué observas?</strong>
        </p>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>
            <strong>Go, JavaScript, Java:</strong> Completan ~1 segundo (paralelismo real)
          </li>
          <li>
            <strong>Python:</strong> Tarda ~5 segundos (secuencial por el GIL)
          </li>
          <li>
            Con 10,000 tareas, la diferencia es dramática y claramente visible
          </li>
        </ul>
      </div>
    </div>
  )
}
