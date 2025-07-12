import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Travelis - Plan Your Next Adventure",
  description: "Discover amazing destinations, book unforgettable experiences, and create memories that last a lifetime",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                fontSize: '1rem',
                padding: '1rem 1.5rem',
                borderRadius: '0.75rem',
                minWidth: '300px',
                maxWidth: '90vw',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              },
              success: {
                style: {
                  background: '#f0fdf4',
                  color: '#166534',
                  border: '1px solid #bbf7d0',
                },
                iconTheme: {
                  primary: '#16a34a',
                  secondary: '#f0fdf4',
                },
              },
              error: {
                style: {
                  background: '#fef2f2',
                  color: '#dc2626',
                  border: '1px solid #fecaca',
                },
                iconTheme: {
                  primary: '#dc2626',
                  secondary: '#fef2f2',
                },
              },
            }}
          />
          <Navbar />
          <main className="relative overflow-hidden pt-16 lg:pt-20">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
