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
import { TfiLayoutGrid2 } from "react-icons/tfi";
import { IoDiamondOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { PiNewspaper } from "react-icons/pi";
import { GoTag } from "react-icons/go";
import { HiOutlineSwatch } from "react-icons/hi2";
import { HiOutlineWallet } from "react-icons/hi2";
import { PiClockCountdown } from "react-icons/pi";
import { PiShoppingBagOpenDuotone } from "react-icons/pi";

const data = {

    nav_1: [
        {
            title: "Tokens",
            url: "/landing/tokens",
            icon: <TfiLayoutGrid2 />
        },
        {
            title: "About To launch",
            url: "/landing/to-launch",
            icon: <PiClockCountdown />
        },
        {
            title: "Promotoken",
            url: "/landing/promo-token",
            icon: <GoTag />
        },
        {
            title: "Watchlist",
            url: "/landing/watchlist",
            icon: <HiOutlineSwatch />
        },
        {
            title: "Portfolio",
            url: "/landing/port-folio",
            icon: <PiShoppingBagOpenDuotone />
        },
        {
            title: "Wallet",
            url: "/landing/wallet",
            icon: <HiOutlineWallet />
        },
    ],

    nav_2: [
        {
            title: "Events",
            url: "/landing/events",
            icon: <IoCalendarOutline />,
        },
        {
            title: "Premium",
            url: "/landing/premium",
            icon: <IoDiamondOutline />
        },
    ],
    nav_3: [
        {
            title: "News",
            url: "/landing/news",
            icon: <PiNewspaper />
        },
        {
            title: "Support",
            url: "/landing/support",
            icon: <IoMdHelpCircleOutline />
        },
    ],

}


export function TradingNavbar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props} className="!bg-[#0A0A0A]">
            <SidebarContent className="!bg-[#0A0A0A] relative z-10 p-0">
                <ModeSwitcher />
                <NavMain items={data.nav_1} />
                <NavMain items={data.nav_2} />
                <NavMain items={data.nav_3} />
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
