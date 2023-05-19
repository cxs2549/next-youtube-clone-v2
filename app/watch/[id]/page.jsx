"use client"
import { dummyData } from "@/app/data"
import Image from "next/image"
import Layout from "@/app/components/Layout"
import * as MenuIcon from "@/public/icons/icons"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Maximize,
  MoreHorizontal,
  Play,
  Settings,
  SkipForward,
  Volume2,
} from "react-feather"
import tw from "tailwind-styled-components"
import { useEffect, useRef, useState } from "react"
import * as Icon from "@/public/icons/icons"
import Link from "next/link"
import { Skeleton } from "@mui/material"
import Lottie from "lottie-react"
import playPulse from "@/public/play.json"

const Chips = tw.div`
 flex items-center w-full mb-2.5 overflow-x-scroll group relative
`

const Topics = ({ topics }) => {
  const [currentTopic, setCurrentTopic] = useState("All")

  return (
    <ul id="topics" className="text-sm inline-flex  w-full gap-1.5 flex-wrap">
      {topics.map((topic) => (
        <li
          onClick={() => setCurrentTopic(topic)}
          key={topic}
          className={`rounded-full px-3 py-1.5  whitespace-nowrap ${
            currentTopic === topic &&
            "bg-neutral-900/90 dark:bg-neutral-100 dark:text-black text-white font-medium"
          }`}
        >
          <button>{topic}</button>
        </li>
      ))}
    </ul>
  )
}

