"use client";
import { FC, ReactNode, useMemo } from "react";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  CloverWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";

export const WalletContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const network = clusterApiUrl("devnet"); // => 'mainnet-beta', 'testnet'

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter({
        network: "devnet",
        appUrl: "https://videotoken-seven.vercel.app/dev/create-token",
      }),
      new SolflareWalletAdapter(),
      new CloverWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={network}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
