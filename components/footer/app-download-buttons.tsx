import Link from "next/link"
import Image from "next/image"

export function AppDownloadButtons() {
  return (
    <div className="flex gap-4 mt-4">
      <Link href="#" className="flex-1">
        <Image
          src="https://via.placeholder.com/140x42?text=Google+Play"
          alt="Get it on Google Play"
          width={140}
          height={42}
          className="w-full"
        />
      </Link>
      <Link href="#" className="flex-1">
        <Image
          src="https://via.placeholder.com/140x42?text=App+Store"
          alt="Download on the App Store"
          width={140}
          height={42}
          className="w-full"
        />
      </Link>
    </div>
  )
}

