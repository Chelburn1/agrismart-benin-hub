import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Video, FileText, Download, Sparkles, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Blog = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [contentType, setContentType] = useState("article");
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleGenerateContent = async () => {
    if (!newTopic.trim()) {
      toast.error("Veuillez entrer un sujet");
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-blog-content", {
        body: { topic: newTopic, type: contentType },
      });

      if (error) throw error;

      setGeneratedContent(data.content);
      toast.success("Contenu généré avec succès !");
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Erreur lors de la génération du contenu");
    } finally {
      setIsGenerating(false);
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

          {/* AI Content Generator */}
          <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle>Générateur de Contenu IA</CardTitle>
              </div>
              <CardDescription>
                Créez automatiquement des articles, vidéos et guides avec l'intelligence artificielle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-[1fr,200px,auto] gap-3">
                <Input
                  placeholder="Ex: Techniques de compostage naturel"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleGenerateContent()}
                />
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="video">Vidéo</SelectItem>
                    <SelectItem value="pdf">Guide PDF</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={handleGenerateContent}
                      disabled={isGenerating || !newTopic.trim()}
                      className="gap-2"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Génération...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          Générer
                        </>
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Contenu Généré par IA</DialogTitle>
                      <DialogDescription>
                        Voici le contenu généré sur le sujet : {newTopic}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-wrap bg-muted p-4 rounded-lg">
                        {generatedContent || "Le contenu apparaîtra ici..."}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

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
