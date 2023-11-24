import type { Metadata } from 'next'
import './globals.scss';
import './lib/client.js';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Chat App',
  description: 'chat app built with next.js.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  )
}
