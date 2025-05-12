"use client"

import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
    const container = useRef<HTMLDivElement | null>(null);

    useEffect(
        () => {
            if (!container.current) return;
            if (container.current.querySelector("script")) return;

            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
        {
          "autosize": true,
          "symbol": "NASDAQ:AAPL",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "hide_side_toolbar": false,
          "backgroundColor": "#101828",
          "allow_symbol_change": true,
          "support_host": "https://www.tradingview.com"
        }`;
            container.current.appendChild(script);
        },
        []
    );

    return (
        <div className="h-[439px] max-w-[842px] xl:max-w-full w-full" ref={container} />
    );
}

export default memo(TradingViewWidget);
