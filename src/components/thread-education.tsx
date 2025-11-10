'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
            <p className="text-sm text-muted-foreground">Unidad de ejecución. Cada thread ejecuta código independientemente.</p>
          </div>
          
          <div className="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/20 p-3">
            <h4 className="font-semibold text-sm">CPU Core</h4>
            <p className="text-sm text-muted-foreground">Puede ejecutar 1 thread a la vez. Múltiples cores = ejecución paralela real.</p>
          </div>
          
          <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-3">
            <h4 className="font-semibold text-sm">Context Switching</h4>
            <p className="text-sm text-muted-foreground">El SO cambia entre threads rápidamente cuando hay más threads que cores.</p>
          </div>
        </CardContent>
      </Card>

      {/* Concurrencia vs Paralelismo */}
      <Card>
        <CardHeader>
          <CardTitle>Concurrencia vs Paralelismo</CardTitle>
          <CardDescription>Dos conceptos distintos pero relacionados</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="concurrency" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="concurrency">Concurrencia</TabsTrigger>
              <TabsTrigger value="parallelism">Paralelismo</TabsTrigger>
            </TabsList>

            <TabsContent value="concurrency" className="space-y-3">
              <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded">
                <p className="text-sm font-medium mb-2">1 Core, 4 Tareas (alternando)</p>
                <code className="text-xs font-mono">
                  [T1 ▸ T2 ▸ T3 ▸ T4 ▸ ...]
                </code>
              </div>
              <p className="text-sm text-muted-foreground">Tareas se ejecutan entrelazadas. Ideal para I/O (web, archivos).</p>
            </TabsContent>

            <TabsContent value="parallelism" className="space-y-3">
              <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded">
                <p className="text-sm font-medium mb-2">4 Cores, 4 Tareas (simultáneas)</p>
                <code className="text-xs font-mono space-y-1">
                  <div>[T1 ─────]</div>
                  <div>[T2 ─────]</div>
                  <div>[T3 ─────]</div>
                  <div>[T4 ─────]</div>
                </code>
              </div>
              <p className="text-sm text-muted-foreground">Tareas se ejecutan al mismo tiempo. Ideal para cálculo (CPU-bound).</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Por qué Go */}
      <Card className="border-l-4 border-green-600">
        <CardHeader>
          <CardTitle className="text-base">¿Por qué Go resuelve esto?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>Go usa <strong>goroutines</strong> en lugar de OS threads. Es como tener lo mejor de ambos mundos:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Millones de goroutines (vs cientos de threads)</li>
            <li>Scheduler automático del runtime (vs SO)</li>
            <li>Sincronización fácil con canales</li>
            <li>Sin la complejidad de threads tradicionales</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
