"use client";

import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS } from '@/constants';
import Button from './Button';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    setLoggedIn(isLoggedIn);
    if (isLoggedIn) {
      setUsername(localStorage.getItem('username') || "");
    } else {
      setUsername("");
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    setLoggedIn(false);
    setUsername("");
    setDropdownOpen(false);
    router.push('/');
  };

  const handleProfile = () => {
    setDropdownOpen(false);
    router.push('/profile');
  };

  const handleSettings = () => {
    setDropdownOpen(false);
    router.push('/settings');
  };

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      <Link href="/">
        <Image src="/hilink-logo.svg" alt="logo" width={74} height={28} />
      </Link>

      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.key}>
            <Link
              href={link.href}
              key={link.key}
              className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="lg:flexCenter hidden">
        {!loggedIn ? (
          <Button
            type="button"
            title="Login"
            icon="/user.svg"
            variant="btn_dark_green"
            onClick={handleLogin}
          />
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-green-700 hover:bg-green-800 transition text-white font-semibold focus:outline-none"
              onClick={() => setDropdownOpen((open) => !open)}
            >
              <Image src="/user.svg" alt="profile" width={32} height={32} className="rounded-full bg-white" />
              <span>{username}</span>
              <svg className={`w-4 h-4 ml-1 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg py-2 z-50">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800"
                  onClick={handleProfile}
                >
                  View Profile
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800"
                  onClick={handleSettings}
                >
                  Settings
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 border-t border-gray-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <Image
        src="menu.svg"
        alt="menu"
        width={24}
        height={24}
        className="inline-block cursor-pointer lg:hidden"
      />
    </nav>
  );
};

export default Navbar;
