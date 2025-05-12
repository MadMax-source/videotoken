"use client"

import * as React from "react"
import glow_left from "@public/images/glow_left.png"
import {
    Sidebar,
    SidebarContent,
    SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import Image from "next/image"
import ModeSwitcher from "../mode-switcher"
import { FiPlus } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { IoDiamondOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { PiNewspaper } from "react-icons/pi";
import { PiRanking } from "react-icons/pi";
import { PiBookmarksDuotone } from "react-icons/pi";


const data = {

    nav_1: [
        {
            title: "Create Tokens",
            url: "/dev/create-token",
            icon: <FiPlus />
        },
        {
            title: "My Tokens",
            url: "/landing/tokens",
            icon: <PiBookmarksDuotone />
        },

    ],

    nav_2: [
        {
            title: "Dev Level",
            url: "/dev/dev-level",
            icon: <BsStars />
        },
        {
            title: "Leaderboard",
            url: "/dev/leaderboard",
            icon: <PiRanking />
        },
    ],
    nav_3: [
        {
            title: "Premium",
            url: "/landing/premium",
            icon: <IoDiamondOutline />
        },
        {
            title: "Events",
            url: "/landing/premium",
            icon: <IoCalendarOutline />
        },
    ],
    nav_4: [
        {
            title: "News",
            url: "/landing/news",
            icon: <PiNewspaper />
        },
        {
            title: "Help / Support",
            url: "/landing/support",
            icon: <IoMdHelpCircleOutline />
        },
    ],

}


export function DevSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props} className="!bg-[#0A0A0A]">
            <SidebarContent className="!bg-[#0A0A0A] relative z-10 p-0">
                <ModeSwitcher />
                <NavMain items={data.nav_1} />
                <NavMain items={data.nav_2} />
                <NavMain items={data.nav_3} />
                <NavMain items={data.nav_4} />
            </SidebarContent>
            <SidebarRail />
            <div className="fixed inset-0 pointer-events-none">
                <Image
                    src={glow_left}
                    fill
                    fetchPriority="high"
                    alt="glow_right"
                    className="h-full w-full object-contain object-left-top"
                    priority
                />
            </div>
        </Sidebar>
    )
}
