import type { Metadata } from "next";
import {Roboto} from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar/sidebar";
import styles from "./layout.module.css";
import Navbar from "@/components/navbar/navbar";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  style: ["italic","normal"]
});

export const metadata: Metadata = {
  title: "Tymli - Internal Documentation",
  description: "Tymli is an internal documentation tool for teams to manage their knowledge base.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
        <div className={styles.nav}>
          <Navbar>
            <Sidebar />
          </Navbar>
        </div>
        <div className={styles.container}>
          <div className={styles.sidebar}>
            <Sidebar/>
          </div>
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
