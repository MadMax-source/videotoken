import { Globe, DiscIcon as Discord, Send } from "lucide-react"
import { FaInstagram } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";

interface InfoProps {
    owner: string;
    description: string
}
export default function TokenInfo({ owner, description }: InfoProps) {
    return (
        <div className="p-4 bg-[#F5F5F5]/10 border border-gray-600 rounded-lg mt-4 w-full">
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-400">Socials:</h3>
                    <div className="flex space-x-2">
                        <a href="#" className="text-gray-400 hover:text-white">
                            <FaInstagram size={18} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <Globe size={18} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <Discord size={18} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <Send size={18} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <RiTwitterXFill size={18} />
                        </a>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-400">Owner:</h3>
                    <span className="text-white">{owner}</span>
                </div>

                <div className="mb-2">
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Description:</h3>
                    <p className="text-sm text-gray-300">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}

