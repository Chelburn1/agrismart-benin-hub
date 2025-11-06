import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, RefreshCw, Loader2, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  type: string;
  category: string;
  created_at: string;
}

const Blog = () => {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  // Charger les articles depuis la base de données
  const loadArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error loading articles:', error);
      toast.error('Erreur lors du chargement des articles');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  // Générer automatiquement de nouveaux articles
  const handleAutoGenerate = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('auto-generate-blog', {
        body: { count: 3 },
      });

      if (error) throw error;

      toast.success(`${data.count} nouveaux articles générés avec succès !`);
      await loadArticles(); // Recharger les articles
    } catch (error) {
      console.error('Error generating articles:', error);
      toast.error('Erreur lors de la génération des articles');
    } finally {
      setIsGenerating(false);
    }
  };

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Blog & Tutoriels</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Contenu généré automatiquement par IA pour les agriculteurs béninois
            </p>
            <Button
              onClick={handleAutoGenerate}
              disabled={isGenerating}
              size="lg"
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <RefreshCw className="h-5 w-5" />
                  Générer de nouveaux articles
                </>
              )}
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : articles.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Aucun article disponible</h3>
                <p className="text-muted-foreground mb-4">
                  Cliquez sur le bouton ci-dessus pour générer vos premiers articles automatiquement
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <Card key={article.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 text-primary">
                        {getIcon(article.type)}
                        <span className="text-xs uppercase font-semibold">
                          {article.type === "video" ? "Vidéo" : article.type === "pdf" ? "PDF" : "Article"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(article.created_at)}
                      </div>
                    </div>
                    <div className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full mb-2">
                      {article.category}
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription>{article.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Lire l'article
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

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
