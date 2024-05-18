import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "~/features/header";

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}  h-full`}>
      <body className="theme-dark-1 scrollbar-track-[var(--accent)] h-full">
        <div id="overlay"></div>
        <div
          id="portal"
          style={{
            overflow: "hidden",
          }}
        ></div>
        <div
          id="user-nav"
          style={{
            position: "sticky",
            bottom: "25px",
            marginTop: "25px",
            zIndex: "1000",
          }}
        ></div>
        <div id="toast"></div>
        <TRPCReactProvider>
          <Header />

          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
