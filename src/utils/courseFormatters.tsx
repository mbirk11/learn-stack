import { FiMonitor, FiUsers } from "react-icons/fi";
import { PiCloudSun, PiMoonLight, PiSun } from "react-icons/pi";
import { TbChartCircles } from "react-icons/tb";
import type { ReactNode } from "react";

export function capitalize(value: string) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function cap(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1, 3);
}

export function normalizeWeeklyScheduleLabel(label: string) {
  if (!label) return "";

  const cleaned = label
    .toLowerCase()
    .replace(/\bonly\b/g, "") // remove "only"
    .trim();

  if (!cleaned.includes("-")) {
    const firstWord = cleaned.split(" ")[0];
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
  }

  const parts = cleaned.split("-").map((p) => p.trim());

  return `${cap(parts[0])}-${cap(parts[1])}`;
}

export function normalizeSessionTypeLabel(name: string) {
  if (!name) return "";

  const normalized = name.toLowerCase().replace(/[_–—]/g, "-").trim();

  if (normalized === "in-person" || normalized === "in_person") {
    return "In-Person";
  }

  if (normalized === "online") {
    return "Online";
  }

  if (normalized === "hybrid") {
    return "Hybrid";
  }

  return capitalize(name);
}

export function getTimeSlotTitle(label: string) {
  const normalized = label.toLowerCase();

  if (normalized.includes("morning")) return "Morning";
  if (normalized.includes("afternoon")) return "Afternoon";
  if (normalized.includes("evening")) return "Evening";

  return label;
}

export function getTimeSlotSubtitle(item: {
  label: string;
  startTime?: string;
  endTime?: string;
}) {
  const match = item.label.match(/\((.*?)\)/);

  if (match) {
    return match[1]; // text inside ()
  }

  return item.label;
}

export function getTimeSlotIcon(label: string): ReactNode {
  const normalized = label.toLowerCase();

  if (normalized.includes("morning")) return <PiCloudSun />;
  if (normalized.includes("afternoon")) return <PiSun />;

  return <PiMoonLight />;
}

export function getSessionTypeIcon(name: string): ReactNode {
  const normalized = name.toLowerCase();

  if (normalized.includes("online")) return <FiMonitor />;
  if (normalized.includes("in-person") || normalized.includes("in_person")) {
    return <FiUsers />;
  }
  if (normalized.includes("hybrid")) return <TbChartCircles />;

  return <FiUsers />;
}
