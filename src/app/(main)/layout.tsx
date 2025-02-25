import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Bricolage_Grotesque } from "next/font/google";

const bricolageGrotesque = Bricolage_Grotesque({
    subsets: ["latin"],
    weight: ["200"], // Load only weight 200
    variable: "--font-bricolage", // Add a CSS variable for Tailwind usage
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className={`${bricolageGrotesque.className} font-bricolage bg-background text-foreground`}>
            <Navbar />
            {children}
            <Footer />
        </main>
    );
}
