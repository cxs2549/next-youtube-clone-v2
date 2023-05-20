"use state"
import React, { useRef, useState, useEffect } from "react"

const MediaPlayer = ({
  src,
  handleLoadedData,
  songLoaded,
  setSongLoaded,
  setIsPlaying,
  isPlaying,
  currentSongIndex,
  setCurrentSongIndex,
  playlist,
}) => {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)
  console.log(playlist)
  const handlePlay = () => {
    audioRef.current.play()
    if (songLoaded) {
      setSongLoaded(true)
    }
    setIsPlaying(true)
  }

  const handlePause = () => {
    audioRef.current.pause()
    setIsPlaying((prev) => !prev)
  }
  const handleEnded = () => {
    setIsPlaying((prev) => !prev)
  }

  useEffect(() => {
    const audioElement = audioRef.current

    const updateTime = () => {
      setCurrentTime(audioElement.currentTime)
    }

    const updateDuration = () => {
      setDuration(audioElement.duration)
    }

    audioElement.addEventListener("timeupdate", updateTime)
    audioElement.addEventListener("loadedmetadata", updateDuration)

    return () => {
      audioElement.removeEventListener("timeupdate", updateTime)
      audioElement.removeEventListener("loadedmetadata", updateDuration)
    }
  }, [])

  const handleSeek = (e) => {
    const seekTime = e.target.value
    audioRef.current.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0")
    return `${minutes}:${seconds}`
  }

  const handleNext = () => {
    audioRef.current.pause()
    const nextSongSrc = getNextSongSrc() // Replace with your logic to get the next song URL
    audioRef.current.src = nextSongSrc
    audioRef.current.load()
    audioRef.current.play()
  }

  const getNextSongSrc = () => {
    // Replace this with your logic to get the URL of the next song
    // For example, you could have an array of song URLs and a current song index
    setCurrentSongIndex((prev) => prev + 1)
    const nextSongIndex = currentSongIndex + 1
    if (nextSongIndex < playlist.length) {
      const nextSongSrc = playlist[nextSongIndex].track.preview_url
      return nextSongSrc
    }
    return null
  }

  return (
    <>
      <audio
        ref={audioRef}
        onLoadedData={handleLoadedData}
        onEnded={handleEnded}
        src={src}
      />
      <div className="bg-neutral-100 rounded-lg dark:bg-neutral-800 flex flex-col z-0">
        <div className="relative w-player flex flex-col rounded-xl shadow-player-light  dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border dark:backdrop-blur-xl">
          <div className="px-8 flex items-center">
            {/* <Image
              data-amplitude-song-info="cover_art_url"
              className="w-24 h-24 rounded-md mr-6 border border-bg-player-light-background dark:border-cover-dark-border"
            /> */}
          </div>

          <div className="h-control-panel px-4 py-0.5 rounded-lg bg-control-panel-light-background  flex items-centerdark:bg-control-panel-dark-background dark:border-gray-900">
            <div className="cursor-pointer amplitude-play-pause flex items-center justify-center dark:bg-play-pause-dark-background dark:border-play-pause-dark-border">
              <svg
                onClick={handlePlay}
                id="play-icon"
                width="15"
                height="37"
                viewBox="0 0 31 37"
                fill="none"
                className={isPlaying ? "hidden" : ""}
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M29.6901 16.6608L4.00209 0.747111C2.12875 -0.476923 0.599998 0.421814 0.599998 2.75545V33.643C0.599998 35.9728 2.12747 36.8805 4.00209 35.6514L29.6901 19.7402C29.6901 19.7402 30.6043 19.0973 30.6043 18.2012C30.6043 17.3024 29.6901 16.6608 29.6901 16.6608Z"
                  className="dark:fill-white fill-neutral-800"
                />
              </svg>
              {/* pause */}
              <svg
                onClick={handlePause}
                className={!isPlaying ? "hidden" : ""}
                id="pause-icon"
                width="14"
                height="36"
                viewBox="0 0 24 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="6"
                  height="36"
                  rx="3"
                  className="dark:fill-white stroke-neutral-800 fill-neutral-800"
                />
                <rect
                  x="18"
                  width="6"
                  height="36"
                  rx="3"
                  className="dark:fill-white stroke-neutral-800 fill-neutral-800"
                />
              </svg>
            </div>
            <div class="w-full flex gap-2 items-center  justify-center px-8">
              <input
                type="range"
                id="song-percentage-played"
                className="amplitude-song-slider flex-1 bg-neutral-700"
                min={0}
                max={30}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
              />
              <div class="flex  justify-between">
                <span class="amplitude-current-time text-xs font-sans tracking-wide font-medium text-sky-500 dark:text-sky-300"></span>
                <span class="amplitude-duration-time text-xs font-sans tracking-wide font-medium text-gray-500 dark:text-gray-200">
                  {`${formatTime(currentTime)} / 0:30`}
                </span>
              </div>
            </div>
            <div class="cursor-pointer amplitude-next">
              <svg
                onClick={handleNext}
                width="24"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                className="dark:fill-white stroke-neutral-800 fill-neutral-800"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="dark:fill-white stroke-neutral-800 fill-neutral-800"
                  d="M6 7C6 5.76393 7.41115 5.05836 8.4 5.8L20.4 14.8C21.2 15.4 21.2 16.6 20.4 17.2L8.4 26.2C7.41115 26.9416 6 26.2361 6 25V7Z"
                  stroke-width="2"
                  stroke-linejoin="round"
                />
                <path
                  className="dark:fill-white dark:stroke-white stroke-neutral-800 fill-neutral-800"
                  d="M26 5L26 27"
                  color="#ffffff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div class="hidden top-14 w-full absolute ml-auto mr-auto left-0 right-0 text-center max-w-lg h-72 rounded-full bg-highlight blur-2xl dark:block"></div>
        </div>
      </div>
    </>
  )
}

export default MediaPlayer
