"use client";

import { createContext, useContext, useState, useEffect, useRef, useMemo, type ReactNode } from "react";

type ScheduleItem = {
  id: string;
  time: string;
  title: string;
  description: string;
  type: string;
};

export const scheduleItems: ScheduleItem[] = [
  {
    id: "threads",
    time: "11:00 - 11:10",
    title: "Threads & Concurrencia",
    description:
      "Fundamentos de threads del CPU y diferencia entre concurrencia y paralelismo",
    type: "theory",
  },
  {
    id: "problems-with-concurrency",
    time: "11:10 - 11:20",
    title: "Problemas con la Concurrencia",
    description:
      "Condiciones de carrera, deadlocks y otros desafíos comunes en programación concurrente",
    type: "theory",
  },
  {
    id: "why-go",
    time: "11:20 - 11:25",
    title: "¿Por qué Go?",
    description:
      "Ventajas de Go para programación concurrente y su modelo de concurrencia",
    type: "theory",
  },
  {
    id: "visualization",
    time: "11:25 - 11:30",
    title: "Visualización Interactiva",
    description:
      "Exploración de simuladores de concurrencia y ejercicios prácticos",
    type: "hands-on",
  },
  {
    id: "goroutines",
    time: "11:30 - 11:45",
    title: "Goroutines",
    description:
      "Introducción a goroutines: creación, manejo y mejores prácticas",
    type: "hands-on",
  },
  {
    id: "channels",
    time: "11:45 - 12:00",
    title: "Channels",
    description:
      "Comunicación entre goroutines usando channels y patrones comunes",
    type: "hands-on",
  },
];

type TimerContextType = {
  currentTime: number;
  isRunning: boolean;
  currentItemIndex: number;
  toggleRunning: () => void;
  reset: () => void;
  getCurrentItemTimeLeft: () => number;
  getProgress: () => number;
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: ReactNode }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const parseTimeRange = (timeRange: string): { start: number; end: number } => {
    const [startStr, endStr] = timeRange.split(" - ");
    return {
      start: timeToMinutes(startStr),
      end: timeToMinutes(endStr),
    };
  };

  const workshopStartMinutes = timeToMinutes("11:00");

  // Calcular item actual basado en el tiempo transcurrido
  useEffect(() => {
    const currentMinutes = workshopStartMinutes + Math.floor(currentTime / 60);

    const newIndex = scheduleItems.findIndex((item) => {
      const { start, end } = parseTimeRange(item.time);
      return currentMinutes >= start && currentMinutes < end;
    });

    if (newIndex !== -1 && newIndex !== currentItemIndex) {
      setCurrentItemIndex(newIndex);
    }
  }, [currentTime, workshopStartMinutes, currentItemIndex]);

  // Timer principal
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const toggleRunning = () => {
    setIsRunning((prev) => !prev);
  };

  const reset = () => {
    setIsRunning(false);
    setCurrentTime(0);
    setCurrentItemIndex(0);
  };

  const getCurrentItemTimeLeft = (): number => {
    const currentItem = scheduleItems[currentItemIndex];
    if (!currentItem) return 0;

    const { end } = parseTimeRange(currentItem.time);
    const currentMinutes = workshopStartMinutes + Math.floor(currentTime / 60);
    const minutesLeft = end - currentMinutes;
    const secondsInCurrentMinute = currentTime % 60;

    return Math.max(0, minutesLeft * 60 - secondsInCurrentMinute);
  };

  const getProgress = (): number => {
    const currentItem = scheduleItems[currentItemIndex];
    if (!currentItem) return 0;

    const { start, end } = parseTimeRange(currentItem.time);
    const currentMinutes = workshopStartMinutes + currentTime / 60;
    const duration = end - start;
    const elapsed = currentMinutes - start;

    return Math.min(100, Math.max(0, (elapsed / duration) * 100));
  };

  const value = useMemo(
    () => ({
      currentTime,
      isRunning,
      currentItemIndex,
      toggleRunning,
      reset,
      getCurrentItemTimeLeft,
      getProgress,
    }),
    [currentTime, isRunning, currentItemIndex]
  );

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
}
