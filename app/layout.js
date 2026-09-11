import { Albert_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import MobileNavbar from "./components/mobilenavbar";

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Hizwan Zameri",
  description: "UI/UX Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${albertSans.variable} ${instrumentSerif.variable} antialiased`}
      >
        <div className="w-full overflow-x-hidden">
      <img src="/grid-bg.png" alt="grid-img-bg" className="fixed top-0 right-0 lg:right-50 w-[400px]" />
      <Navbar />
      <MobileNavbar />
      <main className="flex flex-col py-30 px-8 lg:px-0 gap-8 items-center w-full lg:max-w-[768px] lg:mx-auto ">
        {children}
        </main>
        </div>
      </body>
    </html>
  );
}
