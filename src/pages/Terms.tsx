"use client"

import Layout from "@/components/layout/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Shield, CreditCard, Truck, RotateCcw, Scale, Clock, AlertTriangle } from "lucide-react"

const Terms = () => {
  const termsData = [
    {
      icon: FileText,
      title: "Introduction",
      content:
        "These Terms and Conditions govern all sales, services, and interactions between Famos IT Solutions and her clients. By engaging with our services or purchasing products from Famos IT, you agree to be bound by these Terms.",
    },
    {
      icon: Shield,
      title: "Services Provided",
      content:
        "Famos IT offers a range of IT solutions including procurement of hardware and software, managed services, technical support, and logistics. The scope and details of each service will be outlined in separate agreements or proposals.",
    },
    {
      icon: CreditCard,
      title: "Pricing and Payment",
      content:
        "All prices are provided in advance through quotations or service agreements and are subject to change without prior notice unless otherwise specified. Payment terms will be specified in individual contracts. Late payments may incur interest or service suspension.",
    },
    {
      icon: FileText,
      title: "Quotations and Orders",
      content:
        "Quotations are valid for 5 days unless otherwise specified. Orders must be confirmed in writing and are subject to availability. Famos IT reserves the right to decline any order at its discretion.",
    },
    {
      icon: Truck,
      title: "Delivery and Logistics",
      content:
        "Famos IT will make every reasonable effort to deliver products and services within the agreed timeframe. However, delivery times are estimates and not guaranteed. Delays due to third-party suppliers or factors beyond our control are not the responsibility of Famos IT.",
    },
    {
      icon: Shield,
      title: "Warranty",
      content:
        "All hardware and software sold are covered by the manufacturer's warranty. Famos IT does not provide separate warranties unless explicitly stated in writing. Warranty claims are subject to the terms set by the product manufacturer.",
    },
    {
      icon: AlertTriangle,
      title: "Limitation of Liability",
      content:
        "Famos IT is not liable for any indirect, incidental, or consequential damages arising from the use of its products or services. Our total liability shall not exceed the amount paid by the customer for the product or service giving rise to the claim.",
    },
    {
      icon: FileText,
      title: "Intellectual Property",
      content:
        "All content, documentation, and tools provided by Famos IT remain the intellectual property of Famos IT unless otherwise agreed in writing. Clients may not reproduce, distribute, or misuse any proprietary materials.",
    },
    {
      icon: Shield,
      title: "Confidentiality",
      content:
        "Both parties agree to keep all confidential information, including client data and proprietary methods, strictly confidential and not to disclose it to any third party without prior written consent, except as required by law.",
    },
    {
      icon: Scale,
      title: "Governing Law",
      content:
        "These Terms shall be governed by and construed in accordance with the laws of Nigeria, and any disputes shall be resolved under the exclusive jurisdiction of the courts of Nigeria.",
    },
  ]

  const returnPolicyData = [
    {
      icon: RotateCcw,
      title: "Eligibility",
      content:
        "Returns are accepted for defective or incorrectly delivered hardware and software products. All return requests must be made within 7 business days of receiving the item.",
    },
    {
      icon: FileText,
      title: "Conditions for Return",
      content:
        "• The product must be in its original condition and packaging.\n• Software must be unopened and unused.\n• Proof of purchase is required.\n• Custom-configured or special-order items are non-returnable unless defective.",
    },
    {
      icon: Truck,
      title: "Return Process",
      content:
        "To initiate a return, contact Famos IT support at 08145319706 or email info@famousitsolutionltd.com with your order number, item details, and reason for return. Once approved, we will provide instructions for return shipping. The customer is responsible for return shipping costs unless the return is due to an error on our part.",
    },
    {
      icon: CreditCard,
      title: "Refunds",
      content:
        "Once the returned item is received and inspected, we will notify you of the approval or rejection of your refund. Approved refunds will be processed within 7–10 business days using the original method of payment.",
    },
    {
      icon: AlertTriangle,
      title: "Non-Returnable Services",
      content:
        "Professional services, digital software licenses, and service hours already rendered are non-returnable and non-refundable.",
    },
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center bg-white/10 text-white px-3 py-1 rounded-full text-sm font-medium mb-6">
              📋 Legal Information
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms & Conditions</h1>
            <p className="text-xl text-white/80">
              Please read these terms and conditions carefully before using our services or purchasing our products.
            </p>
          </div>
        </div>
      </section>

      <div className="container px-4 py-16">
        {/* Last Updated */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="text-primary border-primary">
            <Clock className="mr-2 h-3 w-3" />
            Last Updated: January 2025
          </Badge>
        </div>

        {/* Terms and Conditions */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Terms and Conditions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These terms govern your relationship with FAMOS IT Solutions Limited and outline the rights and
              responsibilities of both parties.
            </p>
          </div>

          <div className="grid gap-6">
            {termsData.map((term, index) => {
              const IconComponent = term.icon
              return (
                <Card key={index} className="border-primary/20">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl">
                        {index + 1}. {term.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{term.content}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        <Separator className="my-16" />

        {/* Return and Refund Policy */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Return and Refund Policy</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our return and refund policy ensures fair treatment for both our customers and our business operations.
            </p>
          </div>

          <div className="grid gap-6">
            {returnPolicyData.map((policy, index) => {
              const IconComponent = policy.icon
              return (
                <Card key={index} className="border-primary/20">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl">
                        {index + 1}. {policy.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{policy.content}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Contact Information */}
        <section className="mt-16">
          <Card className="bg-gradient-hero text-white border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Questions About Our Terms?</h3>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                If you have any questions about these Terms and Conditions or our Return and Refund Policy, please don't
                hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Email: info@famousitsolutionltd.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Phone: 0814 531 9706</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  )
}

export default Terms
