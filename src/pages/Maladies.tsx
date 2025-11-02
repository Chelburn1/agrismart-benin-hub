import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Loader2, Camera } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const Maladies = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) {
      toast.error("Veuillez d'abord télécharger une image");
      return;
    }

    setLoading(true);
    setDiagnosis("");

    try {
      const { data, error } = await supabase.functions.invoke("disease-detection", {
        body: { image },
      });

      if (error) throw error;

      setDiagnosis(data.diagnosis);
      toast.success("Analyse terminée avec succès !");
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de l'analyse de l'image");
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
            <h1 className="text-4xl font-bold mb-4 text-foreground">Détection de Maladies</h1>
            <p className="text-xl text-muted-foreground">
              Identifiez les maladies de vos plantes grâce à l'intelligence artificielle
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-primary" />
                  Télécharger une photo
                </CardTitle>
                <CardDescription>
                  Prenez une photo claire de la plante malade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {image ? (
                    <div className="relative">
                      <img 
                        src={image} 
                        alt="Plante à analyser" 
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setImage(null);
                          setDiagnosis("");
                        }}
                      >
                        Changer
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                      <span className="text-sm text-muted-foreground">
                        Cliquez pour télécharger une image
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}

                  <Button 
                    onClick={handleAnalyze} 
                    className="w-full" 
                    disabled={loading || !image}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyse en cours...
                      </>
                    ) : (
                      <>
                        <Camera className="mr-2 h-4 w-4" />
                        Analyser la plante
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className={diagnosis ? "border-primary shadow-lg" : ""}>
              <CardHeader>
                <CardTitle>Diagnostic</CardTitle>
                <CardDescription>
                  Résultats de l'analyse et recommandations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {diagnosis ? (
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-foreground">{diagnosis}</div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Le diagnostic apparaîtra ici</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 bg-secondary/30">
            <CardHeader>
              <CardTitle>Conseils pour de meilleurs résultats</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Prenez des photos en pleine lumière naturelle</li>
                <li>✓ Assurez-vous que les symptômes sont clairement visibles</li>
                <li>✓ Photographiez les feuilles, tiges ou fruits affectés de près</li>
                <li>✓ Évitez les photos floues ou trop sombres</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Maladies;
