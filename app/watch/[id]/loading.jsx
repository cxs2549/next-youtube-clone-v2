"use client"
import { videos } from "@/app/data"
import Image from "next/image"
import Layout from "@/app/components/Layout"
import * as MenuIcon from "@/public/icons/icons"
import { MoreHorizontal } from "react-feather"

const LoadingPage = () => {
  return (
    <Layout classes="sm:pl-[82px] mx-2 sm:mx-0 sm:pr-4 pt-2">
      <div className="lg:max-w-[70%]">
        <div
          width={1280}
          height={720}
          alt=""
          className="rounded border"
        />
        <h2 className="text-lg lg:text-xl font-semibold mt-2.5">
          
        </h2>
        <div className="mt-2.5 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-2">
          <div className="flex gap-2">
            <div
              width={44}
              height={44}
              alt=""
              className="rounded-full border"
            />
            <div>
              <p className="font-semibold"></p>
              <p className="text-xs opacity-70">16.25k subscribers</p>
            </div>
            <button className="ml-auto md:ml-6 dark:bg-white dark:text-black bg-black text-white text-sm font-semibold px-4 py-2.5 rounded-full">
              Subscribe
            </button>
          </div>
          <div className="flex gap-4 items-center mt-2.5 xl:mt-0">
            <div className="bg-neutral-100 dark:bg-neutral-800 flex gap-2 divide-x px-3 py-2 rounded-full items-center">
              <button className="flex items-center gap-2">
                <MenuIcon.InactiveLikedVideosIcon />
                <p className="text-sm font-semibold">5.2k</p>
              </button>
              <button className="pl-2">
                <div className="rotate-180">
                  <MenuIcon.InactiveLikedVideosIcon />
                </div>
              </button>
            </div>
            <button className="bg-neutral-100 dark:bg-neutral-800 flex gap-2 px-3 py-2 rounded-full items-center">
              <MenuIcon.ShareIcon />
              <span className="text-sm font-semibold">Share</span>
            </button>
            <button className="bg-neutral-100 dark:bg-neutral-800 hidden sm:flex gap-2 px-3 py-2 rounded-full items-center">
              <MenuIcon.ClipIcon />
              <span className="text-sm font-semibold">Clip</span>
            </button>
            <button className="bg-neutral-100 dark:bg-neutral-800 hidden sm:flex gap-2 px-3 py-2 rounded-full items-center">
              <MenuIcon.SaveIcon />
              <span className="text-sm font-semibold">Save</span>
            </button>
            <button className="bg-neutral-100 dark:bg-neutral-800 flex gap-2 p-2 rounded-full items-center">
              <MoreHorizontal />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default LoadingPage
