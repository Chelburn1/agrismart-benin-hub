import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sprout, Cloud, Bug, BarChart3, BookOpen, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-agrismart.jpg";

const Index = () => {
  const services = [
    {
      icon: Sprout,
      title: "Conseils Agricoles",
      description: "Recommandations personnalisées basées sur l'IA pour vos cultures",
      link: "/conseils",
    },
    {
      icon: Cloud,
      title: "Suivi Météo",
      description: "Prévisions météo en temps réel et alertes pour votre région",
      link: "/meteo",
    },
    {
      icon: Bug,
      title: "Détection de Maladies",
      description: "Identifiez les maladies de vos plantes par simple photo",
      link: "/maladies",
    },
    {
      icon: BarChart3,
      title: "Dashboard de Rendement",
      description: "Analysez et optimisez votre production agricole",
      link: "/dashboard",
    },
    {
      icon: BookOpen,
      title: "Blog & Tutoriels",
      description: "Ressources éducatives et guides pratiques",
      link: "/blog",
    },
    {
      icon: MessageCircle,
      title: "Support & FAQ",
      description: "Assistance rapide avec notre chatbot intelligent",
      link: "/contact",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Agriculture moderne au Bénin" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
        </div>
        
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            AgriSmart Bénin
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Transformez votre agriculture avec l'intelligence artificielle
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Link to="/conseils">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
                Commencer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/blog">
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20 backdrop-blur-sm">
                En savoir plus
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Nos Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Des outils intelligents pour une agriculture plus productive et durable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50"
            >
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Link to={service.link}>
                  <Button variant="link" className="p-0 h-auto text-primary group-hover:gap-2 transition-all">
                    Découvrir
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary-glow text-white py-20">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">Prêt à améliorer votre production ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez des milliers d'agriculteurs qui utilisent déjà AgriSmart
          </p>
          <Link to="/conseils">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl">
              Obtenir des conseils maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
