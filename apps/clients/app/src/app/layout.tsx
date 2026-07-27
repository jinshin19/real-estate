// Css Imports
import "./global.css";

export const metadata = {
  title: "Hooma | Real Estate Landing Page",
  description: "Discover hand-picked properties and modern homes with Hooma.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
