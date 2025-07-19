import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";


export const metadata: Metadata = {
  title: "Andrew Gillis | Software Design & Development",
  description: "Montreal-based software designer and developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className="antialiased font-sans"
      >
        {children}
      <Toaster />
      </body>
    </html>
  );
}

