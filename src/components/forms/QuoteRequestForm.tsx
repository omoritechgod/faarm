import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface QuoteFormData {
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  products: string;
  services: string;
  projectDescription: string;
}

const QuoteRequestForm = () => {
  const [formData, setFormData] = useState<QuoteFormData>({
    clientName: '',
    companyName: '',
    email: '',
    phone: '',
    products: '',
    services: '',
    projectDescription: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create mailto link for quote request
      const mailtoLink = `mailto:info@famousitsolutionltd.com?subject=Quote Request from ${formData.clientName}&body=${encodeURIComponent(
        `QUOTE REQUEST\n\nClient Name: ${formData.clientName}\nCompany Name: ${formData.companyName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nProducts of Interest:\n${formData.products}\n\nServices of Interest:\n${formData.services}\n\nProject Description:\n${formData.projectDescription}`
      )}`;
      
      window.location.href = mailtoLink;
      
      toast.success('Email client opened with your quote request. Please send the email to complete your request.');
      
      // Reset form
      setFormData({
        clientName: '',
        companyName: '',
        email: '',
        phone: '',
        products: '',
        services: '',
        projectDescription: ''
      });
    } catch (error) {
      toast.error('Failed to open email client. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">REQUEST FOR A QUOTE</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                type="text"
                name="clientName"
                placeholder="Client Name *"
                value={formData.clientName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Input
                type="text"
                name="companyName"
                placeholder="Company Name (Optional)"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div>
            <Textarea
              name="products"
              placeholder="Product(s) of Interest"
              rows={3}
              value={formData.products}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <Textarea
              name="services"
              placeholder="Service(s) of Interest"
              rows={3}
              value={formData.services}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <Textarea
              name="projectDescription"
              placeholder="Project Description or Requirements"
              rows={4}
              value={formData.projectDescription}
              onChange={handleChange}
            />
          </div>
          
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
            {isSubmitting ? 'Sending Request...' : 'REQUEST FOR A QUOTE'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuoteRequestForm;