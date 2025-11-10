
import { CPUThreadsVisualizer } from '@/components/cpu-threads-visualizer';
import { GoGoroutineSimulator } from '@/components/go-goroutine-simulator';
import { ThreadEducation } from '@/components/thread-education';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ThreadsPage() {
    return (
        <div className="min-h-screen bg-background">
            <main className="space-y-8 p-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Threads & Concurrencia</h1>
                    <p className="text-muted-foreground">
                        Entiende cómo funcionan los threads del CPU y por qué Go es superior.
                    </p>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="concepts" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="concepts">Conceptos</TabsTrigger>
                        <TabsTrigger value="cpu-threads">CPU Threads</TabsTrigger>
                    </TabsList>

                    {/* Tab: Conceptos */}
                    <TabsContent value="concepts" className="space-y-6">
                        <ThreadEducation />
                    </TabsContent>

                    {/* Tab: CPU Threads */}
                    <TabsContent value="cpu-threads" className="space-y-6">
                        <CPUThreadsVisualizer />
                        
                        <Card className="border-l-4 border-blue-500">
                            <CardHeader>
                                <CardTitle className="text-base">Clave</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <p>✓ Más threads = más tareas en paralelo (en multi-core)</p>
                                <p>✗ Crear OS threads es costoso en memoria</p>
                                <p>💡 Go resuelve esto con goroutines ligeras</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    
                </Tabs>

                {/* Comparativa Final */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">OS Threads vs Goroutines</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-3">
                                <h4 className="font-semibold">OS Threads</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• Creados por el SO</li>
                                    <li>• ~2MB memoria cada uno</li>
                                    <li>• Crear/destruir es lento</li>
                                    <li>• Máximo: cientos</li>
                                </ul>
                            </div>
                            <div className="space-y-3">
                                <h4 className="font-semibold text-green-600 dark:text-green-400">Goroutines (Go)</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• Creadas por Go runtime</li>
                                    <li>• ~2KB memoria cada una</li>
                                    <li>• Crear/destruir es ultra rápido</li>
                                    <li>• Máximo: millones</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
