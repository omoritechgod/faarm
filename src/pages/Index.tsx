import Layout from '@/components/layout/Layout';
import HeroCarousel from '@/components/home/HeroCarousel';
import AboutSection from '@/components/home/AboutSection';
import ServicesSection from '@/components/home/ServicesSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import ProjectsSection from '@/components/home/ProjectsSection';
import TeamSection from '@/components/home/TeamSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

const Index = () => {
  return (
    <Layout>
      <HeroCarousel />
      <AboutSection />
      <ServicesSection />
      <FeaturedProducts />
      <ProjectsSection />
      <TeamSection />
      <TestimonialsSection />
    </Layout>
  );
};

export default Index;
