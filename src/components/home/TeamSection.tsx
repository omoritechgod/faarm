import { Card, CardContent } from '@/components/ui/card';
import team1 from '@/assets/team-1.jpg';
import team2 from '@/assets/team-2.jpg';
import team3 from '@/assets/team-3.jpg';

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Gbadebo Kadiri",
      image: team1
    },
    {
      name: "David Clement", 
      image: team2
    },
    {
      name: "Songo Anabrabra",
      image: team3
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
            Our Team
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Exclusive Team
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet the dedicated professionals behind Famos IT Solutions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;