import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes);
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleTimeString("en-US", options);
};

export const calculateHours = (startTime: string, endTime: string): number => {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const startDate = new Date(0, 0, 0, startHour, startMinute);
  const endDate = new Date(0, 0, 0, endHour, endMinute);

  // If the end time is earlier than the start time, assume it crosses midnight
  if (endDate < startDate) {
    endDate.setDate(endDate.getDate() + 1);
  }

  const diff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60); // Difference in hours
  return diff;
};

const dateNow = new Date();

export const formattedDate = dateNow.toLocaleDateString("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
});

export const formattedTime = dateNow.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

export const formatCountdown = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};
