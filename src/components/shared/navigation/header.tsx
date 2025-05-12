"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Logo from "@public/icons/Logo.png";
import Image from "next/image";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import wallet_icon from "@public/icons/wallet.svg";
// import chat_icon from "@public/icons/chat.svg"
import Link from "next/link";
import { Search, SearchIcon, User } from "lucide-react";
import { useEffect, useState } from "react";
//connection to solana
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Connection } from "@solana/web3.js";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );
  // => https://api.mainnet-beta.solana.com (check link)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 w-full right-0 z-20 md:mt-10 flex py-4 min-h-16 shrink-0 items-center gap-2 transition-all duration-75 ease-linear 
            ${
              isScrolled
                ? "bg-[#0A0A0A] text-white shadow-md"
                : "bg-transparent"
            }`}
    >
      <div className="flex items-center justify-between w-full  px-1 md:px-4">
        <div className="flex items-center gap-2 px-3">
          <SidebarTrigger className="-ml-4 cursor-pointer" />
          <Separator orientation="vertical" className="mr-2 h-4" />

          <div className={"relative hidden xl:flex"}>
            <Input
              placeholder="Search"
              className={
                "min-w-2xs urbanist focus:border-[#FFEA00] active:ring-0 ring-0 outline-0 w-full py-5 placeholder:font-light bg-transparent px-3 placeholder:text-white border border-white/25"
              }
            />
            <span className="absolute top-2 right-2">
              <Search size={22} color="white" />
            </span>
          </div>
        </div>

        <div className="hidden lg:flex">
          <Image
            src={Logo}
            alt="Logo"
            fetchPriority="high"
            className="h-7 w-7"
          />
        </div>

        <div className="flex flex-row items-center gap-5">
          {/* search icon mobile */}
          <Button
            size={"icon"}
            className="bg-transparent border border-white/50 h-10 w-10 text-white rounded-full xl:hidden"
          >
            <SearchIcon size={30} />
          </Button>

          {/* connect wallet button */}
          <Link href={"/landing/wallet"}>
            <Button
              onClick={() => {}}
              className="flex items-center flex-row gap-2 cursor-pointer rounded-md px-3 md:px-4 bg-transparent border border-[#F5F5F5]/25 text-white"
            >
              <span className="hidden font-light xl:flex">
                Connect Your wallet{" "}
              </span>
              <Image
                src={wallet_icon}
                fetchPriority="high"
                alt={"wallet icon"}
                className="h-5 w-5 object-contain"
              />
            </Button>
          </Link>

          {/* profile button */}
          <Button
            size={"icon"}
            className="bg-transparent border border-[#F5F5F5]/25 h-10 w-10 text-white rounded-full"
          >
            <User size={60} className="h-9 w-9" />
          </Button>
          <WalletMultiButton />
        </div>
      </div>
    </header>
  );
}
