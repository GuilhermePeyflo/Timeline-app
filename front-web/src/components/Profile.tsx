
import Image from 'next/image'
import { User, getUser } from './../lib/auth'
import Link from 'next/link'

export function Profile({ user }) {
    const {name, avatarUrl} = user

    return (
        <div className='flex items-center gap-3 text-left'>
            <Image src={avatarUrl} width={40} height={40} alt='' className='h-10 w-10 rounded-full'/>
            <p className='text-sm leading-snug max-w-[140px]'> 
                <span className=''>{name}</span> 
                <a href="/api/auth/logout" className='block text-red-400 hover:text-red-800'>
                    Quero sair
                </a>
            </p>
        </div>
    )
}