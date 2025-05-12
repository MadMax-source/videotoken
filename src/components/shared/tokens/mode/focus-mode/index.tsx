import React from 'react'
import VideoPanel from '@components/shared/tokens/mode/video-mode/video-panel'
import TradingControls from '@components/shared/tokens/mode/video-mode/trade-converta'
import TradingViewWidget from '@/components/shared/chart/trade-view'
import * as Tabs from "@radix-ui/react-tabs";
import { PiClockCounterClockwise } from "react-icons/pi";
import { SiSolana } from "react-icons/si";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from 'next/link';
import { useSearchParams } from "next/navigation";
import OrdersTable from "@components/shared/table/data-table/orders"
import TradesTable from "@components/shared/table/data-table/trades"
import HoldersTable from "@components/shared/table/data-table/holders"
import PositionsTable from "@components/shared/table/data-table/positions"
import HistoryTable from "@components/shared/table/data-table/history"
import TopTradersTable from "@components/shared/table/data-table/top-traders"
import VideoSection from './video-section';


interface FocusModeProps {
  mode: string | null
}

function FocusMode({ mode }: FocusModeProps) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "orders";

  const tabs = [
    { name: "Video", tab: "video" },
    { name: "Orders", tab: "orders" },
    { name: "Trades", tab: "trades" },
    { name: "Holders", tab: "holders" },
    { name: "Top Traders", tab: "top-traders" },
    { name: "Positions", tab: "positions" },
    { name: "History", tab: "history" },
  ]

  const trades = [
    {
      side: "Buy",
      timeAgo: "2m",
      type: "Limit",
      size: "0.5",
      priceUSD: "150.00",
      totalSOL: "0.008",
      trader: "Trader_01",
    },
    {
      side: "Sell",
      timeAgo: "5m",
      type: "Market",
      size: "1.2",
      priceUSD: "360.00",
      totalSOL: "0.019",
      trader: "Trader_02",
    },
    {
      side: "Buy",
      timeAgo: "10m",
      type: "Stop",
      size: "0.8",
      priceUSD: "250.00",
      totalSOL: "0.014",
      trader: "Trader_03",
    },
    {
      side: "Sell",
      timeAgo: "15m",
      type: "Limit",
      size: "1.5",
      priceUSD: "450.00",
      totalSOL: "0.025",
      trader: "Trader_04",
    },
    {
      side: "Buy",
      timeAgo: "20m",
      type: "Market",
      size: "0.7",
      priceUSD: "300.00",
      totalSOL: "0.011",
      trader: "Trader_05",
    },
    {
      side: "Sell",
      timeAgo: "25m",
      type: "Stop",
      size: "2.0",
      priceUSD: "600.00",
      totalSOL: "0.033",
      trader: "Trader_06",
    },
  ];

  return (
    <section className="min-w-full flex flex-col justify-between flex-1">

      <div className='flex flex-col min-w-full'>
        <div className='flex flex-col lg:flex-col xl:flex-row items-start min-w-full gap-5'>
          <TradingViewWidget />
          <TradingControls />
        </div>
      </div>

      <div className={"h-auto w-full text-white text-2xl urbanist flex flex-col items-center justify-center mt-10 "}>
        <div className="flex flex-row items-center  w-full border-b-[#787878]/50 border-b-4 relative overflow-x-auto pb-3 my-2">
          {tabs.map((tab) => (
            <Link key={tab.tab} scroll={false} href={`?mode=${mode}&tab=${tab.tab}`} className="relative">
              <button className={`text-sm ${activeTab === tab.tab && "text-blue-500"} cursor-pointer urbanist whitespace-nowrap px-10 py-2`}>{tab.name}</button>
            </Link>
          ))}
        </div>

        {activeTab === "video" && <VideoSection />}
        {activeTab === "orders" && <OrdersTable />}
        {activeTab === "trades" && <TradesTable />}
        {activeTab === "holders" && <HoldersTable />}
        {activeTab === "positions" && <PositionsTable />}
        {activeTab === "history" && <HistoryTable />}
        {activeTab === "top-traders" && <TopTradersTable />}

      </div>
    </section>
  )
}

export default FocusMode
