"use client"

import type React from "react"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  X,
  Youtube,
  Linkedin,
  MessageCircle,
  ExternalLink,
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { apiService } from "@/services/api"

const Footer = () => {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)

    try {
      // new API endpoint for newsletter subscription
     const response = await apiService.post<{ success: boolean; message: string }>("/api/new-email", { email });

     if (response.success) {
        toast.success("Subscribed successfully!")
      }else{
        toast.error(response.message || "Subscription failed, email has been sent before or wrong email format.")
      }
    } catch (error) {
      toast.error("Failed to subscribe, check your internet connection or email has been sent before.")
    } finally {
      setIsSubscribing(false);
      setEmail("") // Reset email input after submission
    }
  }

  const partners = [
    "Hewlett-Packard Enterprise",
    "Dell Technologies",
    "Cisco Systems",
    "Sophos",
    "Microsoft",
    "Synology",
    "QNAP",
    "Fortinet",
    "Lenovo",
    "Canon",
  ]

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Our Services", href: "/services" },
    { name: "Shopping", href: "/products" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Quote Request", href: "/quote-request" },
  ]

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61576075276143&mibextid=ZbWKwL",
      icon: Facebook,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/famositconsultancy?igsh=MXdtZG9sbGQ1aDVz",
      icon: Instagram,
    },
    {
      name: "X (Twitter)",
      href: "https://x.com/famosits?s=11",
      icon: X,
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@FamosConsultancyandITSolutions",
      icon: Youtube,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/famos-consultancy-and-it-solutions-ltd/",
      icon: Linkedin,
    },
  ]

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Our Office */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Our Office</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>Lagos, Nigeria</p>
                  <p className="text-sm">West Africa</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>0814 531 9706</p>
                  {/* <p>0706 650 0878</p> */}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm break-all">info@famousitsolutionltd.com</p>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>Mon - Fri: 8:00 AM - 5:00 PM</p>
                  <p className="text-sm">Weekend: By Appointment</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>WhatsApp: 0814 531 9706</p>
                  <p className="text-sm">24/7 Support Available</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-3">
              <h4 className="font-medium text-white">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-800 hover:bg-blue-600 rounded-lg transition-colors duration-200"
                      aria-label={social.name}
                    >
                      <IconComponent className="h-4 w-4" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Partners */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Our Partners</h3>
            <div className="space-y-2">
              {partners.map((partner, index) => (
                <div key={index} className="text-gray-300 hover:text-white transition-colors duration-200">
                  {partner}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Newsletter</h3>
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                Subscribe to our newsletter to stay informed about new developments, policies, projects, and
                achievements. It supports continuous learning, keeps you aligned with company goals, and enhances your
                ability to contribute effectively by staying connected to the organization's evolving knowledge and
                priorities.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-400 focus:border-blue-400"
                />
                <Button
                  type="submit"
                  disabled={isSubscribing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isSubscribing ? "Subscribing..." : "Sign Up"}
                </Button>
              </form>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <img src="/src/assets/logo.png" alt="FAMOS IT Solutions" className="h-8 w-auto" />
            <div>
              <p className="text-white font-semibold">FAMOS IT Solutions Limited</p>
              <p className="text-gray-400 text-sm">Enterprise Technology Partners</p>
            </div>
          </div>

          <div className="text-center md:text-right space-y-2">
            <p className="text-gray-400 text-sm">© 2025 FAMOS IT Solutions Limited. All Rights Reserved.</p>
            <p className="text-gray-500 text-xs">Empowering Business Through Technology</p>
            <div className="flex items-center justify-center md:justify-end space-x-1 text-xs text-gray-500">
              <span>Developed by</span>
              <a
                href="https://nexatrux.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center space-x-1"
              >
                <span>Nexa Trux</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
