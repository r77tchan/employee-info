import Link from 'next/link'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '情報共有社員一覧システム',
  description: 'employee-info',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="bg-black text-white mb-12">
          <ul className="flex justify-center">
            <li>
              <Link href="/" className="hover:bg-gray-600 p-4 cursor-pointer block">
                ホーム
              </Link>
            </li>
            <li>
              <Link href="/list" className="hover:bg-gray-600 p-4 cursor-pointer block">
                社員一覧
              </Link>
            </li>
          </ul>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
