# Concurrencia en Go - Workshop Interactivo

Un Workshop interactivo y educativo sobre concurrencia en Go, construido con Next.js y componentes de shadcn.

## 🎯 Características

- **4 Secciones Educativas:**
  - ¿Por qué Go? - Razones para aprender concurrencia en Go
  - Visualización - Herramientas interactivas para entender concurrencia
  - Goroutines - Aprende sobre las unidades de concurrencia de Go
  - Channels - Domina la comunicación entre goroutines

- **Interfaz Moderna:**
  - Sidebar navegable
  - Diseño responsivo
  - Componentes de shadcn/ui
  - Tema claro/oscuro

- **Contenido Completo:**
  - Explicaciones claras
  - Ejemplos de código
  - Comparativas con otros lenguajes
  - Patrones y buenas prácticas

## 🚀 Comenzar

### Requisitos previos
- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <repo-url>
cd go-concurrency-interactive

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── layout.tsx          # Layout principal con sidebar
│   ├── page.tsx            # Página de inicio
│   ├── globals.css         # Estilos globales
│   ├── why-go/             # Sección: ¿Por qué Go?
│   ├── visualization/      # Sección: Visualización
│   ├── goroutines/         # Sección: Goroutines
│   └── channels/           # Sección: Channels
└── components/
    ├── app-sidebar.tsx     # Componente de sidebar
    └── ui/                 # Componentes de shadcn/ui
```

## 🎨 Paleta de Colores

- **Primario**: #00825A (Verde oscuro)
- **Secundario**: #B0F2AE (Verde claro)
- **Acento**: #DFFF61 (Amarillo)
- **Info**: #99D1FC (Azul claro)
- **Fondo**: #FAFAFA (Claro) / #2C2A29 (Oscuro)

## 🛠️ Tecnologías

- **Next.js** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Estilos
- **shadcn/ui** - Componentes accesibles
- **Lucide Icons** - Iconos

## 📚 Contenido

### Página: ¿Por qué Go?
- Simplicidad del lenguaje
- Rendimiento superior
- Herramientas integradas
- Multiplataforma
- Comparativa con Python, Java/C++, Rust

### Página: Visualización
- Simulación interactiva de tareas concurrentes
- Comparación visual: ejecución secuencial vs concurrente
- Indicadores de estado en tiempo real

### Página: Goroutines
- Definición y características
- Ejemplo básico
- Ciclo de vida
- Ligeras, fáciles de usar, multiplexadas
- Buenas prácticas

### Página: Channels
- Tipos de channels (buffered/unbuffered)
- Operaciones básicas
- Select statement
- Patrones comunes
- Errores comunes

## 🧪 Comandos

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Producción
npm run start

# Linter
npm run lint

# Formato
npm run format
```

## 📝 Licencia

MIT

## 👨‍💻 Autor

Workshop creado para enseñar concurrencia en Go de forma interactiva.

