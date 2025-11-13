import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { LayoutHeader } from "@/components/layout-header";
import { TimerProvider } from "@/contexts/timer-context";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Concurrencia en Go",
  description: "Recursos y Workshopes para aprender concurrencia en Go.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${publicSans.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TimerProvider>
            <SidebarProvider>
              <AppSidebar />
              <div className="w-full">
                <LayoutHeader />
                <main className="flex-1">{children}</main>
              </div>
            </SidebarProvider>
          </TimerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
