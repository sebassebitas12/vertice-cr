import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Vértice — impresión FDM bajo consulta",
  description: "Explora referencias conceptuales de impresión FDM o cuéntanos qué pieza necesitas.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" data-theme="dark" suppressHydrationWarning><body>{children}</body></html>;
}
