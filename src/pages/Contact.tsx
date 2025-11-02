import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, Send, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const faqs = [
    {
      question: "Comment obtenir des conseils agricoles personnalisés ?",
      answer: "Rendez-vous sur la page 'Conseils Agricoles' et remplissez le formulaire avec vos informations (type de culture, région, type de sol). Notre IA vous fournira des recommandations adaptées à votre situation.",
    },
    {
      question: "Les prévisions météo sont-elles précises ?",
      answer: "Nos prévisions météo sont basées sur des données fiables et mises à jour en temps réel. Elles sont spécialement adaptées aux besoins agricoles avec des alertes pour protéger vos cultures.",
    },
    {
      question: "Comment fonctionne la détection de maladies ?",
      answer: "Prenez simplement une photo claire de votre plante malade et téléchargez-la sur notre plateforme. Notre IA analysera l'image et identifiera la maladie avec des recommandations de traitement.",
    },
    {
      question: "Le service est-il gratuit ?",
      answer: "AgriSmart Bénin offre un accès gratuit à la plupart de ses fonctionnalités de base. Des services premium avec des analyses plus approfondies sont disponibles sur abonnement.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.");
  };

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;

    const newMessage = { role: "user", content: chatInput };
    setChatMessages([...chatMessages, newMessage]);
    setChatInput("");
    setChatLoading(true);

    // Simulation de réponse du chatbot
    setTimeout(() => {
      const botResponse = {
        role: "assistant",
        content: "Merci pour votre question ! Je suis là pour vous aider avec toutes vos questions sur l'agriculture. Pour des réponses plus détaillées, n'hésitez pas à utiliser nos outils spécialisés ou à nous contacter directement.",
      };
      setChatMessages((prev) => [...prev, botResponse]);
      setChatLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Contact & Support</h1>
            <p className="text-xl text-muted-foreground">
              Nous sommes là pour vous aider
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Formulaire de Contact
                </CardTitle>
                <CardDescription>
                  Envoyez-nous un message et nous vous répondrons rapidement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input id="name" placeholder="Votre nom" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="votre@email.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" type="tel" placeholder="+229 XX XX XX XX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Votre message..." rows={4} required />
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Envoyer
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Chatbot */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Chatbot d'Assistance
                </CardTitle>
                <CardDescription>
                  Posez vos questions et obtenez des réponses instantanées
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-64 overflow-y-auto border rounded-lg p-4 space-y-3 bg-secondary/20">
                    {chatMessages.length === 0 ? (
                      <div className="text-center text-muted-foreground py-12">
                        <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Commencez la conversation</p>
                      </div>
                    ) : (
                      chatMessages.map((msg, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg ${
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground ml-auto max-w-[80%]"
                              : "bg-secondary max-w-[80%]"
                          }`}
                        >
                          {msg.content}
                        </div>
                      ))
                    )}
                    {chatLoading && (
                      <div className="bg-secondary p-3 rounded-lg max-w-[80%]">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce delay-100" />
                          <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce delay-200" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Posez votre question..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleChatSend()}
                    />
                    <Button onClick={handleChatSend} disabled={chatLoading || !chatInput.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Nos Coordonnées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Téléphone</p>
                    <p className="text-sm text-muted-foreground">+229 XX XX XX XX</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">contact@agrismart.bj</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Adresse</p>
                    <p className="text-sm text-muted-foreground">Cotonou, Bénin</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle>Questions Fréquentes</CardTitle>
              <CardDescription>
                Trouvez rapidement des réponses à vos questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
