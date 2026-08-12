import Hero from "@/components/Hero";
import Carousel from "@/components/Carousel";
import ChairmanMessage from "@/components/ChairmanMessage";
import ProgramStudi from "@/components/ProgramStudi";
import Lecturers from "@/components/Lecturers";
import CTA from "@/components/CTA";
import AccreditationModal from "@/components/AccreditationModal";
import AccreditationCTA from "@/components/AccreditationCTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <AccreditationModal />
      <Hero />
      <AccreditationCTA />
      <Carousel />
      <ChairmanMessage />
      <ProgramStudi />
      <Lecturers />
      <CTA />
    </main>
  );
}
