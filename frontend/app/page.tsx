import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StatStrip from '@/components/StatStrip';
import Experience from '@/components/Experience';
import Recommendations from '@/components/Recommendations';
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
      <Education />
      <LearningPaths />
      <Recommendations />
      <Contact />
    </main>
  );
}
