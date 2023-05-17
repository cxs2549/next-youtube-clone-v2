'use client'
import Video from "./components/Video"
import { videos } from "./data"
import Layout from "./components/Layout"

const HomePage = () => {
  return (
    <Layout classes="flex flex-col items-center sm:items-stretch sm:grid sm:grid-cols-2 sm:pl-[82px] sm:px-4 lg:grid-cols-3 w-full  gap-10 sm:gap-x-2 pt-2 mb-24 z-0 relative overflow-y-scroll h-full">
      {videos.map((video) => (
        <Video key={video.id} {...video} />
      ))}
    </Layout>
  )
}

export default HomePage
