import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cloud, CloudRain, Sun, Wind, Droplets, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Meteo = () => {
  const [region, setRegion] = useState("cotonou");
  
  // Données météo simulées (dans une vraie app, utiliser une API météo)
  const weatherData = {
    temperature: 28,
    humidity: 75,
    wind: 12,
    condition: "Partiellement nuageux",
    precipitation: 40,
  };

  const alerts = [
    {
      type: "warning",
      title: "Alerte pluie",
      message: "Fortes pluies prévues dans les 48h. Protégez vos cultures sensibles.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Suivi Météorologique</h1>
            <p className="text-xl text-muted-foreground">
              Prévisions en temps réel pour optimiser vos activités agricoles
            </p>
          </div>

          <div className="mb-6">
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="max-w-xs">
                <SelectValue placeholder="Sélectionnez votre région" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cotonou">Cotonou</SelectItem>
                <SelectItem value="parakou">Parakou</SelectItem>
                <SelectItem value="porto-novo">Porto-Novo</SelectItem>
                <SelectItem value="abomey">Abomey</SelectItem>
                <SelectItem value="natitingou">Natitingou</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Alertes */}
          {alerts.map((alert, index) => (
            <Alert key={index} className="mb-6 border-amber-500 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-900">{alert.title}</AlertTitle>
              <AlertDescription className="text-amber-800">
                {alert.message}
              </AlertDescription>
            </Alert>
          ))}

          {/* Conditions actuelles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Température</p>
                    <p className="text-3xl font-bold text-foreground">{weatherData.temperature}°C</p>
                  </div>
                  <Sun className="h-10 w-10 text-amber-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Humidité</p>
                    <p className="text-3xl font-bold text-foreground">{weatherData.humidity}%</p>
                  </div>
                  <Droplets className="h-10 w-10 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Vent</p>
                    <p className="text-3xl font-bold text-foreground">{weatherData.wind} km/h</p>
                  </div>
                  <Wind className="h-10 w-10 text-gray-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Précipitations</p>
                    <p className="text-3xl font-bold text-foreground">{weatherData.precipitation}%</p>
                  </div>
                  <CloudRain className="h-10 w-10 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prévisions sur 7 jours */}
          <Card>
            <CardHeader>
              <CardTitle>Prévisions sur 7 jours</CardTitle>
              <CardDescription>Planifiez vos activités agricoles en conséquence</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(7)].map((_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() + i);
                  return (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                      <div className="flex items-center gap-4">
                        <div className="text-sm font-medium w-20">
                          {date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })}
                        </div>
                        <Cloud className="h-6 w-6 text-gray-500" />
                        <div className="text-sm text-muted-foreground">
                          {weatherData.condition}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">
                          <Droplets className="inline h-4 w-4 mr-1" />
                          {Math.floor(Math.random() * 60 + 20)}%
                        </div>
                        <div className="text-sm font-medium">
                          {Math.floor(Math.random() * 5 + 25)}° / {Math.floor(Math.random() * 5 + 30)}°
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Meteo;
