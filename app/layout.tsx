import type { Metadata } from 'next'
import { Inter, Merriweather, Ysabeau_Infant, IM_Fell_English } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const merriweather = Merriweather({ subsets: ['latin'], weight: ['300', '400', '700'], variable: '--font-serif' })
const ysabeau = Ysabeau_Infant({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-ysabeau' })
const imFell = IM_Fell_English({ subsets: ['latin'], weight: '400', style: 'normal', variable: '--font-imfell' })

export const metadata: Metadata = {
  title: 'Izhaaq - Essays & Insights',
  description: 'Long-form essays and reflections by Izhaaq, CEO of Unbothered and 11FPS ',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${inter.variable} ${merriweather.variable} ${ysabeau.variable} ${imFell.variable}`}>
      <body className="font-sans antialiased text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
