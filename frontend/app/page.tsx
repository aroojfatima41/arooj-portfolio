import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from "@/components/Projects";
import EngineeringStack from '@/components/EngineeringStack';
import FlagshipCaseStudy from '@/components/FlagshipCaseStudy';
import HrAutomationCaseStudy from '@/components/HrAutomationCaseStudy';

export default function Home() {
  return (
    <main id="top">
      <Header />
      <Hero />
      <About />
      <Experience />
      <EngineeringStack />
      <FlagshipCaseStudy />
      <HrAutomationCaseStudy />
      <Projects />
    </main>
  );
}

