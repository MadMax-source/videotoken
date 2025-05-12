import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { tokenData } from '@/constants/data/tokens'
import filter_icon from "@public/icons/filter_icon.svg"
import Image from 'next/image'
import { Fragment } from 'react'
import { TokenCard } from './token-card'
import { ExpandIcon } from "lucide-react"
import SortTokens from "./sort-tokens"
import { AiOutlineExpand } from "react-icons/ai";

type TokenProps = {
    category: string;
}

function Tokens({ category }: TokenProps) {
    return (
        <div className="flex flex-col w-full sm:max-w-xl pt-9 h-screen mx-auto relative z-10">
            <div className="flex flex-row items-center justify-between pb-3">
                <SortTokens />
                <h1 className="text-white font font-normal urbanist">{category}</h1>
                <div className="flex flex-row items-center gap-2">
                    <AiOutlineExpand size={20} color="white" /> <span className="text-xs text-white font-light">Fullscreen</span>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger className="hidden lg:flex flex-row items-center gap-2 border rounded-md px-1 border-gray-200  bg-[#A94AF2]/30">
                        <Fragment>
                            <Image
                                src={filter_icon}
                                fetchPriority="high"
                                alt="filter icon"
                                className="h-4 w-4"
                            />
                            <span className="text-sm font-light text-white">Filters</span>
                        </Fragment>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#462C5A] text-white">
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Scrollable Token List */}
            <ScrollArea className="whitespace-nowrap flex-1 max-h-[calc(100vh-100px)] w-full flex flex-col">
                {tokenData.map((token) => (
                    <TokenCard key={token.amount} {...token} />
                ))}
                {/* <ScrollBar className="bg-slate-500" orientation="vertical" /> */}
            </ScrollArea>
        </div>

    )
}

export default Tokens
