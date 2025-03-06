import '../../styles/globals.css';
import TopNav from '../../components/ui/TopNav';
import Footer from '../../components/ui/Footer'
import { Plus_Jakarta_Sans } from 'next/font/google';
import Providers from '../../components/ui/Provider';


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


export default function MainLayout({
  children,
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable}`}>
      <Providers>
        <body className="bg-[#360984] min-h-screen flex items-center justify-center font-jakarta">
          <section className=' bg-black rounded-sm w-[99vw]'>
            <TopNav />
            <main className='flex-grow relative' >
              {children}
            </main>
            <Footer />
          </section>
        </body>
      </Providers>
    </html>
  );
}
