'use client';

import Image from "next/image"
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import Avatar from "react-avatar"

function Header() {
  return (
    <header>
        <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl space-y-5 md:space-y-0">
            <div 
                className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter opacity-50 blur-3xl -z-50"
            />
            <div className="flex flex-col md:flex-row space-x-5 items-center justify-center outline-none">
                <Image
                    src='/assets/board.png'
                    alt='Board Image'
                    width={200}
                    height={100}
                    className="w-24 md:w-32 pb-2 md:pb-0 object-contain items-center flex"
                />
                <p className="font-bold text-5xl">Trello GPT</p>
            </div>

            <div className="flex flex-1 space-x-5 justify-end items-center">
                <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
                    <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
                    <input type="text" placeholder="Search" className="flex-1"/>
                    <button type="submit" hidden >Search</button>
                </form>
                <Avatar name="Jaylon Ignacio" round size="50" color="#0055D1" />
            </div>
        </div>
        <div className="flex items-center justify-center px-5  py-2 md:py-5">
            <p className="flex items-center text-sm font-light p-5 pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1]" >
                <UserCircleIcon className="inline-block h-10 w-10 text-[#0055D1] mr-1" />
                GPT is summarising your day...
            </p>
        </div>

    </header>
  )
}

export default Header