import Atmosphere from "@/components/Atmosphere";
import DayNight from "@/components/DayNight";
import Days from "@/components/Days";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PlateJourney from "@/components/PlateJourney";
import Reserve from "@/components/Reserve";
import TheCatch from "@/components/TheCatch";
import ToddyHour from "@/components/ToddyHour";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <PlateJourney />
        <Atmosphere />
        <Days />
        <ToddyHour />
        <TheCatch />
        <DayNight />
        <Reserve />
      </main>
      <Footer />
    </>
  );
}
