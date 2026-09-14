import About from "./components/About";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import QuickBooking from "./components/QuickBooking";
import SafariSection from "./components/SafariSection";
import VillageTour from "./components/VillageTour";
import Destinations from "./components/Destinations";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div className="bg-[#fffdf8]">
        <QuickBooking />
        <About />
        <SafariSection />
        <VillageTour />
        <Destinations />
        <Gallery />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
