
import VideoPlayer from '@/components/shared/video-player';
import { ChevronDown, ThumbsUp } from 'lucide-react';
import { PiThumbsDownBold } from "react-icons/pi";
import TokenInfo from './token-info';
import Comments from "./comments"
import { useMediaQuery } from 'react-responsive'
import { useState } from 'react';

function VideoPanel() {
    const [activeTab, setActiveTab] = useState("info")
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const tabOptions = [
        { name: "Info", tab: "info" },
        { name: "Comments", tab: "comments" }
    ]
    const handleActiveTab = (tab: string) => {
        setActiveTab(tab)
    }
    return (
        <div>
            <VideoPlayer
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                title="Sample Video from an API"
                height={isTabletOrMobile ? "400px" : "570px"}
                poster="https://images.pexels.com/photos/31023570/pexels-photo-31023570/free-photo-of-romantic-dinner-with-st-peter-s-dome-in-view.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            />

            <div className={"flex flex-col py-2 md:max-w-lg"}>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-row items-center gap-2'>
                        <h1 className='text-white text-2xl'>SOL</h1>
                        <h1 className='text-white/50 urbanist'>Solana</h1>
                    </div>

                    <div className="flex flex-row items-center gap-3">
                        <div className="flex flex-row items-center gap-2">
                            <ThumbsUp className="w-7 h-7 text-white/50" />
                            <span className='text-white text-base'>3</span>
                        </div>

                        <div className="flex flex-row items-center gap-2">
                            <PiThumbsDownBold className="w-7 h-7 text-white/50" />
                            <span className='text-white text-base'>10</span>
                        </div>
                    </div>
                </div>

                <div className={"flex flex-col"}>
                    <div className='flex flex-row items-center gap-3 w-full my-3'>
                        {tabOptions.map((tab) => (
                            <div onClick={() => handleActiveTab(tab.tab)} className={`
                                ${activeTab === tab.tab ? "bg-[#A94AF2]/60 border-gray-500" : "border-gray-700"}
                            flex flex-row items-center justify-between  cursor-pointer gap-2 border flex-1 p-2 rounded-md
                            `}>
                                <span className='text-white urbanist'>{tab.name}</span>
                                <ChevronDown color='white' size={25} />
                            </div>
                        ))}
                    </div>
                    {activeTab === "info" && <TokenInfo
                        owner='Devtoken_001'
                        description='Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nulla Facilisi. Sed Euismod, Nunc At Feugiat
                        Feugiat, Metus Nisl Luctus Est, A Dictum Orci Turpis Ut Urna. Ut Non Lectus At Odio Scelerisque Fringilla.'
                    />}
                    {activeTab === "comments" && <Comments />}

                </div>
            </div>
        </div>
    )
}

export default VideoPanel
