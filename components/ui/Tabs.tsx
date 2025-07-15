import React from 'react';

interface Tab {
  value: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  currentTab: string;
  onTabChange: (tab: string) => void;
}

// Custom scrollbar styles
const scrollbarStyle = {
  scrollbarWidth: 'thin',
  scrollbarColor: '#22c55e #e5e7eb', // green-500 on gray-200
} as React.CSSProperties;

export default function Tabs({ tabs, currentTab, onTabChange }: TabsProps) {
  return (
    <nav
      className="flex space-x-4 sm:space-x-8 overflow-x-auto whitespace-nowrap px-2"
      style={scrollbarStyle}
    >
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            currentTab === tab.value
              ? 'border-green-500 text-green-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
} 