"use client";

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  Lightbulb,
  Shield,
  Handshake,
  CheckCircle,
  TrendingUp,
  Globe,
  Clock,
  Boxes,
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const [isValuesOpen, setIsValuesOpen] = useState(false);

  const coreValues = [
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We uphold the highest standards of honesty, ethics, and accountability. Trust is the foundation of our relationships with clients, partners, and our team.",
    },
    {
      icon: Award,
      title: "Excellence & Professionalism",
      description:
        "We strive for superior performance in every service we deliver. Our commitment to quality and continuous improvement ensures that we exceed expectations every time.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We embrace change and champion forward-thinking. By leveraging emerging technologies and creative solutions, we stay ahead in delivering value-driven services.",
    },
    {
      icon: Heart,
      title: "Customer Focus",
      description:
        "Our clients are central to our mission. We listen actively, respond promptly, and tailor solutions that align with their goals, challenges, and vision for growth.",
    },
    {
      icon: CheckCircle,
      title: "Reliability",
      description:
        "We are dependable and consistent. Whether it's hardware procurement, IT support, or logistics fulfillment, clients can count on us for timely and accurate service delivery.",
    },
    {
      icon: Handshake,
      title: "Collaboration",
      description:
        "We believe in the power of teamwork. Through strategic collaboration, internally and with partners, we unlock synergies that drive shared success.",
    },
    {
      icon: Shield,
      title: "Security & Responsibility",
      description:
        "We prioritize data security, regulatory compliance, and responsible service delivery. We are committed to protecting our clients' digital assets and maintaining the highest standards of confidentiality and reliability.",
    },
  ];

  const whyChooseUs = [
    {
      icon: Users,
      title: "Expertise You Can Trust",
      description:
        "Our team brings deep technical knowledge and real-world experience across multiple industries, ensuring your IT environment is handled with precision and care.",
    },
    {
      icon: Globe,
      title: "End-to-End Solutions",
      description:
        "From procurement and support to managed services and logistics, we offer a complete suite of services under one roof, eliminating the need to juggle multiple vendors.",
    },
    {
      icon: Heart,
      title: "Client-Centric Approach",
      description:
        "We take time to understand your business goals and challenges, tailoring every solution to fit your unique needs and long-term vision.",
    },
    {
      icon: Clock,
      title: "Fast and Reliable Support",
      description:
        "Downtime is costly. Our responsive support team ensures issues are resolved quickly—minimizing disruption and maximizing productivity.",
    },
    {
      icon: Shield,
      title: "Secure and Scalable",
      description:
        "We prioritize data protection, system security, and future-ready solutions, giving you the confidence to grow without compromise.",
    },
    {
      icon: TrendingUp,
      title: "Proven Track Record",
      description:
        "With a strong portfolio of satisfied clients and successful projects, FAMOS IT is a name businesses trust to deliver consistent results and long-term value.",
    },
  ];

  const stats = [
    { number: "1467+", label: "Happy Clients", icon: Users },
    { number: "13", label: "Countries In Africa-Client Base", icon: Globe },
    { number: "8650+", label: "IT Products", icon: Boxes },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="container px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/10 text-white px-3 py-1 rounded-full text-sm font-medium mb-6">
              <Shield className="mr-2 h-4 w-4" />
              About FAMOS IT Solutions
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Empowering Africa's
              <span className="block text-yellow-400">
                Digital Transformation
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto animate-fade-in">
              We've been revolutionizing how businesses leverage technology
              through innovative IT solutions, reliable procurement services,
              and comprehensive logistics support.
            </p>
          </div>
        </div>
      </section>

      <div className="container px-4 py-16">
        {/* Company Overview */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-4">
                <Badge
                  variant="outline"
                  className="text-primary border-primary"
                >
                  Company Overview
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  FAMOS IT Solutions Limited
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  FAMOS IT Solutions Limited is a progressive and
                  innovation-driven technology and logistics company. We
                  specialize in the procurement of top-tier hardware and
                  software infrastructure, managed IT services, and end-to-end
                  logistics support tailored to meet the needs of businesses
                  operating in a digitally evolving world.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  At FAMOS IT Solutions, we understand that technology is the
                  backbone of every successful business. That's why we offer a
                  full spectrum of IT procurement services, sourcing
                  enterprise-grade computing equipment, networking devices,
                  cybersecurity solutions, and licensed software from trusted
                  global vendors. Our procurement process is designed to be
                  efficient, transparent, and customized to meet both
                  large-scale and specialized technology needs.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We deliver comprehensive logistics services to ensure your
                  technology assets are stored, managed, and deployed
                  efficiently. Backed by certified professionals and industry
                  expertise, we are dedicated to providing reliable, innovative,
                  and cost-effective solutions that drive business growth and
                  lasting partnerships.
                </p>
              </div>

              <Dialog open={isValuesOpen} onOpenChange={setIsValuesOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-gradient-primary hover:opacity-90"
                  >
                    Learn About Our Values
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center mb-4">
                      Our Core Values
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid md:grid-cols-2 gap-6">
                    {coreValues.map((value, index) => {
                      const IconComponent = value.icon;
                      return (
                        <Card
                          key={index}
                          className="border-primary/20 animate-fade-in"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <IconComponent className="h-5 w-5 text-primary" />
                              </div>
                              <CardTitle className="text-lg">
                                {value.title}
                              </CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {value.description}
                            </p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="relative animate-fade-in">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8">
                <img
                  src="/about-delivery.jpg"
                  alt="FAMOS IT Solutions Delivery Service"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg border">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">
                  Projects Delivered
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16 min-h-52 flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 place-content-center">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card
                  key={index}
                  className=" text-center p-6 border-primary/20 hover:shadow-lg transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-primary/20 animate-fade-in">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Our mission is to revolutionize the digital experience of
                  businesses by delivering integrated IT solutions that are
                  reliable, scalable, and future-ready. We are dedicated to
                  helping organizations harness the power of technology to
                  optimize operations, improve productivity, and enhance
                  competitiveness in a rapidly changing world. Through our
                  commitment to service excellence, continuous innovation, and a
                  customer-centric approach, we aim to be a trusted technology
                  partner to every business we serve.
                </p>
              </CardContent>
            </Card>

            <Card
              className="border-primary/20 animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Our vision is to become a leading force in Africa's digital
                  transformation, recognized for our excellence in IT
                  procurement, managed services, and logistics delivery. We
                  aspire to empower enterprises of all sizes by making
                  technology accessible, efficient, and strategically aligned
                  with their growth ambitions. As we grow, we aim to expand our
                  reach beyond regional borders and redefine the standards of
                  service delivery in the global IT and logistics ecosystem.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <div className="text-center mb-12 animate-fade-in">
            <Badge
              variant="outline"
              className="text-primary border-primary mb-4"
            >
              Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Businesses Trust FAMOS IT
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              At FAMOS IT, we go beyond providing technology—we deliver peace of
              mind. Our commitment to reliability, responsiveness, and
              results-driven service makes us a trusted partner for businesses
              seeking efficient and scalable IT solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((reason, index) => {
              const IconComponent = reason.icon;
              return (
                <Card
                  key={index}
                  className="border-primary/20 hover:shadow-lg transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{reason.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center animate-fade-in">
          <Card className="bg-gradient-hero text-white border-0">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Join the growing number of businesses that trust FAMOS IT
                Solutions for their technology and logistics needs. Let's build
                the future together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    Get Started Today
                  </Button>
                </Link>
                <Link to="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 bg-transparent"
                  >
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default About;
