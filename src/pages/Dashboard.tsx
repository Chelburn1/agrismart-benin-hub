import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, DollarSign, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const [productionData, setProductionData] = useState([
    { mois: "Jan", production: 240, revenus: 12000 },
    { mois: "Fév", production: 280, revenus: 14000 },
    { mois: "Mar", production: 320, revenus: 16000 },
    { mois: "Avr", production: 300, revenus: 15000 },
    { mois: "Mai", production: 350, revenus: 17500 },
    { mois: "Jun", production: 380, revenus: 19000 },
  ]);

  const stats = {
    totalProduction: productionData.reduce((acc, curr) => acc + curr.production, 0),
    totalRevenus: productionData.reduce((acc, curr) => acc + curr.revenus, 0),
    moyenne: Math.round(productionData.reduce((acc, curr) => acc + curr.production, 0) / productionData.length),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Dashboard de Rendement</h1>
            <p className="text-xl text-muted-foreground">
              Suivez et analysez vos performances agricoles
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Production Totale</p>
                    <p className="text-3xl font-bold text-foreground">{stats.totalProduction}</p>
                    <p className="text-xs text-muted-foreground">tonnes</p>
                  </div>
                  <Package className="h-12 w-12 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Revenus Totaux</p>
                    <p className="text-3xl font-bold text-foreground">{stats.totalRevenus.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">FCFA</p>
                  </div>
                  <DollarSign className="h-12 w-12 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Moyenne Mensuelle</p>
                    <p className="text-3xl font-bold text-foreground">{stats.moyenne}</p>
                    <p className="text-xs text-muted-foreground">tonnes/mois</p>
                  </div>
                  <TrendingUp className="h-12 w-12 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Production Mensuelle</CardTitle>
                <CardDescription>Évolution de la production en tonnes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={productionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="production" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenus Mensuels</CardTitle>
                <CardDescription>Évolution des revenus en FCFA</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={productionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenus" stroke="hsl(var(--accent))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Enregistrer une nouvelle production</CardTitle>
              <CardDescription>
                Ajoutez vos données de production pour mettre à jour vos statistiques
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mois">Mois</Label>
                  <Input id="mois" type="text" placeholder="Ex: Juillet" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="production">Production (tonnes)</Label>
                  <Input id="production" type="number" placeholder="Ex: 350" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="revenus">Revenus (FCFA)</Label>
                  <Input id="revenus" type="number" placeholder="Ex: 17500" />
                </div>
                <Button type="submit" className="md:col-span-3">
                  Enregistrer les données
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
