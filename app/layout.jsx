import './globals.css'

export const metadata = {
  title: 'WHEEL_SPINNER.EXE',
  description: 'A retro terminal-style wheel spinner',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

