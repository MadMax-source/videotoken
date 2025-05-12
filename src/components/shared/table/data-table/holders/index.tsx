import ReusableTable from "@components/shared/table"
import { PiClockCounterClockwise } from "react-icons/pi";

const headers = ["Side", "Time ago", "Type", "Size", "Price in $USD", "Total in SOL", "Trader"];

const holders = [

    { side: "Buy", timeAgo: <div className={"flex items-center gap-2"}> <PiClockCounterClockwise /> 30m </div>, type: "Market", size: "1.5", priceUSD: "$47,500", totalSOL: "1.2", trader: "Dave" },
    { side: "Sell", timeAgo: <div className={"flex items-center gap-2"}> <PiClockCounterClockwise /> 15m </div>, type: "Limit", size: "0.8", priceUSD: "$49,000", totalSOL: "0.6", trader: "Charlie" },
    { side: "Buy", timeAgo: <div className={"flex items-center gap-2"}> <PiClockCounterClockwise /> 30m </div>, type: "Market", size: "1.5", priceUSD: "$47,500", totalSOL: "1.2", trader: "Dave" }
];

export default function HoldersTable() {
    return (
        <ReusableTable headers={headers} data={holders} />
    )
}
