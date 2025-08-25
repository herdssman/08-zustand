import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ["latin"],
  weight: ['400', '700'],
  display: 'block',
})

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'An app for managing all your notes',
  openGraph: {
    title: 'NoteHub',
    description: 'An app for managing all your notes',
    url: '/',
    siteName: 'NoteHub',
    images: [{
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 1200,
      height: 630,
      alt: 'NoteHub app',
    }],
    type: 'website',
  }
};

export default function RootLayout({
  children, modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}>
        <TanStackProvider>
          <Header/>
          {children}
          <hr />
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
