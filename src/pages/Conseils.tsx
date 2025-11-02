import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const Conseils = () => {
  const [loading, setLoading] = useState(false);
  const [culture, setCulture] = useState("");
  const [region, setRegion] = useState("");
  const [sol, setSol] = useState("");
  const [recommendations, setRecommendations] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!culture || !region || !sol) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);
    setRecommendations("");

    try {
      const { data, error } = await supabase.functions.invoke("agricultural-advice", {
        body: { culture, region, sol },
      });

      if (error) throw error;

      setRecommendations(data.recommendations);
      toast.success("Recommandations générées avec succès !");
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de la génération des recommandations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Conseils Agricoles Personnalisés</h1>
            <p className="text-xl text-muted-foreground">
              Obtenez des recommandations adaptées à vos besoins spécifiques
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Informations de culture
                </CardTitle>
                <CardDescription>
                  Remplissez les informations pour obtenir des conseils personnalisés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="culture">Type de culture</Label>
                    <Input
                      id="culture"
                      placeholder="Ex: Maïs, Tomate, Manioc..."
                      value={culture}
                      onChange={(e) => setCulture(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="region">Région</Label>
                    <Select value={region} onValueChange={setRegion}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre région" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alibori">Alibori</SelectItem>
                        <SelectItem value="atacora">Atacora</SelectItem>
                        <SelectItem value="atlantique">Atlantique</SelectItem>
                        <SelectItem value="borgou">Borgou</SelectItem>
                        <SelectItem value="collines">Collines</SelectItem>
                        <SelectItem value="couffo">Couffo</SelectItem>
                        <SelectItem value="donga">Donga</SelectItem>
                        <SelectItem value="littoral">Littoral</SelectItem>
                        <SelectItem value="mono">Mono</SelectItem>
                        <SelectItem value="oueme">Ouémé</SelectItem>
                        <SelectItem value="plateau">Plateau</SelectItem>
                        <SelectItem value="zou">Zou</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sol">Type de sol</Label>
                    <Select value={sol} onValueChange={setSol}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le type de sol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="argileux">Argileux</SelectItem>
                        <SelectItem value="sableux">Sableux</SelectItem>
                        <SelectItem value="limoneux">Limoneux</SelectItem>
                        <SelectItem value="lateritique">Latéritique</SelectItem>
                        <SelectItem value="humifere">Humifère</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Génération en cours...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Obtenir des conseils
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className={recommendations ? "border-primary shadow-lg" : ""}>
              <CardHeader>
                <CardTitle>Recommandations</CardTitle>
                <CardDescription>
                  Conseils personnalisés basés sur vos informations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recommendations ? (
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-foreground">{recommendations}</div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Les recommandations apparaîtront ici</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Conseils;
