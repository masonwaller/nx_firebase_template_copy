import { Hero } from '../../components/home-page/Hero'
import { PrimaryFeatures } from '../../components/home-page/PrimaryFeatures'
import { SecondaryFeatures } from '../../components/home-page/SecondaryFeatures'
import { CallToAction } from '../../components/home-page/CallToAction'
import { Testimonials } from '../../components/home-page/Testimonials'
import { Faqs } from '../../components/home-page/Faqs'
import { Footer } from '../../components/home-page/Footer'


export default function SignedInHome() {
  return (
    <>
      {/* <Header /> */}
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
