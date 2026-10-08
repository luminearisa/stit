import CampusMap from "@/components/CampusMap";
import Hero from "@/components/Hero";
import Carousel from "@/components/Carousel";
import ChairmanMessage from "@/components/ChairmanMessage";
import ProgramStudi from "@/components/ProgramStudi";
import Lecturers from "@/components/Lecturers";
import CTA from "@/components/CTA";
import AccreditationCTA from "@/components/AccreditationCTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AccreditationCTA />
      <Carousel />
      <ChairmanMessage />
      <ProgramStudi />
      <Lecturers />
      <CampusMap />
      <CTA />
    </main>
  );
}
