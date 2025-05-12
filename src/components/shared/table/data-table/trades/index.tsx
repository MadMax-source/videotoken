import ReusableTable from "@components/shared/table"
import { PiClockCounterClockwise } from "react-icons/pi";

const headers = ["Side", "Time ago", "Type", "Size", "Price in $USD", "Total in SOL", "Trader"];

const trades = [
    { side: "Buy", timeAgo: <PiClockCounterClockwise /> + " 5m", type: "Limit", size: "1.2", priceUSD: "$50,000", totalSOL: "0.8", trader: "Alice" },
    { side: "Sell", timeAgo: <PiClockCounterClockwise /> + " 10m", type: "Market", size: "0.5", priceUSD: "$48,000", totalSOL: "0.4", trader: "Bob" }
];

export default function TradesTable() {
    return (
        <ReusableTable headers={headers} data={trades} />
    )
}
