"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown, Loader2 } from 'lucide-react'
import { SiSolana } from "react-icons/si"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface TradingControlsProps {
    balance?: number;
    currentPrice?: number;
    onExecuteTrade?: (data: TradeData) => Promise<boolean>;
    isLoading?: boolean;
}

export interface TradeData {
    type: "buy" | "sell";
    orderType: "market" | "limit";
    amount: number;
    limitPrice?: number;
}

export default function TradingControls({
    balance = 0,
    currentPrice = 0,
    onExecuteTrade,
    isLoading = false
}: TradingControlsProps) {
    // State management
    const [type, setType] = useState<"buy" | "sell">("buy")
    const [orderType, setOrderType] = useState<"market" | "limit">("market");
    const [amount, setAmount] = useState("")
    const [limitPrice, setLimitPrice] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Reset limit price when order type changes
    useEffect(() => {
        if (orderType === "market") {
            setLimitPrice("")
        } else if (orderType === "limit" && !limitPrice) {
            setLimitPrice(currentPrice.toString())
        }
    }, [orderType, limitPrice, currentPrice])

    // Calculate max amount user can trade based on balance
    const maxAmount = type === "buy"
        ? balance / (orderType === "market" ? currentPrice : parseFloat(limitPrice) || currentPrice)
        : balance

    // Handle amount input change
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        // Only allow numbers and decimals
        if (/^(\d*\.?\d*)$/.test(value) || value === "") {
            setAmount(value)
            setError(null)
        }
    }

    // Handle limit price input change
    const handleLimitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (/^(\d*\.?\d*)$/.test(value) || value === "") {
            setLimitPrice(value)
            setError(null)
        }
    }

    // Handle quick amount selection
    const handleQuickAmount = (percentage: number) => {
        const calculatedAmount = (maxAmount * percentage).toFixed(2)
        setAmount(calculatedAmount)
        setError(null)
    }

    // Handle trade execution
    const handleExecuteTrade = async () => {
        // Validate inputs
        if (!amount || parseFloat(amount) <= 0) {
            setError("Please enter a valid amount")
            return
        }

        if (orderType === "limit" && (!limitPrice || parseFloat(limitPrice) <= 0)) {
            setError("Please enter a valid limit price")
            return
        }

        if (parseFloat(amount) > maxAmount) {
            setError(`Insufficient balance. Maximum ${type === "buy" ? "buy" : "sell"} amount is ${maxAmount.toFixed(2)} SOL`)
            return
        }

        // Prepare trade data
        const tradeData: TradeData = {
            type,
            orderType,
            amount: parseFloat(amount),
            ...(orderType === "limit" && { limitPrice: parseFloat(limitPrice) })
        }

        // Execute trade if callback is provided
        if (onExecuteTrade) {
            try {
                setIsSubmitting(true)
                const success = await onExecuteTrade(tradeData)

                if (success) {
                    // toast.success({
                    //     title: "Trade executed successfully",
                    //     description: `${type === "buy" ? "Bought" : "Sold"} ${amount} SOL at ${orderType === "market" ? "market price" : `limit price $${limitPrice}`
                    //         }`,
                    // })
                    // // Reset form after successful trade
                    setAmount("")
                    if (orderType === "limit") {
                        setLimitPrice("")
                    }
                } else {
                    setError("Trade execution failed. Please try again.")
                }
            } catch (err) {
                setError("An error occurred while executing the trade")
                console.error(err)
            } finally {
                setIsSubmitting(false)
            }
        } else {
            // // Demo mode - just show a toast
            // toast({
            //     title: "Trade submitted (demo)",
            //     description: `${type === "buy" ? "Buy" : "Sell"} ${amount} SOL at ${orderType === "market" ? "market price" : `limit price $${limitPrice}`
            //         }`,
            // })
            setAmount("")
            if (orderType === "limit") {
                setLimitPrice("")
            }
        }
    }

    return (
        <div className="flex flex-col w-full lg:max-w-sm relative z-10 sm:p-4">
            {/* Trade type tabs */}
            <Tabs
                defaultValue="buy"
                value={type}
                onValueChange={(value) => setType(value as "buy" | "sell")}
                className="w-full"
            >
                <TabsList className="grid grid-cols-2 w-full bg-zinc-800/50 h-auto py-2">
                    <TabsTrigger
                        value="buy"
                        className={cn(
                            "data-[state=active]:text-white text-white py-2",
                            type === "buy" && "data-[state=active]:bg-[#00BC45]/50 border border-[#00BC45] data-[state=active]:shadow-none"
                        )}
                    >
                        Buy
                    </TabsTrigger>
                    <TabsTrigger
                        value="sell"
                        className={cn(
                            "data-[state=active]:text-white text-white py-2",
                            type === "sell" && "data-[state=active]:bg-rose-600 data-[state=active]:shadow-none"
                        )}
                    >
                        Sell
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Order type selection */}
            <div className="mt-4 mb-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full justify-between border-white/20 bg-zinc-800/50 text-white"
                        >
                            {orderType === "market" ? "Market Order" : "Limit Order"}
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full min-w-[240px] bg-zinc-900 border-white/10">
                        <DropdownMenuItem
                            onClick={() => setOrderType("market")}
                            className={cn("cursor-pointer text-white", orderType === "market" && "bg-zinc-800")}
                        >
                            Market Order
                            {orderType === "market" && <Check className="ml-auto h-4 w-4" />}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setOrderType("limit")}
                            className={cn("cursor-pointer text-white", orderType === "limit" && "bg-zinc-800")}
                        >
                            Limit Order
                            {orderType === "limit" && <Check className="ml-auto h-4 w-4" />}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Current price display */}
            <div className="flex justify-between text-sm text-zinc-400 mb-1 px-1">
                <span>Current Price</span>
                <span className="font-medium text-white">${currentPrice.toFixed(2)}</span>
            </div>

            {/* Amount input */}
            <div className="space-y-3">
                <div className="relative">
                    <Input
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        className="pl-3 pr-16 py-6 bg-zinc-800/50 border-white/20 rounded-lg text-white placeholder:text-zinc-500"
                        placeholder="Enter amount"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center">
                        <div className="flex items-center gap-1.5 text-white">
                            <SiSolana className="h-4 w-4" />
                            <span>SOL</span>
                        </div>
                    </div>
                </div>

                {/* Limit price input (only shown for limit orders) */}
                {orderType === "limit" && (
                    <div className="relative">
                        <Input
                            type="text"
                            value={limitPrice}
                            onChange={handleLimitPriceChange}
                            className="pl-3 pr-16 py-6 bg-zinc-800/50 border-white/20 rounded-lg text-white placeholder:text-zinc-500"
                            placeholder="Limit price"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center">
                            <span className="text-white">USD</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Quick amount buttons */}
            <div className="flex justify-between mt-3 mb-4">
                {[0.25, 0.5, 0.75, 1].map((value) => (
                    <Button
                        key={value}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickAmount(value)}
                        className="border-white/20 bg-zinc-800/50 rounded-full hover:bg-zinc-700/50 text-white"
                    >
                        {value * 100}%
                    </Button>
                ))}
            </div>

            {/* Balance display */}
            <div className="flex justify-between text-sm text-zinc-400 mb-3 px-1">
                <span>Available Balance</span>
                <div className="flex items-center gap-1.5 text-white">
                    <span>{balance.toFixed(4)}</span>
                    <SiSolana className="h-3.5 w-3.5" />
                </div>
            </div>

            {/* Error message */}
            {error && (
                <div className="text-rose-500 text-sm mb-3 px-1">
                    {error}
                </div>
            )}

            {/* Execute trade button */}
            <Button
                onClick={handleExecuteTrade}
                disabled={isSubmitting || isLoading || !amount}
                className={cn(
                    "py-6 font-medium text-white",
                    type === "buy"
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-rose-600 hover:bg-rose-700"
                )}
            >
                {isSubmitting || isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {type === "buy" ? "Buy" : "Sell"} SOL
                {orderType === "limit" ? " (Limit)" : ""}
            </Button>
        </div>
    )
}
