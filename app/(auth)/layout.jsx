import TopNav from '@/components/ui/TopNav'
import Footer from '@/components/ui/Footer'
import { Plus_Jakarta_Sans } from 'next/font/google';
import Providers from '@/components/ui/Provider';
import '@/styles/globals.css'
export const metadata = {
  title: 'v0 App',
  description: 'Transform your healthcare experience with ORIS. Secure blockchain-based platform for managing medical records, insurance claims, and healthcare data.',
  keywords: 'healthcare management, blockchain healthcare, medical records, insurance claims, ORIS Health',
};

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
  preload: true,
});

export default function AuthLayout({ children }) {
  return (
    <Providers>
      <html lang="en" className={`${plusJakartaSans.variable}`}>
        <body className=' w-full min-h-screen bg-[#360984] flex  items-center justify-center'>
          <main className='  w-[99vw] bg-[url("/assets/Sign-Up_Patient.png")] bg-cover bg-no-repeat'>
            <header className='w-[99vw] absolute '>
            <TopNav />
            </header>
            {children}
            <Footer />
          </main>
          
        </body>
      </html>
    </Providers>


  )
} 