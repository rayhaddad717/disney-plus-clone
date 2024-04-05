import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import AIChatbot from "@/components/AIChatbot";
import { GlobalStateContextWrapper } from "@/components/global-state-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MovieGenie",
  description: "Hobby Project",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const configuration = {
    ALLOW_AI: process.env.ALLOW_AI === "true",
  };
  return (
    <html lang="en">
      <body className="bg-white dark:bg-[#1A1C29] flex flex-col overflow-y-auto h-[100vh]">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalStateContextWrapper>
            <Header />
            {configuration.ALLOW_AI && <AIChatbot />}
            {children}
          </GlobalStateContextWrapper>
        </ThemeProvider>
        <footer className="my-2 pb-4 flex flex-col items-center w-full mt-20 gap-6 ">
          <a
            href="https://www.flaticon.com/free-icons/clean"
            title="clean icons"
          >
            Clean icons created by Good Ware - Flaticon
          </a>
          <p className="text-center">Movie Genie &copy;2024 | Ray Haddad</p>
        </footer>
      </body>
    </html>
  );
}
