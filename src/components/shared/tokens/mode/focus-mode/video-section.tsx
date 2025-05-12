import VideoPlayer from '@/components/shared/video-player'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'
import { useMediaQuery } from 'react-responsive';
import { FiThumbsUp } from "react-icons/fi";
import { LuThumbsDown } from "react-icons/lu";
import { PiShareFat } from "react-icons/pi";
import images from "@public/images/glow_bottom.png";
import { IoLogoInstagram } from "react-icons/io5";
import { TfiWorld } from "react-icons/tfi";
import { TbBrandDiscord } from "react-icons/tb";
import { PiTelegramLogoDuotone } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
import Link from 'next/link';


function VideoSection() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const buttons = [
        { name: "Instagram", path: "", icon: <IoLogoInstagram color='white' size={19} /> },
        { name: "Website", path: "", icon: <TfiWorld color='white' size={19} /> },
        { name: "Telegram", path: "", icon: <PiTelegramLogoDuotone color='white' size={19} /> },
        { name: "Twitter", path: "", icon: <FaXTwitter color='white' size={19} /> },
        { name: "Discord", path: "", icon: <TbBrandDiscord color='white' size={19} /> },
    ]
    return (
        <div className='flex flex-row sm:flex-col xl:flex-row w-full gap-5 mt-5'>
            {/* <VideoPlayer
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                title="Sample Video from an API"
                className='relative w-full md:max-w-full lg:max-w-sm overflow-hidden rounded-lg bg-black shadow-xl border border-gray-300'
                height={isTabletOrMobile ? "400px" : "570px"}
                poster="https://images.pexels.com/photos/31023570/pexels-photo-31023570/free-photo-of-romantic-dinner-with-st-peter-s-dome-in-view.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            /> */}

            {/* Token information */}
            <div className='flex flex-col'>
                <div className='flex flex-row urbanist gap-3'>
                    <h1 className='text-white text-4xl font-semibold'>SOL</h1>
                    <h1 className='text-white/50 text-2xl'>Solana</h1>
                </div>

                <div className='flex flex-row justify-between max-w-full items-center my-3'>
                    <div className='flex gap-3 items-center flex-row'>
                        <Image src={images} fetchPriority='high' alt='High_Avatar' className='h-16 w-16 border border-white rounded-full' />
                        <div className='flex flex-col py-3'>
                            <h1 className='text-xl'>Devtoken_0012</h1>
                            <h1 className='text-lg text-white/25'>1500 Followers</h1>
                        </div>
                    </div>

                    <div className='flex flex-row gap-4'>
                        <button className='flex flex-row items-center rounded-full border border-white/25 px-6 gap-5 py-1.5'>
                            <div className='flex flex-row items-center gap-2 border-r'><FiThumbsUp size={20} color='white' />
                                <span className='text-lg'>34</span></div>
                            <div className='flex '> <LuThumbsDown color='white' size={20} /> <span></span></div>
                        </button>
                        <button className='flex flex-row items-center rounded-full border gap-2 border-white/25 px-6 py-1.5'>
                            <PiShareFat color='white' /> <span className='text-sm'>Share</span></button>
                    </div>
                </div>

                {/* description */}
                <blockquote className='text-base text-[#F5F5F5]'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla facilisi. Sed euismod, nunc at feugiat feugiat, metus
                    nisl luctus est, a dictum orci turpis ut urna.
                    Ut non lectus at odio scelerisque fringilla.
                </blockquote>


                {/* social medias */}
                <div className='flex items-center gap-2 my-3'>
                    {buttons.map(({ path, name, icon }) => (
                        <Link href={path}>
                            <button className='flex flex-row items-center gap-3 rounded-full border border-white/25 py-2 px-3'>
                                <span className='text-sm urbanist'>  {name} </span><span>{icon}</span>
                            </button>
                        </Link>
                    ))}
                </div>
                <hr className={"text-white/25  my-5"} />
                <div className='flex flex-col w-full'>
                    <h1>Comments</h1>

                    <div className='flex flex-col'>
                        <div className='flex flex-row items-center'>
                            <h1 className='text-white text-lg font-medium'>@Devtoken_001: <span className='text-white/50 font-light text-sm'>15 sec</span></h1>
                        </div>
                        <blockquote className='text-base text-white'>
                            This is the best Video ever. This will go to the moon.
                        </blockquote>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoSection
