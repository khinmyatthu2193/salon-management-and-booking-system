"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const themes = [
  { value: "white", label: "Light" },
  { value: "dark", label: "Dark" },
];

function ThemeCard({ active, onClick, variant }: { active: boolean; onClick: () => void; variant: "light" | "dark" }) {
  const isLight = variant === "light";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-44 h-32 rounded-lg border-2 p-3 transition-all cursor-pointer ${
        active
          ? "border-primary ring-2 ring-primary/20"
          : "border-border hover:border-muted-foreground/30"
      } ${isLight ? "bg-white" : "bg-[#1A1A1A]"}`}
    >
      <div className={`w-full h-full rounded-md p-2 space-y-1.5 ${isLight ? "bg-gray-50" : "bg-[#2E2E2E]"}`}>
        <div className={`h-1.5 rounded-full w-3/4 ${isLight ? "bg-gray-200" : "bg-gray-600"}`} />
        <div className={`h-1.5 rounded-full w-1/2 ${isLight ? "bg-gray-200" : "bg-gray-600"}`} />
        <div className={`h-1.5 rounded-full w-5/6 ${isLight ? "bg-gray-200" : "bg-gray-600"}`} />
        <div className={`h-3 rounded-md w-full mt-2 ${isLight ? "bg-gray-100" : "bg-[#3A3A3A]"}`}>
          <div className={`h-1 rounded-full w-2/3 mx-2 mt-1 ${isLight ? "bg-gray-200" : "bg-gray-600"}`} />
        </div>
        <div className={`h-3 rounded-md w-full ${isLight ? "bg-gray-100" : "bg-[#3A3A3A]"}`}>
          <div className={`h-1 rounded-full w-1/2 mx-2 mt-1 ${isLight ? "bg-gray-200" : "bg-gray-600"}`} />
        </div>
      </div>
    </button>
  );
}

export function AppearanceForm() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = resolvedTheme === "dark" ? "dark" : "white";

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day and night themes.
        </p>
      </div>
      <hr className="border-border" />
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium">Theme</h4>
          <p className="text-sm text-muted-foreground">Select the theme for the dashboard.</p>
        </div>
        <div className="flex gap-4">
          {themes.map((t) => (
            <div key={t.value} className="flex items-center gap-3">
              <ThemeCard
                active={currentTheme === t.value}
                onClick={() => setTheme(t.value)}
                variant={t.value === "white" ? "light" : "dark"}
              />
              <span className="text-sm font-medium">{t.label}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-start pt-2">
          <Button onClick={() => {}} disabled>Update preferences</Button>
        </div>
      </div>
    </div>
  );
}
