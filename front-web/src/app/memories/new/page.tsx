'use client'

import { MediaView } from "@/components/media";
import { api } from "@/lib/api";
import { Camera, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Cookie from 'js-cookie'
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function NewMemory(){
    const router = useRouter()

    async function handleCreateMemory(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        let coverUrl = formData.get("mediaUrl")
        const token = Cookie.get('token')


        if (coverUrl){
            const uploadPayload = new FormData()
            uploadPayload.set('file', coverUrl)

            const uploadRes = await api.post("/upload", uploadPayload)

            coverUrl = uploadRes.data.fileUrl
        }

        await api.post("/memories", {
            coverUrl,
            content: formData.get("content"),
            isPublic: formData.get("isPublic")
        } , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )

        router.push("/")
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-16">
            <Link href="/" className="flex itmes-center gap-1 text-sm text-gray-200 hover:text-gray-500">
                <ChevronLeft className="h-4 w-4"/>
                Voltar à timeline
            </Link>

            <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
                <div className="flex items-center gap-4">
                    <label htmlFor="media" className="flex cursor-pointer itmes-center text-sm text-gray-200 hover:text-gray-500">
                        <Camera className="h-4 w-4" />
                        Anexar Mídia
                    </label>
                    

                    <label htmlFor="isPublic" className="flex itmes-center text-sm text-gray-200 hover:text-gray-500">
                        <input type="checkbox" name="isPublic" id="isPublic" value="true" className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-600"/>
                        Tornar memória pública
                    </label>
                </div>
                <MediaView/>

                <textarea name="content" spellCheck={false} id="" className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-large leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0" placeholder="Adicione fotos, vídeos e mais" >
                </textarea>

                <button type="submit" className='self-end rounded-full bg-green-600 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-800'>
                    Salvar
                </button>
            </form>
        </div>
    )
}