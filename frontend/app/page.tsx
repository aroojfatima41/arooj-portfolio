import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CareerAtGlance from '@/components/CareerAtGlance';
import Recommendations from '@/components/Recommendations';
import Experience from '@/components/Experience';
import LearningPaths from '@/components/LearningPaths';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main id="top">
      <Header />
      <Hero />
      <CareerAtGlance />
      <Recommendations />
      <Experience />
      <LearningPaths />
      <Contact />
    </main>
  );
}
