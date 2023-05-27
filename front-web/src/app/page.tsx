import { api } from "@/lib/api"
import dayjs from "dayjs"
import { cookies } from "next/headers"
import ptBr from 'dayjs/locale/pt-br'
import Image from "next/image"
import { getUser } from "@/lib/auth"

interface Memory{
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

dayjs.locale(ptBr)

export default async function Home() {
  const autenticated =  getUser()
  const videoExtensions = [".mp4", ".avi", ".mov"]; // alterar no backend para salvar o tipo da mídia no banco, caso exista, para usar como validação, ao invés de deixar no front
  
  if (!autenticated){
      return (
        <div className="flex justify-center items-center h-screen">
          <p className='text-center leading-relaxed w-[360px]'>
            Você ainda não registrou nenhuma lembrança, comece <a href='/memories/new' className='underline hover:text-gray-500'>Agora</a>!
          </p>
        </div>
    )
  }

  const token = cookies().get('token')?.value
  const resMemories = await api.get("/memories", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const resBody: Memory[] = resMemories.data

  return (
    <div className="flex flex-col gap-10 p-8">
      {resBody.map(memory => {
        return(
          <div key={memory.id} className="space-y-4">
            <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-100">
              {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
            </time>
            {videoExtensions.includes(memory.coverUrl.substring(memory.coverUrl.lastIndexOf('.'))) ? 
              <video  src={memory.coverUrl} 
                      width={400} 
                      height={400}
                      controls
                      className="w-full object-cover rounded-lg"
              /> 
              : 
              <Image  src={memory.coverUrl} 
                width={400} 
                height={400} 
                alt=""
                className="w-full object-cover rounded-lg"
              />
            }
            <p className="text-lg leading-relaxed text-gray-100">
              {memory.excerpt}
            </p>
          </div>
        )
      })

      }
    </div>
  )

}
