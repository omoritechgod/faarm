"use client"

import type React from "react"

import { useState } from "react"
import Layout from "@/components/layout/Layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
} from "lucide-react"
import { toast } from "sonner"
import { bookingService } from "@/services/bookingService"

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await bookingService.submitContactForm(formData);
      // If the response contains a success message, show it
      if (response.success) {
        toast.success( response.message || "Your message has been sent successfully!")
      } else {
        toast.error(response.message || "Failed to send message, check your parameters and try again.")
      }
      
    } catch (error) {
      toast.error("Failed to open email client, check your internet connection and try again.")
    } finally {
      setIsSubmitting(false);
      // Reset form data after submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Address",
      details: ["Lagos, Nigeria", "West Africa"],
      color: "text-blue-600",
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["0814 531 9706", "0706 650 0878"],
      color: "text-green-600",
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["info@famousitsolutionltd.com"],
      color: "text-purple-600",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 5:00 PM", "Weekend: By Appointment"],
      color: "text-orange-600",
    },
  ]

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61576075276143&mibextid=ZbWKwL",
      icon: Facebook,
      color: "hover:bg-blue-600",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/famositconsultancy?igsh=MXdtZG9sbGQ1aDVz",
      icon: Instagram,
      color: "hover:bg-pink-600",
    },
    {
      name: "X (Twitter)",
      href: "https://x.com/famosits?s=11",
      icon: Twitter,
      color: "hover:bg-black",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@FamosConsultancyandITSolutions",
      icon: Youtube,
      color: "hover:bg-red-600",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/famos-consultancy-and-it-solutions-ltd/",
      icon: Linkedin,
      color: "hover:bg-blue-700",
    },
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center bg-white/10 text-white px-3 py-1 rounded-full text-sm font-medium mb-6">
              📞 Get In Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-white/80">
              Ready to transform your business with cutting-edge IT solutions? We're here to help you every step of the
              way.
            </p>
          </div>
        </div>
      </section>

      <div className="container px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                Have questions about our services? Need a custom quote? Our team is ready to provide you with expert
                guidance and support.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-gray-100 ${info.color}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-muted-foreground text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* WhatsApp */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold">WhatsApp Support</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Get instant support via WhatsApp. Available 24/7 for urgent inquiries.
                </p>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => window.open("https://wa.me/2348145319706", "_blank")}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat on WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* Social Media */}
            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-gray-100 hover:text-white rounded-lg transition-all duration-200 ${social.color}`}
                      aria-label={social.name}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+234 xxx xxx xxxx"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="quote">Request Quote</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="procurement">Hardware Procurement</SelectItem>
                          <SelectItem value="managed-services">Managed Services</SelectItem>
                          <SelectItem value="logistics">Logistics Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us about your project or inquiry..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-primary hover:opacity-90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending Message..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our privacy policy. We'll never share your information with
                    third parties.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <section className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Location</CardTitle>
              <p className="text-muted-foreground">
                Visit our office in Lagos, Nigeria for in-person consultations and support.
              </p>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Interactive map integration coming soon</p>
                  <p className="text-sm text-muted-foreground mt-2">Lagos, Nigeria - West Africa</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  )
}

export default Contact
