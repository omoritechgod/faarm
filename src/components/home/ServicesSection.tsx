
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Shield, Headphones, Zap, Users, Award } from 'lucide-react';
import { Link, useLocation } from "react-router-dom"

const ServicesSection = () => {
  const services = [
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Simple and intuitive booking process with instant confirmation and flexible scheduling options.",
      features: ["Instant confirmation", "Flexible dates", "Online management"]
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Your transactions are protected with enterprise-grade security and multiple payment options.",
      features: ["SSL encryption", "Multiple payment methods", "Fraud protection"]
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you with any questions or concerns.",
      features: ["Live chat", "Phone support", "Email assistance"]
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Quick turnaround times and efficient service delivery for all your needs.",
      features: ["Same-day service", "Express options", "Real-time tracking"]
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Perfect for teams and groups with collaborative booking and management features.",
      features: ["Group bookings", "Team management", "Shared calendars"]
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "We stand behind our services with quality guarantees and satisfaction assurance.",
      features: ["Money-back guarantee", "Quality assurance", "Customer satisfaction"]
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute top-20 right-16 w-40 h-40 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-16 w-32 h-32 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-2xl animate-float-delayed" />
      
      <div className="container px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-slide-up hover-float">
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-slide-up animate-delay-200">
            Why Choose <span className="text-primary">FAMOS?</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed animate-fade-in animate-delay-300">
            We provide comprehensive services designed to make your experience seamless, 
            secure, and satisfying from start to finish.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className={`group hover:shadow-card-hover transition-all duration-500 border-0 shadow-elegant hover:-translate-y-3 animate-scale-in animate-delay-${(index + 1) * 100} hover-float bg-gradient-to-br from-card to-card/50`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-4 bg-gradient-primary rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-button animate-float">
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex} 
                        className="flex items-center text-sm group-hover:translate-x-1 transition-transform duration-300"
                      >
                        <div className="w-2 h-2 bg-gradient-primary rounded-full mr-3 group-hover:scale-125 transition-transform duration-300" />
                        <span className="group-hover:text-foreground transition-colors duration-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enhanced CTA Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-lg opacity-20 animate-glow" />
          <div className="relative bg-gradient-primary rounded-3xl p-8 md:p-16 text-center text-white shadow-elegant animate-slide-up animate-delay-700">
            <div className="absolute top-6 left-6 w-20 h-20 bg-white/10 rounded-full animate-float" />
            <div className="absolute bottom-6 right-6 w-16 h-16 bg-white/10 rounded-full animate-float-delayed" />
            
            <h3 className="text-3xl md:text-4xl font-bold mb-6 animate-slide-up animate-delay-800">
              Ready to Get Started?
            </h3>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in animate-delay-900">
              Join thousands of satisfied customers who trust FAMOS for their booking and service needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up animate-delay-1000">
              <Link to="/quote-request" onClick={() => setIsMenuOpen(false)}>
                <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 hover-float hover-glow transform transition-all duration-300 shadow-button text-lg px-8 py-4"
              >
                Start Booking Now
              </Button>
              </Link>

              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/30 text-white hover:bg-white/10 hover-scale transform transition-all duration-300 text-lg px-8 py-4"
                  >
                    Learn More
                  </Button>
              </Link>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
