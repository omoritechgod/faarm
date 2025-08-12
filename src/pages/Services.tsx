"use client";

import type React from "react";

import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
import {
  Server,
  Headphones,
  Settings,
  Truck,
  CheckCircle,
  Shield,
  Clock,
  Users,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Services = () => {
  // const [callbackForm, setCallbackForm] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   company: "",
  //   message: "",
  // })

  // const [isSubmitting, setIsSubmitting] = useState(false)

  // const handleCallbackSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsSubmitting(true)

  //   try {
  //     const mailtoLink = `mailto:info@famousitsolutionltd.com?subject=Callback Request from ${callbackForm.name}&body=${encodeURIComponent(
  //       `CALLBACK REQUEST\n\nName: ${callbackForm.name}\nEmail: ${callbackForm.email}\nPhone: ${callbackForm.phone}\nCompany: ${callbackForm.company}\n\nMessage:\n${callbackForm.message}`,
  //     )}`

  //     window.location.href = mailtoLink
  //     toast.success("Email client opened with your callback request. Please send the email to complete your request.")

  //     setCallbackForm({
  //       name: "",
  //       email: "",
  //       phone: "",
  //       company: "",
  //       message: "",
  //     })
  //   } catch (error) {
  //     toast.error("Failed to open email client. Please try again.")
  //   } finally {
  //     setIsSubmitting(false)
  //   }
  // }

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target
  //   setCallbackForm((prev) => ({ ...prev, [name]: value }))
  // }

  const services = [
    {
      icon: Server,
      title: "Hardware & Software Procurement",
      description:
        "We provide end-to-end procurement services for hardware and software, tailored to meet each client's operational needs. We start with a detailed consultation to understand your requirements, then source high-quality, compatible solutions from trusted vendors at competitive prices.",
      features: [
        "Enterprise Hardware Supply: Desktops, laptops, servers, storage, routers, firewalls etc.",
        "Software Licensing & Subscriptions: Microsoft 365, Adobe, antivirus, custom solutions.",
        "OEM Partnerships: HPE, Microsoft, Dell, HP, Cisco, Synology, Fortinet, Sophos, etc.",
      ],
      image: "/services/hardware-procurement.jpg",
    },
    {
      icon: Headphones,
      title: "IT Support",
      description:
        "Our IT support services ensure your technology infrastructure runs smoothly with minimal downtime. We offer both remote and on-site support, providing fast, expert assistance when you need it most.",
      features: [
        "24/7 Remote Support: Quick resolution of technical issues via remote access",
        "On-site Technical Support: Hardware repairs, installations, and maintenance",
        "Help Desk Services: Multi-channel support via phone, email, and chat",
      ],
      image: "/services/it-support.jpg",
    },
    {
      icon: Settings,
      title: "Managed IT Services",
      description:
        "Our managed services take the burden of IT management off your shoulders, allowing you to focus on your core business while we handle your technology infrastructure proactively.",
      features: [
        "Proactive Monitoring: 24/7 system monitoring and maintenance",
        "Security Management: Firewall management, antivirus, and threat detection",
        "Backup & Recovery: Automated backup solutions and disaster recovery planning",
      ],
      image: "/services/managed-services.jpg",
    },
    {
      icon: Truck,
      title: "IT Logistics & Deployment",
      description:
        "We handle the complete logistics chain from procurement to deployment, ensuring your IT equipment reaches the right place at the right time, properly configured and ready to use.",
      features: [
        "Secure Transportation: Safe delivery of sensitive IT equipment nationwide",
        "Professional Installation: Expert setup and configuration services",
        "Asset Management: Tracking and lifecycle management of your IT assets",
      ],
      image: "/services/logistics.jpg",
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description:
        "All our solutions meet enterprise security standards with comprehensive protection.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Round-the-clock support ensures your business operations never stop.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Certified professionals with years of industry experience.",
    },
    {
      icon: CheckCircle,
      title: "Quality Guarantee",
      description:
        "We stand behind our services with quality guarantees and SLAs.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="container px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/10 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
              Our Services
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Awesome Partnership
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              Services For Business
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              We empower businesses with cutting-edge technology solutions,
              driving innovation, efficiency, and growth through comprehensive
              IT services and logistics support.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="space-y-16">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    !isEven ? "lg:grid-flow-col-dense" : ""
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`space-y-6 ${!isEven ? "lg:col-start-2" : ""}`}
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-4 bg-primary/10 rounded-lg">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-start space-x-3"
                        >
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link to="/quote-request">
                      <Button
                        className="mt-6 bg-gradient-primary hover:opacity-90"
                        onClick={() => {
                          document
                            .getElementById("callback-section")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        Get Quote
                      </Button>
                    </Link>
                  </div>

                  {/* Image */}
                  <div
                    className={`relative ${
                      !isEven ? "lg:col-start-1 lg:row-start-1" : ""
                    }`}
                  >
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute -bottom-6 -right-6 bg-primary rounded-full p-4 shadow-elegant">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose FAMOS IT Solutions?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine technical expertise with business understanding to
              deliver solutions that drive real results for your organization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card
                  key={index}
                  className="text-center p-6 hover:shadow-card-hover transition-all duration-300 group"
                >
                  <CardContent className="p-0">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-lg mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Callback Request Section
      <section id="callback-section" className="py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Request a Callback</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ready to discuss your IT needs? Fill out the form below and our experts will get back to you within 24
                hours.
              </p>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>Schedule Your Consultation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCallbackSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={callbackForm.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={callbackForm.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={callbackForm.phone}
                        onChange={handleInputChange}
                        placeholder="+234 xxx xxx xxxx"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        name="company"
                        value={callbackForm.company}
                        onChange={handleInputChange}
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">How can we help you? *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={callbackForm.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your IT needs, challenges, or projects..."
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Sending Request..."
                    ) : (
                      <>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Request Callback
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your IT Infrastructure?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Let's discuss how FAMOS IT Solutions can help streamline your
              technology operations and drive your business forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quote-request">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Get Started Today
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
