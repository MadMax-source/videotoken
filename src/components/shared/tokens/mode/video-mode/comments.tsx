import { Input } from "@components/ui/input"
import { User } from "lucide-react"
import { Button } from "@components/ui/button"

export default function Comments() {


    return (
        <section className="p-4 bg-[#F5F5F5]/10 border border-gray-600 rounded-lg mt-4 w-full">
            <div className={"flex flex-col gap-3"}>
                <h1 className={"text-[#FF0000] font-semibold"}>Devtoken_001</h1>
                <blockquote className={"text-white ml-10"}>
                    This coin is the best I have bought so far
                </blockquote>
            </div>

            <div className={"mt-5"}>
                <div className={"relative"}>
                    <Input
                        placeholder={"Comment..."}
                        className={"flex w-full rounded-full border-[#F5F5F5]/10 p-3 h-12 pl-14 placeholder:text-white ring-0 outline-0 "} />
                    <Button size={"icon"} className="bg-[#FFFFFF]/10 h-10 w-10 text-white rounded-full absolute top-1 left-2">
                        <User size={60} className="h-9 w-9" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
