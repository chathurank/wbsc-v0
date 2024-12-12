import { TopBar } from "./header/top-bar"
import { MainHeader } from "./header/main-header"
import { Navigation } from "./header/navigation"
import { AnnouncementBanner } from "./header/announcement-banner"

export default function Header() {
  return (
    <header className="border-b font-sans">
      <TopBar />
      <MainHeader />
      <Navigation />
      <AnnouncementBanner />
    </header>
  )
}

