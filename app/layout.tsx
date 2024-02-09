import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import AIChatbot from "@/components/AIChatbot";
import { GlobalStateContextWrapper } from "@/components/global-state-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Disney+ Clone",
  description: "Hobby Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-[#1A1C29]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalStateContextWrapper>
            <Header />
            <AIChatbot />
            {children}
          </GlobalStateContextWrapper>
        </ThemeProvider>
        <footer className="my-2 mb-4">
          <p className="text-center">Disney+ AI Clone</p>
        </footer>
      </body>
    </html>
  );
}
