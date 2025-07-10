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
            position="bottom-left"
            toastOptions={{
              style: {
                fontSize: '1.15rem',
                padding: '1.25rem 2rem',
                borderRadius: '1rem',
                minWidth: '300px',
                maxWidth: '90vw',
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
