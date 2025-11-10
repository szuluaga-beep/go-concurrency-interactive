import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="space-y-8 text-center">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Image src="/motorcycle.svg" alt="Logo" width={200} height={200} />
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              Concurrencia en Go
            </h1>
          </div>

          {/* Description */}
          <div className="space-y-6 rounded-lg border border-border bg-card p-8">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">
                Bienvenido al Workshop de Concurrencia en Go
              </h2>
              <p className="mt-2 text-muted-foreground">
                Go es un lenguaje diseñado desde cero para la concurrencia moderna. En este
                Workshop descubrirás por qué Go es perfecto para aplicaciones concurrentes y cómo
                dominar sus poderosas características.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3 rounded-lg border border-border bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">¿Por qué Go?</h3>
              <p className="text-sm text-muted-foreground">
                Descubre las razones por las que Go es uno de los mejores lenguajes para
                programación concurrente
              </p>
            </div>

            <div className="space-y-3 rounded-lg border border-border bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <span className="text-2xl">👀</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">Visualización</h3>
              <p className="text-sm text-muted-foreground">
                Ve cómo funciona la concurrencia con visualizaciones interactivas
              </p>
            </div>

            <div className="space-y-3 rounded-lg border border-border bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-info/10">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">Goroutines</h3>
              <p className="text-sm text-muted-foreground">
                Aprende sobre goroutines, las unidades de concurrencia ligeras de Go
              </p>
            </div>

            <div className="space-y-3 rounded-lg border border-border bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <span className="text-2xl">📡</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">Channels</h3>
              <p className="text-sm text-muted-foreground">
                Domina los channels para comunicación segura entre goroutines
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/why-go">Comenzar Workshop</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/visualization">Ver Visualización</Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="text-3xl font-bold text-primary">4</div>
              <p className="text-sm text-muted-foreground">Secciones de aprendizaje</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="text-3xl font-bold text-info">∞</div>
              <p className="text-sm text-muted-foreground">Goroutines posibles</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
