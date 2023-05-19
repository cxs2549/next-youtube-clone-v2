import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Plus } from "react-feather"

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-neutral-900/90 backdrop-blur-md dark:bg-neutral-800/90 text-white h-[66px] flex items-center justify-between sm:hidden">
      <div className="flex items-center pl-5 justify-between w-4/12">
        <Link href={`/`} className="flex flex-col gap-1 items-center w-[23px] h-[24px] justify-center">
          <Image
            src={`/icons/home.png`}
            width={23}
            height={24}
            alt="Home"
            className="invert cursor-pointer"
          />
          <p className="text-[10px]">Home</p>
        </Link>
        <Link href={`/shorts`} className="flex flex-col gap-1 items-center justify-center w-[23px] h-[24px]">
          <Image
            src={`/icons/shorts.png`}
            width={18}
            height={20}
            alt="Home"
            className="invert cursor-pointer"
          />
          <p className="text-[10px]">Shorts</p>
        </Link>
      </div>
      <div className="rounded-full border p-1 absolute left-1/2 -translate-x-1/2">
        <Plus size={26} className="cursor-pointer" />
      </div>
      <div className="flex items-center justify-between pr-5 w-4/12">
        <div className="flex flex-col gap-1 items-center justify-center  w-[23px] h-[24px]">
          <Image
            src={`/icons/subscriptions.png`}
            width={24}
            height={24}
            alt="Home"
            className="invert cursor-pointer"
          />
          <p className="text-[10px]">Subscriptions</p>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center  w-[23px] h-[24px]">
          <Image
            src={`/icons/library.png`}
            width={23}
            height={23}
            alt="Home"
            className="invert cursor-pointer"
          />
          <p className="text-[10px]">Library</p>
        </div>
      </div>
    </div>
  )
}

export default BottomNav
