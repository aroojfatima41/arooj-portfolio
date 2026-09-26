import { spaceGrotesk, inter, jetbrainsMono } from './fonts';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#0B1220] text-[#E8EDF4] font-body">
        {children}
      </body>
    </html>
  );
}