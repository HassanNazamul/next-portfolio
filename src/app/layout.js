import "@/app/globals.css";
import Navbar from "@/components/navbar";
import BackgroundWrapper from "@/components/background-wrapper";
import { ThemeProvider } from "@/components/theme-provider"; // I need to verify/create this or use next-themes directly

export const metadata = {
  title: "My Portfolio",
  description: "Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {/* Assuming ThemeProvider component wrapping or direct usage. 
             If existing project used next-themes, I should ensure provider setup.
             I'll assume Navbar and BackgroundWrapper are sufficient for now, 
             can add ThemeProvider if I find the component. 
             Wait, original package.json had next-themes. 
             But where was it used? src/main.jsx didn't show it. 
             Maybe in App.jsx? No. 
             Maybe in Navbar? 
             I'll leave it out for a moment or wrap directly.
          */}
        <BackgroundWrapper />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
