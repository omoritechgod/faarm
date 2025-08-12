"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail } from "lucide-react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Shopping", href: "/products" },
    { name: "Contact", href: "/contact" },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2">
        <div className="container px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>0814 531 9706</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@famousitsolutionltd.com</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>Enterprise IT Solutions & Logistics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
          <img src="/logo1.png" alt="FAMOS IT Solutions" className="h-19 w-20" />
            {/* <div>
              <h1 className="text-xl font-bold text-primary">FAMOS</h1>
              <p className="text-xs text-muted-foreground">IT Solutions</p>
            </div> */}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href) ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/quote-request">
              <Button className="bg-gradient-primary hover:opacity-90">Get Quote</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/quote-request" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-gradient-primary hover:opacity-90">Get Quote</Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
