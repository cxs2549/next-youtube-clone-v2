import BottomNav from "./components/BottomNav"
import Header from "./components/Header"
import "./globals.css"
import { Inter} from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

const videos = [
  {
    id: 0,
    avatar: "/avatars/avatar-0.png",
    thumbnail: "/videos/video-0.png",
    title:
      "Relaxing Videogame Music from Nintendo Switch to Sleep, Study...",
    description: `Hello!
    I'm a game experiencer.
    Welcome to another "Monster Harvest" with no commentary! I decided to record myself on "Monster Harvest", and see how things turned out! I hope you guys find this relaxing and enjoyable. I will be making a lot more of these to help everyone sleep, relax, and study! `,
    channel: "stardew valley",
    views: "117k",
    duration: "3:57:12",
    date: "Mar 21, 2023",
  },
  {
    id: 1,
    avatar: "/avatars/avatar-1.jpeg",
    thumbnail: "/videos/video-1.png",
    title: "5 Minute Makeup Tutorial for a Fresh, Natural Look",
    description:
      "Get ready in a flash with this easy makeup tutorial. Follow along as I show you how to achieve a fresh, natural look in just 5 minutes!",
    channel: "glowupguru",
    views: "1.2M",
    duration: "5:07",
    date: "Apr 28, 2023",
  },
  {
    id: 2,
    avatar: "/avatars/avatar-2.jpeg",
    thumbnail: "/videos/video-2.png",
    title: "Amazing Drone Footage of Stunning Beaches",
    description:
      "Experience the beauty of nature with this incredible drone footage of some of the world's most stunning beaches. Relax and unwind as you take in the breathtaking views!",
    channel: "skyhighvisuals",
    views: "827k",
    duration: "12:43",
    date: "Apr 17, 2023",
  },
  {
    id: 3,
    avatar: "/avatars/avatar-3.jpeg",
    thumbnail: "/videos/video-3.png",
    title: "Delicious and Healthy Smoothie Recipes to Try Today",
    description:
      "Get your daily dose of fruits and veggies with these delicious and healthy smoothie recipes. Perfect for a quick breakfast or mid-day snack!",
    channel: "healthyeatingmadeeasy",
    views: "674k",
    duration: "8:23",
    date: "Apr 12, 2023",
  },
  {
    id: 4,
    avatar: "/avatars/avatar-4.jpeg",
    thumbnail: "/videos/video-4.png",
    title: "Learn to Play the Guitar in 30 Days",
    description:
      "Always wanted to play the guitar? Now's your chance! Join me as I take you through a 30-day journey to learn this amazing instrument.",
    channel: "guitarlessons101",
    views: "1.5M",
    duration: "32:18",
    date: "Mar 29, 2023",
  },
  {
    id: 5,
    avatar: "/avatars/avatar-5.jpeg",
    thumbnail: "/videos/video-5.png",
    title: "The Best Yoga Poses for a Calm Mind and Body",
    description:
      "Take a break from your hectic day and unwind with these calming yoga poses. Perfect for beginners and experienced yogis alike!",
    channel: "yogawithsara",
    views: "926k",
    duration: "16:39",
    date: "Mar 25, 2023",
  },
  {
    id: 6,
    avatar: "/avatars/avatar-6.jpeg",
    thumbnail: "/videos/video-6.png",
    title: "10 Easy DIY Projects to Transform Your Home",
    description:
      "Get crafty and transform your living space with these easy and affordable DIY projects. From wall art to furniture makeovers, you'll be amazed at what you can create!",
    channel: "diywithme",
    views: "579k",
    duration: "21:12",
    date: "Mar 15, 2023",
  },
  {
    id: 7,
    avatar: "/avatars/avatar-7.jpeg",
    thumbnail: "/videos/video-7.png",
    title: "Discovering the Wonders of the Amazon Rainforest",
    description:
      "Join me on a once-in-a-lifetime adventure through the lush Amazon rainforest. From exotic wildlife to breathtaking landscapes, you won't want to miss this!",
    channel: "explorewithme",
    views: "953k",
    duration: "22:48",
    date: "May 10, 2023",
  },
  {
    id: 8,
    avatar: "/avatars/avatar-8.jpeg",
    thumbnail: "/videos/video-8.png",
    title: "10 Minute Full Body Workout for Beginners",
    description:
      "Get fit and healthy with this quick and easy full body workout. Perfect for beginners or anyone short on time!",
    channel: "fitnesswithjess",
    views: "2.4M",
    duration: "10:23",
    date: "May 5, 2023",
  },
  {
    id: 9,
    avatar: "/avatars/avatar-9.jpeg",
    thumbnail: "/videos/video-9.png",
    title: "Meditation for Stress Relief and Relaxation",
    description:
      "Take a break from your busy day and relax with this guided meditation for stress relief. Let go of your worries and find inner peace!",
    channel: "mindfulmoments",
    views: "638k",
    duration: "14:31",
    date: "May 2, 2023",
  },
  {
    id: 10,
    avatar: "/avatars/avatar-10.jpeg",
    thumbnail: "/videos/video-10.png",
    title: "How to Make the Perfect Cup of Coffee",
    description:
      "Calling all coffee lovers! Learn how to make the perfect cup of coffee with this step-by-step tutorial. Your mornings will never be the same!",
    channel: "coffeeconnoisseur",
    views: "1.1M",
    duration: "7:56",
    date: "Apr 28, 2023",
  },
  {
    id: 11,
    avatar: "/avatars/avatar-11.jpeg",
    thumbnail: "/videos/video-11.png",
    title: "10 Must-Visit Tourist Attractions in Tokyo",
    description:
      "Planning a trip to Tokyo? Don't miss these must-visit tourist attractions, from historic temples to modern landmarks!",
    channel: "travelwithme",
    views: "784k",
    duration: "11:52",
    date: "Apr 25, 2023",
  },
  {
    id: 12,
    avatar: "/avatars/avatar-12.png",
    thumbnail: "/videos/video-12.png",
    title: "The Ultimate Guide to Baking the Perfect Cake",
    description:
      "Learn all the tips and tricks for baking the perfect cake with this comprehensive guide. Join me as we bake together and create something delicious!",
    channel: "bakingwithbella",
    views: "346k",
    duration: "25:15",
    date: "May 2, 2023",
  },
]

export const metadata = {
  title: "Youtube created with Next.js | cs.dev",
  description: "Generated by create next app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header videos={videos} />
        <main>{children}</main>
        <BottomNav />
      </body>
    </html>
  )
}
