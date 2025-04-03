import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";

export const metadata = {
  title: "Ekkremis",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
        <div className="flex">
          <Navbar />
          <div className="w-screen md:ml-64 ml-16">
            <Header />
            {children}
          </div>
        </div>
  );
}


