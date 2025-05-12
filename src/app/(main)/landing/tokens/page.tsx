import TokensList from "@/components/shared/tokens/token-main";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense>
            <TokensList />
        </Suspense>
    )
}
