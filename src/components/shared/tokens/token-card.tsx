import Image from "next/image"
import { ThumbsUp, ThumbsDown, Globe, Send } from "lucide-react"
import { FaDiscord, FaInstagram, FaXTwitter } from "react-icons/fa6"
import { Card } from "@/components/ui/card"
import { TokenCardProps } from "@/types/token-card"
import Link from "next/link"
import { LuUserRoundCheck } from "react-icons/lu";

export function TokenCard({
    name,
    id,
    subtext,
    marketCap,
    followers,
    likes,
    dislikes,
    timeFrame,
    amount,
    imageUrl,
    socialLinks,
}: TokenCardProps) {
    return (
        <Link href={`/landing/tokens/${id}`} className="flex flex-col w-full">
            <Card className="min-w-full max-w-full w-full mt-2 xl:max-w-md bg-[#1A1A1A] border-none text-white p-1.5 rounded-2xl relative z-10">
                <div className={"border border-gray-400 rounded-xl flex flex-row justify-between p-2 "}>
                    <div className="flex items-start justify-between ">
                        <div className="flex gap-3 flex-row items-center">
                            {/* Profile Image */}
                            <div className="relative w-14 h-full">
                                <Image
                                    src={imageUrl}
                                    alt={name}
                                    width={48}
                                    height={48}
                                    fetchPriority="high"
                                    className="rounded-md object-cover h-full w-full"
                                />
                            </div>

                            {/* Name and Stats */}
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold urbanist">{name}</span>
                                    <span className="text-gray-400 font-light">{subtext}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <p className="text-[#F5F5F5]/50">MC</p>
                                    <span className={"text-amber-300"}>{marketCap}</span>
                                    <span className="text-gray-500">
                                        <LuUserRoundCheck />
                                    </span>
                                    <span>{followers}</span>
                                </div>

                                {/* Social Icons */}
                                <div className="flex gap-2 mt-2">
                                    {socialLinks.instagram && (
                                        <Link href={socialLinks.instagram} className="text-gray-400 hover:text-gray-200 transition-colors">
                                            <FaInstagram className="w-4 h-4" />
                                        </Link>
                                    )}
                                    {socialLinks.website && (
                                        <Link href={socialLinks.website} className="text-gray-400 hover:text-gray-200 transition-colors">
                                            <Globe className="w-4 h-4" />
                                        </Link>
                                    )}
                                    {socialLinks.discord && (
                                        <Link href={socialLinks.discord} className="text-gray-400 hover:text-gray-200 transition-colors">
                                            <FaDiscord className="w-4 h-4" />
                                        </Link>
                                    )}
                                    {socialLinks.telegram && (
                                        <Link href={socialLinks.telegram} className="text-gray-400 hover:text-gray-200 transition-colors">
                                            <Send className="w-4 h-4" />
                                        </Link>
                                    )}
                                    {socialLinks.twitter && (
                                        <Link href={socialLinks.twitter} className="text-gray-400 hover:text-gray-200 transition-colors">
                                            <FaXTwitter className="w-4 h-4" />
                                        </Link>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="flex-1 min-h-full max-w-[1px] bg-gray-500" />

                    {/* Bottom Stats */}
                    <div className="flex items-center flex-col gap-2 text-sm text-gray-300">
                        {/* Amount */}
                        <div className="flex items-center gap-1 bg-[#161622] px-4 py-1 rounded-sm border border-[#F5F5F5]/50">
                            <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                            <span className="text-sm">{amount}</span>
                        </div>

                        <div className="flex flex-row items-center gap-3">
                            <div className="flex flex-row items-center gap-1">
                                <ThumbsUp className="w-4 h-5" />
                                <span>{likes}</span>
                            </div>

                            <div className="flex flex-row items-center gap-1">
                                <ThumbsDown className="w-4 h-5" />
                                <span>{dislikes}</span>
                            </div>
                        </div>

                        <span className="text-gray-500">{timeFrame}</span>
                    </div>
                </div>
            </Card>
        </Link>

    )
}

