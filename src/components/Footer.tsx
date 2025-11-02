import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">AgriSmart Bénin</h3>
            <p className="text-sm text-muted-foreground">
              Votre partenaire technologique pour une agriculture moderne et durable au Bénin.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/conseils" className="text-muted-foreground hover:text-primary transition-colors">
                  Conseils Agricoles
                </Link>
              </li>
              <li>
                <Link to="/meteo" className="text-muted-foreground hover:text-primary transition-colors">
                  Suivi Météo
                </Link>
              </li>
              <li>
                <Link to="/maladies" className="text-muted-foreground hover:text-primary transition-colors">
                  Détection Maladies
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog & Tutoriels
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +229 66 00 00 00
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                agrinova66@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Cotonou, Bénin
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Suivez-nous</h3>
            <div className="flex gap-3">
              <a href="#" className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 AgriSmart Bénin. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
