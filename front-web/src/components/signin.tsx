import { signinUrl } from '@/settings'
import { User } from 'lucide-react'

export function Signin() {
    return (
    <a href={signinUrl} className='flex items-center gap-3 text-left hover:text-gray-400'>
        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-400'>
            <User className='h-5 w-5 text-gray-500'/>
        </div>
        <p className='text-sm leading-snug max-w-[140px]'> 
            <span className='underline'>Crie sua conta e salve suas memórias</span> 
        </p>
    </a>
    )
}