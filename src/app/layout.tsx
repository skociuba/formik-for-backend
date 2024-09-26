import type {Metadata} from 'next';
import {Inter} from 'next/font/google';

import Nav from './components/commons/Nav';
import './styles/globals.css';
import ReactQueryProvider from './providers/ReactQueryProvider';
const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'S Kociuba - Portfolio',
  description: 'Generated by create next app',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body
        className={inter.className}
        style={{
          backgroundImage: "url('/images/background.jpg')",
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
        }}>
        <ReactQueryProvider>
          <Nav />
          <main>{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
