import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Building, Users, Laptop, Server } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      title: "Laptop Supply for Palmer Technologies",
      description: "Famos Consultancy and IT Solutions successfully completed the supply and delivery of 100+ HP laptops to Palmer Technologies as part of their hardware upgrade initiative. The devices were sourced, quality-checked, and delivered in line with the client's specifications and deployment schedule.",
      icon: Laptop,
      client: "Palmer Technologies"
    },
    {
      title: "Enterprise IT Hardware Supply for Brown Acres",
      description: "Famos Consultancy and IT Solutions successfully completed the supply and delivery of critical enterprise hardware to Brown Acres to enhance their core infrastructure and communication systems. The project involved the provision of an HPE ProLiant DL380 server, Aruba enterprise-grade switches, and VoIP communication equipment.",
      icon: Server,
      client: "Brown Acres"
    },
    {
      title: "IT and Multimedia Equipment for Mysterious Empire",
      description: "Famos Consultancy and IT Solutions successfully completed the supply and nationwide delivery of multimedia and IT hardware to Mysterious Empire, a fast-growing media and content production company based in Owerri, Imo State. The project involved the procurement of 17 Canon digital cameras and 14 Dell Latitude laptops.",
      icon: Building,
      client: "Mysterious Empire"
    },
    {
      title: "Network Storage & Connectivity Equipment for Legit Job Partners",
      description: "Famos Consultancy and IT Solutions successfully completed the supply of critical IT infrastructure components to Legit Job Partners, supporting their data storage, network connectivity, and internal operations. The delivery included a Synology tower storage unit, Ubiquiti routers, and high-performance CAT 6 network cables.",
      icon: Users,
      client: "Legit Job Partners"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
            Our Work
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Completed Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Showcasing successful IT solutions delivered to our valued clients
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-all">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm font-medium text-green-600">Completed Project</span>
                      </div>
                      <h3 className="font-semibold mb-2">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {project.description}
                      </p>
                      <div className="text-sm">
                        <span className="font-medium text-primary">Client: {project.client}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;