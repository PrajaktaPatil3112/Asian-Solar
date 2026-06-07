import Seo from './lib/seo'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Benefits from './components/sections/Benefits'
import SolarCalculator from './components/sections/SolarCalculator'
import SubsidyInfo from './components/sections/SubsidyInfo'
import Gallery from './components/sections/Gallery'
import FAQ from './components/sections/FAQ'
import Contact from './components/sections/Contact'
import FloatingEnquiry from './components/widgets/FloatingEnquiry'
import ClickToCall from './components/widgets/ClickToCall'
import InquiryPopup from './components/widgets/InquiryPopup'

export default function App() {
  return (
    <>
      <Seo />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Benefits />
        <SolarCalculator />
        <SubsidyInfo />
        <Gallery />
        <FAQ />
        <Contact />
      </main>
      <Footer />

      {/* Floating widgets */}
      <FloatingEnquiry />
      <ClickToCall />
      <InquiryPopup />
    </>
  )
}
