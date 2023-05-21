import Image from "next/image"

import Logo from "../assets/logo.svg"
import Link from "next/link"

export function Hero() {
    return (
        <div className='space-y-5'>
            <Image src={Logo} alt='Logo NLW' />
            <div className='max-w-[420px] space-y-1'>
              <h1 className='mt-5 text-5xl font-bold leading-tight text-gray-100'>
                Sua cápsula do tempo
              </h1>
              <p className='leading-relaxed'>
                Colecione momentos marcantes da sua jornada e compartilhe com o mundo
              </p>
            </div>

            <Link href="/memories/new" className='inline-block rounded-full bg-green-600 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-800'>
              Criar lembrança
            </Link>
        </div>
          
    )
}