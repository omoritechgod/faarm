"use client"

import type React from "react"

import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, FileText, LogOut, Menu, X } from 'lucide-react'
import { toast } from "sonner"

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const navigation = [
    { name: "Dashboard", href: "/admin-portal", icon: LayoutDashboard },
    { name: "Products", href: "/admin-portal/products", icon: Package },
    { name: "Quote Requests", href: "/admin-portal/quotes", icon: FileText },
  ]

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    toast.success("Logged out successfully")
    navigate("/admin-portal/login")
  }

  const isActive = (path: string) => {
    if (path === "/admin-portal") {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  // Safe parsing of admin user data
  const getAdminUser = () => {
    try {
      const adminUserData = localStorage.getItem("adminUser")
      if (adminUserData) {
        return JSON.parse(adminUserData)
      }
      return { name: "Admin" }
    } catch (error) {
      console.error("Error parsing admin user data:", error)
      return { name: "Admin" }
    }
  }

  const adminUser = getAdminUser()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <img src="/src/assets/logo.png" alt="FAMOS" className="h-8 w-auto" />
              <span className="font-bold">Admin Portal</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const IconComponent = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.href) ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
          <div className="absolute bottom-4 left-4 right-4">
            <Button variant="outline" className="w-full bg-transparent" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r shadow-sm">
          <div className="flex items-center px-4 py-6 border-b">
            <img src="/src/assets/logo.png" alt="FAMOS" className="h-8 w-auto mr-3" />
            <div>
              <h1 className="font-bold text-lg text-primary">FAMOS</h1>
              <p className="text-xs text-muted-foreground">Admin Portal</p>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const IconComponent = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.href) ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t">
            <Button variant="outline" className="w-full bg-transparent" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
          <div className="flex items-center justify-between px-4 py-4">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Welcome back, {adminUser.name}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
