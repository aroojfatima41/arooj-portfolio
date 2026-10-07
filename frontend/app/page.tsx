import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StatStrip from '@/components/StatStrip';
import SmartHireCaseStudy from '@/components/SmartHireCaseStudy';
import Experience from '@/components/Experience';
import EngineeringStack from '@/components/EngineeringStack';
import Education from '@/components/Education';
import LearningPaths from '@/components/LearningPaths';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main id="top">
      <Header />
      <Hero />
      <StatStrip />
      <Experience />
      <SmartHireCaseStudy homepage />
      <EngineeringStack />
      <Education />
      <LearningPaths />
      <Contact />
    </main>
  );
}

