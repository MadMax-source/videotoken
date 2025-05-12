"use client"

import Tokens from "@/components/shared/tokens";
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"

export default function TokensList() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab")
 const router = useRouter()
  
  useEffect(() => {
    // If no "tab" param exists, set it to "new"
    if (!activeTab) {
      router.replace("?tab=new", { scroll: false });
    }
  }, [activeTab, router]);


  return (
    <Suspense>
        <section className={"hidden xl:flex"}>
          <div className="mx-auto grid grid-cols-1 w-full xl:grid-cols-2 2xl:grid-cols-3 gap-4 xl:gap-14 px-3">
            <Tokens category="New" />
            <Tokens category="Trending" />
            <Tokens category="Titan of tokens" />
          </div>
        </section>


        <section className={"xl:hidden"}>
          <div className="mx-auto grid grid-cols-1 max-w-full w-full xl:grid-cols-3 gap-4 xl:gap-8 sm:px-4 md:px-6 xl:px-8">
            {activeTab === "new" && <Tokens category="New" />}
            {activeTab === "trending" && <Tokens category="Trending" />}
            {activeTab === "about-to-launch" && <Tokens category="Titan of tokens" />}
          </div>
        </section>
    </Suspense>
  );
}
