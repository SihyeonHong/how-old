import React from "react";

import { cn } from "@/utils/classname";

export type TabId = "age" | "birth-year";

interface Tab {
  id: TabId;
  label: string;
}

interface TabsProps {
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
  children: React.ReactNode;
}

const tabs: Tab[] = [
  { id: "age", label: "몇 살이지?" },
  { id: "birth-year", label: "몇 년생이지?" },
];

export default function Tabs({ activeTab, onTabChange, children }: TabsProps) {
  return (
    <div className="mx-auto w-full max-w-lg lg:mx-0">
      {/* 탭 버튼 영역 */}
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex-1 px-4 py-2 text-center font-semibold transition-colors",
              activeTab === tab.id
                ? "bg-white text-stone-900"
                : "bg-stone-300 text-stone-500 hover:bg-stone-400 hover:text-stone-900",
            )}
            aria-selected={activeTab === tab.id}
            aria-label={tab.label}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* 탭 내용 영역 */}
      <div className="rounded-b-sm bg-white p-8 shadow-md sm:rounded-sm">
        {children}
      </div>
    </div>
  );
}
