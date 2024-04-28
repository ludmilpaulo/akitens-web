import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderTopArea from "@/components/HeaderTopArea";
import StoreProvider from "@/redux/StoreProvider";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aki Tens - Compra e Venda de Produtos, Busca de Serviços",
  description:
    "Aki Tens é uma plataforma onde você pode comprar e vender uma variedade de produtos, além de encontrar serviços locais. Encontre tudo o que precisa, desde produtos exclusivos até serviços especializados, tudo em um só lugar. Junte-se à nossa comunidade e explore uma variedade de ofertas e oportunidades. Com Aki Tens, simplificamos a compra e venda, proporcionando uma experiência conveniente e segura para todos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="pt">
        <body className={inter.className}>
          <HeaderTopArea />
          {children}
          <Footer />
        </body>
      </html>
    </StoreProvider>
  );
}
