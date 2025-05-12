"use client";
import { useState } from "react";

import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import {
  createInitializeMintInstruction,
  getAssociatedTokenAddress,
  createMintToInstruction,
  TOKEN_2022_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Checkbox } from "@/components/ui/checkbox";
import { UploadPhoto, UploadVideo } from "./uploads";

function CreateToken() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [name, setName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [decimals, setDecimals] = useState<number | "">("");
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState<boolean>(false);
  const [mintAddress, setMintAddress] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    amount: "",
    decimals: "",
    description: "",
    mutate_meta_data: false,
    socials: {
      twitter: "",
      facebook: "",
      instagram: "",
      other_socials: "",
    },
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: { target: { checked: any } }) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      mutate_meta_data: checked,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle the form submission logic
    console.log("Form Submitted", formData);
  };

  const handleCreateToken = async () => {
    if (!wallet.publicKey) {
      alert("Wallet not connected");
      return;
    }

    if (!name || !symbol || !decimals || !amount) {
      alert("Please provide name, symbol, decimals, and amount.");
      return;
    }

    try {
      setLoading(true);

      // 1. Create a mint keypair (new token)
      const mintKeypair = Keypair.generate();

      // 2. Create associated token account for the wallet
      const associatedToken = await getAssociatedTokenAddress(
        mintKeypair.publicKey,
        wallet.publicKey,
        false,
        TOKEN_2022_PROGRAM_ID
      );

      // 3. Calculate rent-exempt balance for mint account
      const space = 82;
      const lamports = await connection.getMinimumBalanceForRentExemption(
        space
      );

      // 4. Build the transaction
      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space,
          lamports,
          programId: TOKEN_2022_PROGRAM_ID,
        }),
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          Number(decimals),
          wallet.publicKey,
          null,
          TOKEN_2022_PROGRAM_ID
        ),
        createAssociatedTokenAccountInstruction(
          wallet.publicKey, // payer
          associatedToken, // associated token address
          wallet.publicKey, // token account owner
          mintKeypair.publicKey, // token mint
          TOKEN_2022_PROGRAM_ID
        ),

        createMintToInstruction(
          mintKeypair.publicKey,
          associatedToken,
          wallet.publicKey,
          Number(amount) * Math.pow(10, Number(decimals)),
          [],
          TOKEN_2022_PROGRAM_ID
        )
      );

      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;
      transaction.partialSign(mintKeypair);

      const signature = await wallet.sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature);

      const mintAddressBase58 = mintKeypair.publicKey.toBase58();
      console.log("Mint Address:", mintAddressBase58);
      setMintAddress(mintAddressBase58);
    } catch (error) {
      console.error("Error creating token:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full 2xl:max-w-[80%] mx-auto h-full pb-10">
      <h1 className="text-3xl font-semibold text-white">Create Videotoken</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 flex flex-col w-full relative z-10"
      >
        <div className="flex flex-col sm:flex-col lg:flex-row items-center w-full mt-5 gap-5">
          <div className="w-full">
            <label className="text-white">Token Name</label>
            <input
              name="token_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Token"
              className="focus:border-[#FFEA00] text-white ring-0 outline-0 placeholder:text-white/50 border-white/25 w-full"
            />
          </div>

          <div className="w-full">
            <input
              type="text"
              name="token_symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="NIN"
              className="focus:border-[#FFEA00] text-white placeholder:text-white/50 border-white/25 w-full"
            />
          </div>
        </div>

        <div>
          <label className="text-white urbanist pb-2">Video Token</label>
          <UploadVideo onUpload={(video) => console.log(video)} />
        </div>

        <div className="flex flex-col sm:flex-col lg:flex-row items-center w-full gap-5">
          <div className="w-full">
            <label className="text-white">Initial Supply</label>
            <input
              type="number"
              name="initial_supply"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="1,000,000"
              className="focus:border-[#FFEA00] text-white placeholder:text-white/50 border-white/25 w-full"
            />
          </div>

          <div className="w-full">
            <label className="text-white">Decimals</label>
            <input
              type="number"
              value={decimals}
              onChange={(e) => setDecimals(Number(e.target.value))}
              placeholder="9"
              className="focus:border-[#FFEA00] text-white placeholder:text-white/50 border-white/25 w-full"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-col lg:flex-row items-center w-full  gap-5">
          <div className="w-full">
            <label className="text-white">Description</label>
            <input
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter a Description of your videotoken"
              className="focus:border-[#FFEA00] text-white min-h-36 resize-none placeholder:text-white/50 border-white/25 w-full"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="mutate_meta_data"
              checked={formData.mutate_meta_data}
              className="text-white"
            />
            <label
              htmlFor="mutate_meta_data"
              className="text-sm font-light urbanist text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Make metadata immutable
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-5">
          {Object.keys(formData.socials).map((social) => (
            <div className="w-full" key={social}>
              <label className="text-white">
                {social.charAt(0).toUpperCase() + social.slice(1)}
              </label>
              <input
                type="url"
                name={`socials.${social}`}
                onChange={handleInputChange}
                placeholder={`Enter ${social} link`}
                className="focus:border-[#FFEA00] text-white placeholder:text-sm placeholder:text-white/50 border-white/25 w-full"
              />
            </div>
          ))}
          <div className="w-full">
            <label className="text-white">Other Socials</label>
            <input
              type="url"
              name="other_socials"
              value={formData.socials.other_socials}
              onChange={handleInputChange}
              placeholder="Enter the link here"
              className="focus:border-[#FFEA00] text-white placeholder:text-white/50 border-white/25 w-full"
            />
          </div>
        </div>

        <div>
          <UploadPhoto onUpload={(photo) => console.log(photo)} />
        </div>

        <button
          onClick={handleCreateToken}
          className="w-full py-3 bg-amber-400 hover:bg-amber-600 cursor-pointer"
        >
          {loading ? "Creating..." : "Create Token"}
          Create Token
        </button>
        {mintAddress && (
          <div className="mt-4">
            <p className="text-white">Token created successfully!</p>
            <a
              href={`https://explorer.solana.com/address/${mintAddress}?cluster=mainnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              View on Solana Explorer
            </a>
          </div>
        )}
      </form>
    </div>
  );
}

export default CreateToken;
