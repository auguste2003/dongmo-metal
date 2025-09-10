import type {Metadata} from 'next';
import { PT_Sans } from 'next/font/google'
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/auth-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { siteConfig } from '@/lib/data';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-pt-sans',
})

const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');


export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: `${siteConfig.name} - concevoir le devoir`,
    template: `%s - ${siteConfig.name}`
  },
  description: 'Artisan soudeur au Cameroun. Créations sur mesure de portails, barrières, rampes et plus. Solidité, élégance, fiabilité.',
  openGraph: {
    title: `${siteConfig.name} - concevoir le devoir`,
    description: 'Artisan soudeur spécialisé dans la création sur mesure d\'ouvrages métalliques.',
    url: defaultUrl,
    siteName: siteConfig.name,
    images: [
      {
        url: '/logo_.png',
        width: 512,
        height: 512,
        alt: `Logo de ${siteConfig.name}`,
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - concevoir le devoir`,
    description: 'Artisan soudeur spécialisé dans la création sur mesure d\'ouvrages métalliques.',
    images: ['/logo_.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={ptSans.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <AuthProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
