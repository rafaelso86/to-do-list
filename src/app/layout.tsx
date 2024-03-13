import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700']
})

export const metadata: Metadata = {
  title: 'To-Do List',
  description: 'Desenvolvido para estudos no front-end com NextJS, Material UI e Typescript além do back-end com Nodejs, Prisma e JWT ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <body className={roboto.className}>
            <div className="container">{children}</div>
          </body>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  )
}
