import AnnouncementBanner from './AnnouncementBanner.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

export default function Layout({ children, fullWidth = false }) {
  return (
    <>
      <AnnouncementBanner />
      <Header />
      <main className={`min-h-screen ${fullWidth ? 'pt-0' : 'pt-28'}`}>
        {children}
      </main>
      <Footer />
    </>
  )
}

