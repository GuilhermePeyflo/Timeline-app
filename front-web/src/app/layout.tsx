import { Hero } from '@/components/Hero'
import './globals.css'
import { Roboto_Flex, Bai_Jamjuree } from 'next/font/google'
import { Profile } from '@/components/Profile'
import { Signin } from '@/components/signin'
import { cookies } from 'next/headers'

const roboto = Roboto_Flex({ subsets: ['latin'], variable: "--font-roboto" })
const bai = Bai_Jamjuree({ subsets: ['latin'], weight: '700', variable: "--font-bai" })

export const metadata = {
  title: 'App Timeline',
  description: 'Cápsula do tempo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const autenticated =  cookies().has('token')


  return (
    <html lang="en">
      <body className={`${roboto.variable} ${bai.variable} font-sans bg-gray-900 text-gray-100`}>
      
        <main className='grid grid-cols-2 min-h-screen'>
          <div className='bg-[url(../assets/stars.svg)] bg-cover relative flex flex-col items-start justify-between overflow-hidden px-28 py-16'>
            
            <div className='absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-800 opacity-50 blur-full'></div>
            <div className='absolute right-0 bottom-0 top-0 w-2 bg-stripes'></div>

            {autenticated ? <Profile/> : <Signin/>}
            <Hero/>
            <div>
                Guigo`s development
            </div>
          </div>


          <div className='flex flex-col bg-[url(../assets/stars.svg)] bg-cover overflow-y-scroll max-h-screen'>
                {children}
          </div>
        </main>
      
      
      </body>
    </html>
  )
}
