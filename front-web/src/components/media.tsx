'use client'

import Image from "next/image"
import { ChangeEvent, useState } from "react"

export function MediaView(){
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [previewVideo, setPreviewVideo] = useState<string | null>(null)


    function onFileSelected(event: ChangeEvent<HTMLInputElement>){
        const {files} = event.target

        if (!files) {
            return
        }
        const previewURL = URL.createObjectURL(files[0])

        if (files[0].type.includes("video")){
            setPreviewVideo(previewURL)
            setPreviewImage(null)
        }else {
            setPreviewImage(previewURL)
            setPreviewVideo(null)
        }
    }

    return (
        <>
            <input 
                type="file"
                name="mediaUrl"
                onChange={onFileSelected}
                id="media"
                accept="image/*,video/*"
                className="invisible w-0 h-0"
            />


            {previewImage && <Image src={previewImage} width={200} height={200} alt="" className="aspect-video w-full rounded-lg object-cover"/>}
            {previewVideo && <video src={previewVideo} controls className="aspect-video w-full rounded-lg object-cover"/>}
        </>
    )
}