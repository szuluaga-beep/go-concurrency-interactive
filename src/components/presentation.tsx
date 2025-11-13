import Image from "next/image";
import { Card } from "./ui/card";

export const Presentation = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-primary">
        Con ustedes:
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Steven Zuluaga */}
        <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative w-40 h-40 rounded-full overflow-hidden ring-4 ring-blue-500/20 hover:ring-blue-500/40 transition-all">
              <Image
                src="/steven.png"
                alt="Steven Zuluaga Cortés"
                width={160}
                height={160}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Steven Zuluaga Cortés</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Desarrollador Fullstack - Gestión del Fraude
              </p>
              <p className="text-sm leading-relaxed">
                Me gusta viajar, comer y pasar tiempo con mi familia.
              </p>
            </div>
          </div>
        </Card>

        {/* Juanfer Villadiego */}
        <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative w-40 h-40 rounded-full overflow-hidden ring-4 ring-purple-500/20 hover:ring-purple-500/40 transition-all bg-linear-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center">
              <Image
                src="/juan.png"
                alt="Juanfer Villadiego"
                width={160}
                height={160}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Juanfer Villadiego</h3>
              <p className="text-sm text-muted-foreground">
                Líder Técnico - Gestión del Fraude
              </p>
              <p className="text-sm leading-relaxed mt-4">
                Me gusta la cocina y tocar la guitarra.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
