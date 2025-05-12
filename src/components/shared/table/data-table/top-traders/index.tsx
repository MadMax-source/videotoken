import ReusableTable from "@components/shared/table";
import { PiClockCounterClockwise } from "react-icons/pi";

const headers = ["Side", "Time ago", "Type", "Size", "Price in $USD", "Total in SOL", "Trader", "Date"];

const top_traders = [
    {
        side: "Sell",
        timeAgo: <div className={"flex items-center gap-2"}> <PiClockCounterClockwise /> 15m </div>,
        type: "Limit",
        size: "0.8",
        priceUSD: "$49,000",
        totalSOL: "0.6",
        trader: "Charlie",
        date: "2025-04-03"
    },
    {
        side: "Buy",
        timeAgo: <div className={"flex items-center gap-2"}> <PiClockCounterClockwise /> 30m </div>,
        type: "Market",
        size: "1.5",
        priceUSD: "$47,500",
        totalSOL: "1.2",
        trader: "Dave",
        date: "2025-04-03"
    },
    {
        side: "Sell",
        timeAgo: <div className={"flex items-center gap-2"}> <PiClockCounterClockwise /> 1h </div>,
        type: "Limit",
        size: "2.0",
        priceUSD: "$46,000",
        totalSOL: "1.8",
        trader: "Eve",
        date: "2025-04-02"
    },
    {
        side: "Buy",
        timeAgo: <div className={"flex items-center gap-2"}> <PiClockCounterClockwise /> 2h </div>,
        type: "Market",
        size: "1.0",
        priceUSD: "$45,500",
        totalSOL: "0.9",
        trader: "Frank",
        date: "2025-04-02"
    }
];

export default function TopTradersTable() {
    return (
        <ReusableTable headers={headers} data={top_traders} />
    )
}
