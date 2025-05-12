'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import VideoMode from '../mode/video-mode'
import FocusMode from '../mode/focus-mode'


function TokenDetails() {

    const searchParams = useSearchParams()
    const videoMode = searchParams.get("mode")
    const btnTab = [
        { name: "Video Mode", tab: "video" },
        { name: "Focus Mode", tab: "focus" }
    ]

    const router = useRouter()

    useEffect(() => {
        if (!videoMode) {
            router.replace("?mode=video", { scroll: false });
        }
    }, [videoMode, router]);

    return (
        <section className='flex flex-col w-full relative z-10 mx-auto flex-1'>

            <div className='flex flex-row items-center justify-center my-5 mx-auto relative z-10'>
                <div className='flex flex-row items-center justify-center bg-[#332F36] flex-1 min-w-full rounded-lg'>
                    {btnTab.map((mode) => (
                        <Link href={`?mode=${mode.tab}`} key={mode.name} >
                            <Button className={` ${mode.tab === videoMode ? "bg-[#F5F5F5] text-black hover:bg-gray-300" : "text-white bg-[#332F36] hover:bg-[#332F36]/20"} transition-colors duration-150 cursor-pointer flex-1 px-10 min-w-full rounded-lg font-light`}>{mode.name}</Button>
                        </Link>
                    ))}
                </div>
            </div>

            <div>
                {videoMode === "video" ? <VideoMode mode={videoMode} /> : <FocusMode mode={videoMode} />}
            </div>

        </section>
    )
}

export default TokenDetails
