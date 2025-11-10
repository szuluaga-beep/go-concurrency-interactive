"use client"

import ConcurrencySimulator from "@/components/concurrency-simulator"

export default function WhyGoPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">¿Por qué Go para Concurrencia?</h1>
        <p className="text-lg text-muted-foreground">
          Descubre por qué Go es uno de los lenguajes más poderosos para programación concurrente
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Card 1 */}
        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <span className="text-lg font-bold text-primary">⚡</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground">Simplicidad</h2>
          </div>
          <p className="text-muted-foreground">
            Go fue diseñado específicamente para la concurrencia. La sintaxis es simple y clara,
            permitiendo escribir código concurrente sin complicaciones.
          </p>
        </div>

        {/* Card 2 */}
        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <span className="text-lg font-bold text-primary">🚀</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground">Rendimiento</h2>
          </div>
          <p className="text-muted-foreground">
            Las goroutines son extremadamente ligeras (miles o millones pueden ejecutarse
            simultáneamente). El compilador de Go produce código muy eficiente.
          </p>
        </div>

        {/* Card 3 */}
        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <span className="text-lg font-bold text-primary">🔧</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground">Herramientas Integradas</h2>
          </div>
          <p className="text-muted-foreground">
            Go incluye herramientas de testing, profiling y análisis de rendimiento en la librería
            estándar. No necesitas dependencias externas complejas.
          </p>
        </div>

        {/* Card 4 */}
        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <span className="text-lg font-bold text-primary">🌍</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground">Multiplataforma</h2>
          </div>
          <p className="text-muted-foreground">
            Compila a un único binario ejecutable que funciona en Linux, macOS, Windows y otros
            sistemas operativos sin cambios en el código.
          </p>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold text-foreground">Comparativa con otros lenguajes</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Python</h3>
            <p className="text-sm text-muted-foreground">
              Python tiene el GIL (Global Interpreter Lock) que limita la concurrencia real.
              Go no tiene esta limitación.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Java/C++</h3>
            <p className="text-sm text-muted-foreground">
              Los threads son más pesados y complejos de manejar. Las goroutines de Go son
              órdenes de magnitud más ligeras.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Rust</h3>
            <p className="text-sm text-muted-foreground">
              Rust es poderoso pero con una curva de aprendizaje más pronunciada. Go es más
              accesible para principiantes.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">JavaScript/Node.js</h3>
            <p className="text-sm text-muted-foreground">
              JavaScript usa un modelo de event loop single-threaded. Manejo de concurrencia
              más complejo. Go maneja parallelismo real nativamente.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold text-foreground">Comparativa Numérica</h2>
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left py-2 px-3 font-semibold text-foreground">Característica</th>
                  <th className="text-left py-2 px-3 font-semibold text-foreground">Go</th>
                  <th className="text-left py-2 px-3 font-semibold text-foreground">Python</th>
                  <th className="text-left py-2 px-3 font-semibold text-foreground">JavaScript</th>
                  <th className="text-left py-2 px-3 font-semibold text-foreground">Java</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-muted/50">
                  <td className="py-2 px-3 text-muted-foreground">Tareas simultáneas</td>
                  <td className="py-2 px-3 font-medium text-green-600">Millones</td>
                  <td className="py-2 px-3 font-medium text-yellow-600">~1,000</td>
                  <td className="py-2 px-3 font-medium text-orange-600">Una a la vez</td>
                  <td className="py-2 px-3 font-medium text-yellow-600">~10,000</td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="py-2 px-3 text-muted-foreground">Memoria por tarea</td>
                  <td className="py-2 px-3 font-medium text-green-600">~2 KB</td>
                  <td className="py-2 px-3 font-medium text-yellow-600">~8 MB</td>
                  <td className="py-2 px-3 font-medium text-orange-600">~1-2 MB</td>
                  <td className="py-2 px-3 font-medium text-yellow-600">~1-2 MB</td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="py-2 px-3 text-muted-foreground">Velocidad de cambio</td>
                  <td className="py-2 px-3 font-medium text-green-600">Muy rápido</td>
                  <td className="py-2 px-3 font-medium text-orange-600">Limitado</td>
                  <td className="py-2 px-3 font-medium text-yellow-600">Lento</td>
                  <td className="py-2 px-3 font-medium text-yellow-600">Rápido</td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="py-2 px-3 text-muted-foreground">Trabajo en paralelo</td>
                  <td className="py-2 px-3 font-medium text-green-600">Completo</td>
                  <td className="py-2 px-3 font-medium text-red-600">No realmente</td>
                  <td className="py-2 px-3 font-medium text-orange-600">Parcial</td>
                  <td className="py-2 px-3 font-medium text-green-600">Sí</td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="py-2 px-3 text-muted-foreground">Tiempo de preparación</td>
                  <td className="py-2 px-3 font-medium text-green-600">~1 segundo</td>
                  <td className="py-2 px-3 font-medium text-yellow-600">Al ejecutar</td>
                  <td className="py-2 px-3 font-medium text-yellow-600">Al ejecutar</td>
                  <td className="py-2 px-3 font-medium text-orange-600">~10-30 seg</td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="py-2 px-3 text-muted-foreground">Uso de espacio inicial</td>
                  <td className="py-2 px-3 font-medium text-green-600">Muy poco (~10 MB)</td>
                  <td className="py-2 px-3 font-medium text-red-600">Bastante (~100 MB)</td>
                  <td className="py-2 px-3 font-medium text-orange-600">Medio (~50 MB)</td>
                  <td className="py-2 px-3 font-medium text-red-600">Mucho (~500 MB+)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Lo importante:</strong> Go puede ejecutar millones de tareas pequeñas al mismo tiempo 
              usando muy poca memoria. En Python esto es prácticamente imposible debido al GIL. 
              Aunque JavaScript y Java tienen multi-thread, requieren mucha más memoria y son complicados 
              de programar. Go simplifica todo esto permitiendo millones de tareas con mínimos recursos.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold text-foreground">Simulador de Concurrencia</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Haz clic en "Ejecutar" para ver cómo cada lenguaje maneja 10.000 tareas simultáneamente.
          Observa el tiempo total y cómo se ejecutan las tareas.
        </p>
        <ConcurrencySimulator />
      </div>
    </div>
  )
}
