import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Concurrencia en Go",
  description: "Recursos y tutoriales para aprender concurrencia en Go.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${publicSans.variable}`}>
        <SidebarProvider>
          <AppSidebar />
          <div className="w-full">
            <div className="flex items-center gap-2 border-b border-border bg-card p-2">
              <SidebarTrigger />
              <h1 className="font-semibold text-foreground">Concurrencia en Go</h1>
            </div>
            <main className="flex-1">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
