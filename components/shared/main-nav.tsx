import React from "react";
import ModeToggle from "./mode-toggle";
import { Link2Icon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import Link from "next/link";

export default function MainNav() {
  return (
    <header>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="-m-1.5 p-1.5 flex">
          <Link2Icon className="h-8 w-auto mr-1" />
          <h1 className="text-2xl font-bold">ChainLane</h1>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 "
          >
            <span className="sr-only">Open main menu</span>
          </button>
        </div>
        <div className="flex items-center gap-x-2">
          <Link
            href="https://www.twitter.com/abdo_eth"
            rel="noopener"
            target="_blank"
          >
            <Button size="icon" variant="ghost">
              <TwitterLogoIcon />
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
