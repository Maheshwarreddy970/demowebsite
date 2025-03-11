
import { constructMetadata } from "@/lib/utils";
import "./globals.css";

export const metadata = constructMetadata()


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      className=" "
      >
        {children}
      </body>
    </html>
  );
}
