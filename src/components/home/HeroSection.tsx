import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight, Star, Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import carousel1 from '@/assets/carousel-1.jpg';
import carousel2 from '@/assets/carousel-2.jpg';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      
      <div className="container relative px-4 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                <Star className="h-4 w-4 fill-current" />
                <span>Trusted by 10,000+ customers</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Premium Booking &{' '}
                <span className="bg-gradient-accent bg-clip-text text-transparent">
                  Product Services
                </span>
              </h1>
              
              <p className="text-xl text-white/80 max-w-lg">
                Experience seamless booking and discover premium products tailored to your needs. 
                Quality, convenience, and excellence in every interaction.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-button group"
              >
                Book Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-white/60">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-white/60">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">99%</div>
                <div className="text-sm text-white/60">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="relative">
            <div className="relative rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-8">
              {/* Placeholder for hero image */}
              <div className="aspect-square bg-gradient-to-br from-accent to-accent/70 rounded-xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🎯</div>
                  <p className="text-lg font-medium">Premium Experience</p>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 bg-accent rounded-full p-3 shadow-elegant">
                <Star className="h-6 w-6 text-white fill-current" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-3 shadow-elegant">
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>
            </div>
            
            {/* Background glow */}
            <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-3xl -z-10" />
          </div>
        </div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 fill-background">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;