import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Eghelesiri Paul",
      company: "Palmer Technologies",
      testimonial: "Famos IT Solutions doesn't just deliver products — they deliver solutions. Their ability to tailor services to our specific needs has been a game changer for us."
    },
    {
      name: "Peace Ojoko",
      company: "Brown Acres",
      testimonial: "The procurement process with Famos is smooth, transparent, and efficient. They sourced all the hardware we needed, on time and within budget. A reliable partner through and through."
    },
    {
      name: "Miracle Azubuike",
      company: "Mysterious Empire",
      testimonial: "It's rare to find a partner that understands both technology and logistics so well. Famos ensures our equipment reaches the right place at the right time, every time."
    },
    {
      name: "Favour Benjamin",
      company: "Legit Jobs Partners",
      testimonial: "As a recruitment firm, we needed reliable office hardware fast. Famos IT Solutions delivered storage devices, routers, and networking devices within just 72 hours. Everything was properly configured and plug-and-play ready. Their team understood our needs and worked within our budget. We're very satisfied and would highly recommend them to any SME."
    }
  ];

  return (
    <section className="py-16 bg-muted/50">
      <div className="container px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real feedback from satisfied clients who trust Famos IT Solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Quote className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.testimonial}"
                    </p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-primary">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;