"use client";

import React from "react";
import { walletClient } from "@/lib/viem-client";
import { Input } from "@/components/ui/input";

import {
  arbitrum,
  arbitrumGoerli,
  aurora,
  auroraTestnet,
  avalanche,
  avalancheFuji,
  base,
  baseGoerli,
  boba,
  bronos,
  bronosTestnet,
  bsc,
  bscTestnet,
  canto,
  celo,
  celoAlfajores,
  celoCannoli,
  cronos,
  crossbell,
  dfk,
  dogechain,
  evmos,
  evmosTestnet,
  fantom,
  fantomTestnet,
  filecoin,
  filecoinCalibration,
  filecoinHyperspace,
  flare,
  flareTestnet,
  foundry,
  iotex,
  iotexTestnet,
  goerli,
  gnosis,
  gnosisChiado,
  haqqMainnet,
  haqqTestedge2,
  hardhat,
  harmonyOne,
  klaytn,
  lineaTestnet,
  localhost,
  mainnet,
  metis,
  metisGoerli,
  mev,
  mevTestnet,
  moonbaseAlpha,
  moonbeam,
} from "viem/chains";
import * as chains from "viem/chains";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import MainNav from "@/components/shared/main-nav";
import Link from "next/link";

export default function Home() {
  const { toast } = useToast();

  const chainNames = Object.keys(chains);

  const [, setSelectedChain] = React.useState("");

  const [query, setQuery] = React.useState("");

  const filteredChains =
    query === ""
      ? chainNames
      : chainNames.filter((chainName) => {
          return chainName.toLowerCase().includes(query.toLowerCase());
        });

  async function connectChain(chainName: string) {
    if (!chainName) return;

    // @ts-ignore
    const chainObject = chains[chainName];

    if (!chainObject) {
      console.error(`No chain found with the name '${chainName}'`);
      return;
    }

    await walletClient
      .addChain({ chain: chainObject })
      .then(() => {
        toast({
          title: "Added and connected to chain",
          description: "Chain added successfully",
        });
      })
      .catch((error: Error) => {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Error adding chain",
          description: error.message,
        });
      });
  }

  return (
    <div>
      <MainNav />
      <div className="p-12">
        <Input
          type="search"
          placeholder="Search for a chain"
          className="mb-12"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
        >
          {filteredChains.map((chainName, index) => {
            // @ts-ignore
            const chain = chains[chainName];
            const etherscanUrl = chain.blockExplorers?.etherscan?.url;
            return (
              <li key={index} className="overflow-hidden rounded-xl border ">
                <div className="flex justify-between items-center gap-x-4 border-b p-6">
                  <div className="text-sm font-medium leading-6">
                    {chainName}
                  </div>

                  <Button
                    onClick={() => {
                      setSelectedChain(chainName);
                      connectChain(chainName);
                    }}
                  >
                    Add Chain
                  </Button>
                </div>
                <dl className="-my-3 divide-y divide-border px-6 py-4 text-sm leading-6">
                  <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-muted-foreground">Chain ID</dt>
                    <dd className="text-muted-foreground">{chain.id}</dd>
                  </div>

                  <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-muted-foreground">Native Currency</dt>
                    <dd className="flex items-start gap-x-2">
                      <div className="font-medium text-muted-foreground">
                        {chain.nativeCurrency.symbol}
                      </div>
                    </dd>
                  </div>

                  {etherscanUrl && (
                    <div className="flex justify-between gap-x-4 py-3">
                      <dt className="text-muted-foreground">Block Explorer</dt>
                      <dd className="text-muted-foreground">
                        <Link
                          href={etherscanUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          Open
                        </Link>
                      </dd>
                    </div>
                  )}
                </dl>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
