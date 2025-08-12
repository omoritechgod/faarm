
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import carousel1 from '@/assets/carousel-1.jpg';
import carousel2 from '@/assets/carousel-2.jpg';

const HeroCarousel = () => {
  const [showServices, setShowServices] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const services = [
    { name: "IT Procurement", description: "Efficient acquisition of technology solutions" },
    { name: "IT Support", description: "Fast, expert assistance remotely and on-site" },
    { name: "Managed Services", description: "Proactive monitoring and maintenance" },
    { name: "Logistics", description: "Secure transport and deployment" }
  ];

  const slides = [
    {
      image: carousel1,
      title: "Seamless IT Procurement,",
      subtitle: "Reliable Managed Services, Efficient Logistics",
      description: "We empower businesses with cutting-edge technology solutions, driving innovation and efficiency."
    },
    {
      image: carousel2,
      title: "Expert IT Solutions,",
      subtitle: "Professional Services & Support",
      description: "Comprehensive IT services and logistics support tailored to meet your business needs."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-primary/60 backdrop-blur-[1px]" />
          </div>
          
          <div className="relative h-full flex items-center">
            <div className="container px-4">
              <div className="max-w-2xl text-white">
                <p className={`text-lg mb-4 text-reveal animate-delay-200 ${
                  index === currentSlide ? 'animate-slide-in-left' : ''
                }`}>
                  {slide.title}
                </p>
                <h1 className={`text-5xl md:text-7xl font-bold mb-6 text-reveal animate-delay-300 ${
                  index === currentSlide ? 'animate-slide-up' : ''
                }`}>
                  {slide.subtitle}
                </h1>
                <p className={`text-xl mb-8 text-white/90 text-reveal animate-delay-400 ${
                  index === currentSlide ? 'animate-fade-in' : ''
                }`}>
                  {slide.description}
                </p>
                <div className={`space-x-4 animate-delay-500 ${
                  index === currentSlide ? 'animate-slide-up' : ''
                }`}>
                  <Link to="/contact">
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90 hover-float hover-glow transform transition-all duration-300">
                      Get Started
                    </Button>
                  </Link>
                  <Button 
                    size="lg" 
                    variant="hero" 
                    className="hover-scale transform transition-all duration-300 ml-4"
                    onClick={() => setShowServices(!showServices)}
                  >
                    Explore More
                  </Button>
                </div>
                
                {showServices && (
                  <div className="mt-8 grid grid-cols-2 gap-4 max-w-2xl">
                    {services.map((service, serviceIndex) => (
                      <Card 
                        key={serviceIndex} 
                        className={`bg-white/10 backdrop-blur-sm border-white/20 hover-float animate-scale-in animate-delay-${(serviceIndex + 1) * 100} hover:bg-white/20 transition-all duration-300`}
                      >
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-white mb-1">{service.name}</h4>
                          <p className="text-white/80 text-sm">{service.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows with Animation */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 text-white transition-all duration-300 hover-scale hover:shadow-lg animate-float"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 text-white transition-all duration-300 hover-scale hover:shadow-lg animate-float-delayed"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators with Animation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover-scale ${
              index === currentSlide 
                ? 'bg-white shadow-lg scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float hidden lg:block" />
      <div className="absolute bottom-32 left-16 w-16 h-16 bg-accent/20 rounded-full blur-lg animate-float-delayed hidden lg:block" />
    </section>
  );
};

export default HeroCarousel;
