"use client"
import { useState, useEffect } from "react"
import Video from "./components/Video"
import { dummyData } from "./data"
import Layout from "./components/Layout"

const HomePage = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setVideos(dummyData)
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])
  return (
    <Layout classes="grid sm:grid-cols-2 place-items-center sm:place-items-start sm:pl-[82px] sm:px-4 lg:grid-cols-3 w-full  gap-12 sm:gap-x-2 pt-8 mb-32 sm:mb-10 z-0 relative overflow-y-scroll h-full">
      {videos.map((video) => (
        <Video key={video.id} {...video} />
      ))}
    </Layout>
  )
}

export default HomePage
