"use client";
import React from 'react';

interface ThemeSwitchProps {
  theme: string;
  onToggle: () => void;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ theme, onToggle }) => (
  <button
    onClick={onToggle}
    className="
      p-2 rounded-full border
      bg-gray-800
      shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400
      transition-all duration-300 ease-in-out flex items-center justify-center
    "
    aria-label="Toggle theme"
  >
    {theme === 'light' ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" /></svg>
    )}
  </button>
);

export default ThemeSwitch; 