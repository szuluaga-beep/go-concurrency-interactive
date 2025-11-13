"use client";

import * as React from "react";
import { BookOpen, Eye, Zap, Waves, Home, Cpu, CalendarDays } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";

const navItems = [
  {
    title: "Inicio",
    href: "/",
    icon: Home,
  },
  {
    title: "Cronograma",
    href: "/schedule",
    icon: CalendarDays,
    description: "Agenda del workshop de concurrencia",
  },
  {
    title: "Threads & Concurrencia",
    href: "/threads",
    icon: Cpu,
    description: "Entiende cómo funcionan los threads del CPU",
  },
  {
    title: "¿Por qué Go?",
    href: "/why-go",
    icon: BookOpen,
    description: "Razones para aprender concurrencia en Go",
  },
  {
    title: "Visualización",
    href: "/visualization",
    icon: Eye,
    description: "Visualiza cómo funciona la concurrencia",
  },
  {
    title: "Goroutines",
    href: "/goroutines",
    icon: Zap,
    description: "Las goroutines y cómo usarlas",
  },
  {
    title: "Channels",
    href: "/channels",
    icon: Waves,
    description: "Channels para comunicación entre goroutines",
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={100} height={100} />
          <span className="font-semibold text-sidebar-foreground">
            Concurrencia en Go
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={`${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                >
                  <Link href={item.href} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
                {item.description && (
                  <p className="ml-6 mt-1 text-xs text-sidebar-foreground/60">
                    {item.description}
                  </p>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-center">
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