const IdPage = ({ params }) => {
  const [loading, setLoading] = useState(true)
  const [showComments, setShowComments] = useState(false)
  const topics = [
    "All",
    `From ${dummyData[params.id].channel}`,
    "Related",
    "Recently uploaded",
    "Watched",
  ]
  const date = new Date(dummyData[params.id].date)
  const currentDate = new Date()

  const differenceInMilliseconds = currentDate - date

  const monthsAgo = Math.round(
    differenceInMilliseconds / (1000 * 60 * 60 * 24 * 30)
  )
  const daysAgo = Math.round(differenceInMilliseconds / (1000 * 60 * 60 * 24))

  const unit =
    monthsAgo === 1 ? "month ago" : monthsAgo > 1 ? "months ago" : "day ago"
  const [scrollX, setscrollX] = useState(0)
  const [scrollEnd, setscrollEnd] = useState(false)
  const scrollRef = useRef(null)
  const slide = (shift) => {
    const scrollLeft = scrollRef.current?.scrollLeft
    const maxScrollLeft =
      scrollRef.current?.scrollWidth - scrollRef.current.offsetWidth

    let targetScrollLeft = scrollLeft + shift
    if (targetScrollLeft < 0) {
      targetScrollLeft = 0
    } else if (targetScrollLeft > maxScrollLeft) {
      targetScrollLeft = maxScrollLeft
    }

    const duration = 500 // in milliseconds
    const startTime = performance.now()
    const endTime = startTime + duration

    const easeInOutQuad = (t) => {
      t /= duration / 2
      if (t < 1) return (shift / 2) * t * t + scrollLeft
      t--
      return (-shift / 2) * (t * (t - 2) - 1) + scrollLeft
    }

    const scroll = (currentTime) => {
      if (currentTime >= endTime) {
        scrollRef.current.scrollLeft = targetScrollLeft
        setscrollX(targetScrollLeft)
        return
      }
      const time = currentTime - startTime
      const newScrollLeft = easeInOutQuad(time)
      scrollRef.current.scrollLeft = newScrollLeft
      setscrollX(newScrollLeft)
      requestAnimationFrame(scroll)
    }

    requestAnimationFrame(scroll)
    setscrollEnd(targetScrollLeft >= maxScrollLeft)
  }
  const scrollCheck = () => {
    setscrollX(scrollRef.current.scrollLeft)
    if (
      Math.floor(
        scrollRef.current.scrollWidth - scrollRef.current.scrollLeft
      ) <= scrollRef.current.offsetWidth
    ) {
      setscrollEnd(true)
    } else {
      setscrollEnd(false)
    }
  }
  useEffect(() => {
    if (
      scrollRef.current &&
      scrollRef?.current?.scrollWidth === scrollRef?.current?.offsetWidth
    ) {
      setscrollEnd(true)
    } else {
      setscrollEnd(false)
    }
    return () => {}
  }, [scrollRef?.current?.scrollWidth, scrollRef?.current?.offsetWidth])
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout()
  }, [])
  return (
    <Layout classes="sm:pl-[82px]   sm:pr-4 pt-3 mb-20">
      <div className=" grid lg:flex gap-2.5 mx-2 sm:mx-0">
        {/* video & info/comment */}
        <div className="flex flex-col gap-2.5 flex-1">
          <div
            style={{
              animation: loading && "pulseAnimation 2s linear infinite",
            }}
            className={`rounded-xl overflow-hidden relative transition-all duration-200 ease-in-out`}
          >
            <Image
              src={dummyData[params.id].thumbnail}
              width={1280}
              height={720}
              alt=""
            />
            <div className="absolute w-[98%] h-[3px] bg-neutral-200/50 left-1/2  -translate-x-1/2 bottom-4">
              <div className="absolute top-1/2 -translate-y-1/2 left-0 rounded-full h-2.5 w-2.5 bg-red-500"></div>
            </div>

            {loading && (
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <Lottie
                  style={{ width: 200, height: 200 }}
                  animationData={playPulse}
                  width={100}
                  height={100}
                  loop={true}
                />
              </div>
            )}
          </div>
          <div className="w-full bg-gradient-to-t from-neutral-900/90 text-white to-transparent flex items-center gap-2.5">
            <button>
              <Play size={28} className="" />
            </button>
            <button>
              <SkipForward size={28} className="" />
            </button>
            <button>
              <Volume2 size={28} className="" />
            </button>
            <p className="text-sm">0:00 / 4:20:21</p>
            <button className="ml-auto">
              <Settings />
            </button>
            <button>
              <Maximize />
            </button>
          </div>
          {/* title */}
          <h2 className="sm:text-lg lg:text-xl leading-6 font-semibold ">
            {dummyData[params.id].title}
          </h2>
          {/* channel info & buttons */}
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-2.5 ">
            <div className="flex gap-2 items-center">
              <div>
                {!loading ? (
                  <Image
                    src={dummyData[params.id].avatar}
                    width={42}
                    height={42}
                    alt=""
                    className="rounded-full"
                  />
                ) : (
                  <Skeleton variant="circular" width={42} height={42} />
                )}
              </div>
              <div>
                {!loading ? (
                  <div>
                    <p className="font-semibold text-sm">
                      {dummyData[params.id].channel}
                    </p>
                    <p className="text-xs opacity-70">165K subscribers</p>
                  </div>
                ) : (
                  <Skeleton variant="text" width={100} height={42} />
                )}
              </div>
              <button className="ml-auto md:ml-4 dark:bg-white dark:text-black bg-black text-white text-sm font-semibold px-4 py-2.5 rounded-full">
                Subscribe
              </button>
            </div>
            <div className="flex gap-2 items-center">
              {!loading ? (
                <div className="bg-neutral-100 dark:bg-neutral-800 flex gap-4 divide-x dark:divide-neutral-700 px-4 py-2.5 rounded-full items-center">
                  <button className="flex items-center gap-2">
                    <MenuIcon.InactiveLikedVideosIcon />
                    <p className="text-sm font-semibold">5.2k</p>
                  </button>
                  <button className="pl-4">
                    <div className="rotate-180">
                      <MenuIcon.InactiveLikedVideosIcon />
                    </div>
                  </button>
                </div>
              ) : (
                <Skeleton variant="rounded" width={152} height={45} />
              )}
              <button className="bg-neutral-100 dark:bg-neutral-800 flex gap-2 px-4 py-2.5 rounded-full items-center">
                <MenuIcon.ShareIcon />
                <span className="text-sm font-semibold">Share</span>
              </button>
              <button className="bg-neutral-100 dark:bg-neutral-800 hidden sm:flex gap-2 px-4 py-2.5 rounded-full items-center">
                <MenuIcon.ClipIcon />
                <span className="text-sm font-semibold">Clip</span>
              </button>
              <button className="bg-neutral-100 dark:bg-neutral-800 hidden xs:flex gap-2 px-4 py-2.5 rounded-full items-center">
                <MenuIcon.SaveIcon />
                <span className="text-sm font-semibold">Save</span>
              </button>
              <button className="bg-neutral-100 dark:bg-neutral-800 flex gap-2 p-2.5 rounded-full items-center ml-auto">
                <MoreHorizontal />
              </button>
            </div>
          </div>
          {/* description */}
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl  p-4 text-sm grid gap-1 ">
            <p className="text-neutral-700 font-semibold dark:text-neutral-300/80">
              {dummyData[params.id].views} views &bull; {monthsAgo || daysAgo}{" "}
              {unit}
            </p>
            <p>{dummyData[params.id].description}</p>
          </div>
          {/* comments */}
          <section className="grid gap-6  pt-4">
            <div className="flex gap-12">
              <p>35 comments</p>
              <button className="flex gap-1.5">
                <Icon.SortIcon />
                <p className="text-sm font-semibold">Sort by</p>
              </button>
            </div>
            <div className="flex gap-4">
              <div className="rounded-full flex-shrink-0  grid place-items-center text-xl text-white p-2 bg-red-500 h-10 w-10 font-semibold">
                <p className="-translate-y-1">c</p>
              </div>
              <input
                type="text"
                className="border-b outline-none pb-px w-full text-sm dark:bg-transparent dark:border-neutral-700"
                placeholder="Add a comment... "
              />
            </div>
            <button
              className={`text-sm flex items-center gap-1 font-medium mb-3 ${
                showComments && "-mb-3"
              }`}
              onClick={() => setShowComments(!showComments)}
            >
              <p>
                <span>{showComments ? "Hide" : "Show"}</span> comments
              </p>
              <ChevronDown size={16} />
            </button>
            {/* comments list */}
            <div
              className={`-mt-3 mb-6 grid gap-6 ${
                showComments ? "block" : "hidden"
              }`}
            >
              {dummyData.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <Image
                    src={item.avatar}
                    width={40}
                    height={40}
                    alt=""
                    className="rounded-full flex-shrink-0 h-10 w-10"
                  />
                  <div className="grid">
                    <div className="flex gap-2 items-center">
                      <p className="text-[13px] font-medium">{item.channel}</p>
                      <ChevronRight size={14} className="-ml-1.5" />
                      <span className="text-[13px] opacity-70">
                        1 month ago
                      </span>
                    </div>
                    <p className="text-[14px] mt-1">
                      I swear your first picks are always so fire. Please keep
                      uploading these
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <button className="flex text-xs items-center gap-1">
                        <Icon.InactiveLikedVideosIcon />
                        <p>1</p>
                      </button>
                      <button className="rotate-180">
                        <Icon.InactiveLikedVideosIcon />
                      </button>
                      <button className="text-xs font-semibold ml-4">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        {/* filters/recs */}
        <div className="flex overflow-y-scroll flex-col lg:max-w-[31%] gap-5 sm:min-w-[380px] w-full">
          <Chips ref={scrollRef} onScroll={scrollCheck}>
            {/* left arrow */}
            {scrollX !== 0 && (
              <div className="sticky bg-gradient-to-r from-white to-transparent dark:from-neutral-900 flex items-center h-[32px] w-[80px] left-0 sm:left-16 transition-all duration-300 ease-in z-10 opacity-0 hover:opacity-100 pointer-events-none">
                <button
                  onClick={() =>
                    slide((scrollRef.current.offsetWidth / 2) * -1)
                  }
                  onDoubleClick={() =>
                    slide(scrollRef.current.offsetWidth * -5)
                  }
                  className="absolute hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 hover:shadow-sm rounded-full p-1 cursor-pointer left-4 pointer-events-auto"
                >
                  <ChevronLeft className="dark:text-neutral-300 text-neutral-700/70" />
                </button>
              </div>
            )}
            <Topics topics={topics} />
            {/* right arrow */}
            {!scrollEnd && (
              <div className=" sticky dark:from-neutral-900 flex items-center h-[32px]  w-[80px] right-0 bg-gradient-to-l from-white to-transparent transition-opacity duration-300 ease-in pointer-events-none">
                <button
                  onClick={() => slide(scrollRef.current.offsetWidth / 2)}
                  onDoubleClick={() => slide(scrollRef.current.offsetWidth * 3)}
                  className="absolute cursor-pointer right-4 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 hover:shadow-sm rounded-full p-1 pointer-events-auto"
                >
                  <ChevronRight className="dark:text-neutral-300 text-neutral-700/70" />
                </button>
              </div>
            )}
          </Chips>
          <section className="grid gap-2.5">
            {dummyData.map((item) => (
              <div key={item.id} className="flex gap-2.5">
                <div className="relative w-6/12">
                  <Link href={`/watch/${item.id}`} className="flex gap-2">
                    <Image
                      src={item.thumbnail}
                      width={280}
                      height={160}
                      alt=""
                      className=" rounded-lg w-full"
                    />
                  </Link>
                  <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[13px] cursor-pointer font-semibold p-0.5 rounded">
                    {item.duration}
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <Link href={`/watch/${item.id}`}>
                    <h4 className="text-[13px] font-semibold">{item.title}</h4>
                  </Link>
                  <p className="text-[12px] opacity-70 mt-1 hover:underline hover:cursor-pointer">
                    {item.channel}
                  </p>
                  <p className="text-[12px] opacity-70">
                    {item.views} views &bull; {monthsAgo || daysAgo} {unit}
                  </p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default IdPage
