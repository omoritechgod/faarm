
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Target, Users, Award } from "lucide-react"
import { Link } from "react-router-dom"

const AboutSection = () => {
  const features = [
    "Enterprise-grade IT hardware and software",
    "Comprehensive logistics and deployment services",
    "24/7 technical support and maintenance",
    "Customized solutions for every business size",
  ]

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To empower businesses with reliable, innovative IT solutions that drive growth and efficiency.",
    },
    {
      icon: Users,
      title: "Our Team",
      description: "Certified professionals with years of experience in enterprise IT solutions and logistics.",
    },
    {
      icon: Award,
      title: "Our Promise",
      description: "Quality service delivery with guaranteed satisfaction and ongoing support for all clients.",
    },
  ]

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-float" />
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-float-delayed" />
      
      <div className="container px-4 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium animate-slide-in-left hover-float">
                About FAMOS IT Solutions
              </div>
              <h2 className="text-3xl md:text-4xl font-bold animate-slide-up text-reveal">
                Your Trusted Partner in
                <span className="text-primary block mt-2 animate-slide-in-right animate-delay-200"> IT Excellence</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed animate-fade-in animate-delay-300">
                With years of experience in the IT industry, FAMOS IT Solutions has established itself as a leading
                provider of comprehensive technology solutions across Nigeria. We specialize in hardware procurement,
                software licensing, IT support, and logistics services.
              </p>
            </div>

            <div className="space-y-4 animate-slide-up animate-delay-400">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`flex items-center space-x-4 group animate-slide-in-left animate-delay-${(index + 5) * 100} hover-float`}
                >
                  <div className="flex-shrink-0 p-1 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">{feature}</span>
                </div>
              ))}
            </div>

            <div className="animate-slide-up animate-delay-600">
              <Link to="/about">
                <Button className="bg-gradient-primary hover:opacity-90 hover-float hover-glow transform transition-all duration-300 shadow-button">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>

          {/* Values Cards */}
          <div className="space-y-6">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card 
                  key={index} 
                  className={`group hover:shadow-card-hover transition-all duration-500 hover-float animate-scale-in animate-delay-${(index + 2) * 200} border-0 shadow-elegant hover:shadow-card hover:-translate-y-2`}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="p-4 bg-gradient-primary rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-button">
                        <IconComponent className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors duration-300">{value.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
