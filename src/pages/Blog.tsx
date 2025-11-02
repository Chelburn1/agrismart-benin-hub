import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Blog = () => {
  const articles = [
    {
      title: "Guide complet de la culture du maïs au Bénin",
      description: "Apprenez les meilleures pratiques pour maximiser votre rendement en maïs",
      type: "article",
      date: "15 Janvier 2025",
    },
    {
      title: "Techniques d'irrigation efficaces",
      description: "Optimisez l'utilisation de l'eau pour vos cultures",
      type: "video",
      date: "10 Janvier 2025",
    },
    {
      title: "Lutte biologique contre les parasites",
      description: "Méthodes naturelles pour protéger vos cultures",
      type: "article",
      date: "5 Janvier 2025",
    },
    {
      title: "Rotation des cultures : guide pratique",
      description: "Maintenez la fertilité de votre sol avec la rotation",
      type: "pdf",
      date: "1 Janvier 2025",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5" />;
      case "pdf":
        return <FileText className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Blog & Tutoriels</h1>
            <p className="text-xl text-muted-foreground">
              Ressources éducatives pour améliorer vos pratiques agricoles
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {articles.map((article, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 text-primary">
                      {getIcon(article.type)}
                      <span className="text-xs uppercase font-semibold">
                        {article.type === "video" ? "Vidéo" : article.type === "pdf" ? "PDF" : "Article"}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{article.date}</span>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {article.type === "pdf" ? (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Télécharger
                      </>
                    ) : (
                      <>
                        <BookOpen className="mr-2 h-4 w-4" />
                        Lire la suite
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Restez informé</CardTitle>
              <CardDescription>
                Inscrivez-vous à notre newsletter pour recevoir les derniers articles et tutoriels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="flex-1 px-4 py-2 rounded-lg border border-input bg-background"
                />
                <Button>S'inscrire</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
