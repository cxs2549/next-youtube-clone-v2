"use client"
import { dummyData } from "@/app/data"
import Image from "next/image"
import Layout from "@/app/components/Layout"
import * as MenuIcon from "@/public/icons/icons"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "react-feather"
import tw from "tailwind-styled-components"
import { useEffect, useRef, useState } from "react"

const Chips = tw.div`
 flex items-center overflow-x-scroll group sm:ml-[66px] relative pb-2 mt-4
`


const Topics = ({topics}) => {
  const [currentTopic, setCurrentTopic] = useState("All")

  return (
    <ul id="topics" className="text-sm inline-flex whitespace-nowrap gap-1.5">
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
  return (
    <Layout classes="sm:pl-[82px] mx-2 sm:mx-0 sm:pr-4 pt-3 mb-20">
      <div className="lg:max-w-[70%] grid gap-2.5">
        <Image
          src={dummyData[params.id].thumbnail}
          width={1280}
          height={720}
          alt=""
          className="rounded "
        />
        <h2 className="text-lg lg:text-xl -mt-1 leading-6 font-semibold">
          {dummyData[params.id].title}
        </h2>
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-2.5">
          <div className="flex gap-2">
            <Image
              src={dummyData[params.id].avatar}
              width={44}
              height={44}
              alt=""
              className="rounded-full"
            />
            <div>
              <p className="font-semibold">{dummyData[params.id].channel}</p>
              <p className="text-xs opacity-70">165K subscribers</p>
            </div>
            <button className="ml-auto md:ml-6 dark:bg-white dark:text-black bg-black text-white text-sm font-semibold px-4 py-2.5 rounded-full">
              Subscribe
            </button>
          </div>
          <div className="flex gap-2 items-center">
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
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl  p-4 text-sm grid gap-1">
          <p className="text-neutral-700 font-semibold">
            {dummyData[params.id].views} views &bull; {monthsAgo || daysAgo}{" "}
            {unit}
          </p>
          <p>{dummyData[params.id].description}</p>
        </div>
        <Chips ref={scrollRef} onScroll={scrollCheck}>
          {/* left arrow */}
          {scrollX !== 0 && (
            <div className="fixed bg-gradient-to-r from-white to-transparent dark:from-neutral-900 flex items-center h-[32px] w-[80px] left-0 sm:left-16 transition-all duration-300 ease-in z-10 opacity-0 hover:opacity-100 pointer-events-none">
              <button
                onClick={() => slide((scrollRef.current.offsetWidth / 2) * -1)}
                onDoubleClick={() => slide(scrollRef.current.offsetWidth * -5)}
                className="absolute hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 hover:shadow-sm rounded-full p-1 cursor-pointer left-4 pointer-events-auto"
              >
                <ChevronLeft className="dark:text-neutral-300 text-neutral-700/70" />
              </button>
            </div>
          )}
          <Topics topics={topics} />
          {/* right arrow */}
          {!scrollEnd && (
            <div className="hover:opacity-100 fixed dark:from-neutral-900 flex items-center h-[32px]  w-[80px] right-0 bg-gradient-to-l from-white top-[64px] to-transparent transition-opacity duration-300 ease-in pointer-events-none">
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
      </div>
    </Layout>
  )
}

export default IdPage
