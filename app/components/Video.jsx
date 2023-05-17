import Image from "next/image"
import Link from "next/link"
import { Skeleton } from "@mui/material"
import { useState, useEffect } from "react"

const Video = ({
  thumbnail,
  avatar,
  duration,
  title,
  channel,
  views,
  date,
  id,
}) => {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="mx-2 sm:mx-0 max-w-[500px] flex flex-col gap-1">
      <div className="relative">
        <div className="absolute top-2 right-2 bg-black/50 p-px rounded-full cursor-pointer">
          <Image
            src={`/icons/watchlater.png`}
            width={26}
            height={26}
            alt="watchlater"
            className="invert"
          />
        </div>
        <Link href={`/watch/${id}`}>
          <Image
            src={thumbnail}
            width={500}
            height={300}
            alt="video"
            className="rounded cursor-pointer"
          />
        </Link>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-sm font-semibold px-1 py-px">
          {duration}
        </div>
      </div>
      <div className="">
        <h3 className="font-semibold cursor-pointer">{title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Image
            src={avatar}
            width={36}
            height={36}
            alt="avatar"
            className="rounded-full cursor-pointer self-center"
          />
          <div className="text-neutral-700/90 dark:text-neutral-400">
            <p className=" mt-1 text-sm hover:underline cursor-pointer">
              {channel}
            </p>
            <p className=" text-sm">
              {views} views &bull; {date}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Video
