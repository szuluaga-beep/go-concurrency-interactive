'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ThreadState {
  progress: number;
  taskId: string | null;
}

export function CPUThreadsVisualizer() {
  const [numThreads, setNumThreads] = useState(2);
  const [isRunning, setIsRunning] = useState(false);
  const [taskQueue, setTaskQueue] = useState<string[]>([]);
  const [threads, setThreads] = useState<ThreadState[]>(
    Array.from({ length: 2 }, () => ({ progress: 0, taskId: null }))
  );
  const [completed, setCompleted] = useState(0);
  
  const taskQueueRef = useRef<string[]>([]);
  const threadsRef = useRef<ThreadState[]>(threads);

  // Sincronizar refs con state
  useEffect(() => {
    taskQueueRef.current = taskQueue;
  }, [taskQueue]);

  useEffect(() => {
    threadsRef.current = threads;
  }, [threads]);

  // Actualizar threads cuando cambia el número
  useEffect(() => {
    if (!isRunning) {
      const newThreads = Array.from({ length: numThreads }, () => ({ progress: 0, taskId: null }));
      setThreads(newThreads);
      threadsRef.current = newThreads;
    }
  }, [numThreads, isRunning]);

  // Simular ejecución
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const currentThreads = threadsRef.current;
      const currentQueue = taskQueueRef.current;
      
      let newQueue = [...currentQueue];
      let completedCount = 0;

      const updatedThreads = currentThreads.map((thread) => {
        // Si el thread está inactivo y hay tareas en la cola
        if (thread.progress === 0 && newQueue.length > 0) {
          const taskId = newQueue.shift()!;
          return { progress: 1, taskId };
        }

        // Si el thread está procesando
        if (thread.progress > 0 && thread.progress < 100) {
          // Incremento más suave para visualizar mejor el avance
          const increment = 5 + Math.random() * 15;
          const newProgress = thread.progress + increment;

          if (newProgress >= 100) {
            completedCount++;
            return { progress: 0, taskId: null };
          }

          return { ...thread, progress: newProgress };
        }

        return thread;
      });

      setThreads(updatedThreads);
      setTaskQueue(newQueue);
      if (completedCount > 0) {
        setCompleted((c) => c + completedCount);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isRunning]);

  const addTasks = () => {
    const newTasks = Array.from({ length: 5 }, (_, i) => `task-${Date.now()}-${i}`);
    setTaskQueue((q) => [...q, ...newTasks]);
  };

  const reset = () => {
    setIsRunning(false);
    const newThreads = Array.from({ length: numThreads }, () => ({ progress: 0, taskId: null }));
    setTaskQueue([]);
    setThreads(newThreads);
    setCompleted(0);
  };

  // Toggle ejecutar/pausar; si no hay tareas al iniciar, agrega 5 automáticamente
  const toggleRun = () => {
    if (!isRunning && taskQueueRef.current.length === 0) {
      const newTasks = Array.from({ length: 5 }, (_, i) => `task-${Date.now()}-${i}`);
      setTaskQueue((q) => [...q, ...newTasks]);
    }
    setIsRunning((r) => !r);
  };

  return (
    <div className="space-y-6">
      {/* Controles */}
      <Card>
        <CardHeader>
          <CardTitle>Simulador de Threads del CPU</CardTitle>
          <CardDescription>Cómo el CPU ejecuta múltiples tareas con threads</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:gap-3">
            <div>
              <label className="block text-sm font-medium mb-2">Threads: {numThreads}</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setNumThreads((n) => Math.max(1, n - 1))}
                  disabled={isRunning}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-semibold">{numThreads}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setNumThreads((n) => Math.min(8, n + 1))}
                  disabled={isRunning}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-2 flex-1 md:flex-none">
              <Button
                onClick={toggleRun}
                variant={isRunning ? 'default' : 'outline'}
              >
                {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                {isRunning ? 'Pausar' : 'Iniciar'}
              </Button>
              <Button onClick={addTasks} variant="outline">
                + 5 Tareas
              </Button>
              <Button onClick={reset} variant="outline">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{completed}</div>
            <p className="text-sm text-muted-foreground">Completadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{taskQueue.length}</div>
            <p className="text-sm text-muted-foreground">En cola</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">
              {threads.filter((t) => t.progress > 0).length}/{numThreads}
            </div>
            <p className="text-sm text-muted-foreground">Threads activos</p>
          </CardContent>
        </Card>
      </div>

      {/* Threads */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Estado de Threads</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {threads.map((thread, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">
                  Thread {idx}
                  {thread.taskId && <span className="ml-2 text-xs text-muted-foreground">({thread.taskId})</span>}
                </span>
                <span className="text-xs text-muted-foreground">
                  {Math.round(thread.progress)}%
                </span>
              </div>
              <div className="h-6 bg-muted rounded overflow-hidden">
                {thread.progress > 0 && (
                  <div
                    className="h-full bg-blue-500 transition-all duration-150"
                    style={{ width: `${Math.min(100, thread.progress)}%` }}
                  />
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Cola */}
      {taskQueue.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Cola: {taskQueue.length} tareas esperando</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            {taskQueue.slice(0, 5).map((task) => (
              <div key={task}>{task}</div>
            ))}
            {taskQueue.length > 5 && <div>... y {taskQueue.length - 5} más</div>}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
