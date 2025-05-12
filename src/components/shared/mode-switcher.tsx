import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const modeSwitcher = [
    { name: "Trading", path: "/landing/tokens" },
    { name: "Dev", path: "/dev/create-token" }
];

function ModeSwitcher() {
    const pathname = usePathname();

    const modes = [
        { name: "Dev Mode", path: "/dev/create-token" },
        { name: "Trading Mode", path: "/landing/tokens" }
    ]
    return (
        <div className="flex flex-row  justify-center gap-2 pt-6 mt-5 group-data-[collapsible=icon]:flex-col ">
            {modeSwitcher.map((switchItem) => {
                const isLanding = pathname.startsWith('/landing');
                const isDev = pathname.startsWith('/dev');

                let borderColor = "border-gray-400"; // Default no border
                let bgColor = "white"
                let textColor = "text-black"

                if (switchItem.path.startsWith('/landing') && isLanding) {
                    borderColor = "border-[#7619BC]";
                    bgColor = "bg-[#7619BC]";
                    textColor = "text-[#7619BC]"
                } else if (switchItem.path.startsWith('/dev') && isDev) {
                    borderColor = "border-[#FFEA00]";
                    bgColor = "bg-[#FFEA00]";
                    textColor = "text-[#FFEA00]"
                }

                return (
                    <div className="">
                        {/* Dropdown only visible when sidebar is collapsed */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                    <div className={`h-5 w-5 rounded-full ${bgColor} group-data-[collapsible=icon]:flex hidden  cursor-pointer`} />
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="bg-white ">
                                {modes.map((mode) => (
                                    <Link href={mode.path} key={mode.path}>
                                        <DropdownMenuItem>
                                            <span className={`capitalize ${textColor}`}>{mode.name}</span>
                                        </DropdownMenuItem>
                                    </Link>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Button only visible when sidebar is expanded */}
                        <Link
                            href={switchItem.path}
                            key={switchItem.path}
                            className="w-full group-data-[collapsible=icon]:hidden"
                        >
                            <Button
                                className={`rounded w-20 urbanist group-data-[collapsible=icon]:hidden cursor-pointer border font-light text-sm text-center text-white ${borderColor}`}
                            >
                                {switchItem.name}
                            </Button>
                        </Link>
                    </div>

                );
            })}
        </div>
    );
}

export default ModeSwitcher;
