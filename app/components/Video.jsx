import Image from "next/image"
import Link from "next/link"
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
  const postedDate = new Date(date)
  const currentDate = new Date()

  const differenceInMilliseconds = currentDate - postedDate

  const monthsAgo = Math.round(
    differenceInMilliseconds / (1000 * 60 * 60 * 24 * 30)
  )
  const daysAgo = Math.round(differenceInMilliseconds / (1000 * 60 * 60 * 24))

  const unit =
    monthsAgo === 1 ? "month ago" : monthsAgo > 1 ? "months ago" : "days ago"
  return (
    <div className="mx-2 sm:mx-0 max-w-[500px] flex flex-col gap-1.5">
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
            className="rounded-lg cursor-pointer"
          />
        </Link>
        <div className="absolute bottom-2 right-2 bg-black/70 rounded text-white text-sm font-semibold px-1 py-px">
          {duration}
        </div>
      </div>
      <div className="">
        <h3 className="font-semibold cursor-pointer leading-5">{title}</h3>
        <div className="flex items-center mt-1.5 gap-2">
          <Image
            src={avatar}
            width={36}
            height={36}
            alt="avatar"
            className="rounded-full cursor-pointer self-center"
          />
          <div className="text-neutral-700/90 dark:text-neutral-400">
            <p className=" text-sm hover:underline cursor-pointer font-medium">{channel}</p>
            <p className=" text-[12px]">
              {views} views &bull; {monthsAgo || daysAgo} {unit}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Video
