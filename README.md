# AgriSmart Bénin

Site web AgriTech moderne pour l'agriculture au Bénin, propulsé par l'intelligence artificielle.

## 🌾 Fonctionnalités

- **Conseils Agricoles Personnalisés** : Recommandations IA basées sur votre culture, région et type de sol
- **Suivi Météorologique** : Prévisions en temps réel et alertes pour protéger vos cultures
- **Détection de Maladies** : Identifiez les maladies des plantes par analyse d'image IA
- **Dashboard de Rendement** : Visualisez et analysez vos performances agricoles
- **Blog & Tutoriels** : Ressources éducatives pour améliorer vos pratiques
- **Support Client** : Formulaire de contact et chatbot intelligent

## 🚀 Technologies Utilisées

- **Frontend** : React 18 + TypeScript + Vite
- **Styling** : Tailwind CSS + shadcn/ui
- **Backend** : Lovable Cloud (Supabase)
- **IA** : Lovable AI Gateway (Google Gemini)
- **Graphiques** : Recharts
- **Routing** : React Router v6

## 📦 Installation Locale

### Prérequis
- Node.js 18+ et npm

### Étapes

1. **Cloner le projet**
```bash
git clone <YOUR_GIT_URL>
cd agrismart-benin
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

Le site sera accessible sur `http://localhost:8080`

## 🌐 Déploiement

### Déploiement sur Lovable (Recommandé)

1. Ouvrez votre projet sur [Lovable](https://lovable.dev)
2. Cliquez sur le bouton "Publish" en haut à droite
3. Votre site sera déployé automatiquement

### Déploiement sur Netlify

1. **Via l'interface Netlify**
   - Connectez votre dépôt GitHub à Netlify
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Via la CLI Netlify**
```bash
# Installer la CLI Netlify
npm install -g netlify-cli

# Se connecter
netlify login

# Déployer
netlify deploy --prod
```

### Variables d'Environnement

Les variables suivantes sont gérées automatiquement par Lovable Cloud :
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `LOVABLE_API_KEY`

Pour un déploiement externe, créez un fichier `.env` avec ces variables.

## 🎨 Personnalisation du Design

Le système de design est défini dans :
- `src/index.css` : Variables CSS et tokens de couleur
- `tailwind.config.ts` : Configuration Tailwind

Couleurs principales :
- **Primary** : Vert agricole (`hsl(142 70% 35%)`)
- **Secondary** : Tons terre (`hsl(30 40% 92%)`)
- **Accent** : Bleu ciel (`hsl(200 75% 55%)`)

## 📱 Pages du Site

1. **/** - Page d'accueil
2. **/conseils** - Conseils agricoles IA
3. **/meteo** - Suivi météo
4. **/maladies** - Détection de maladies
5. **/dashboard** - Dashboard de rendement
6. **/blog** - Blog et tutoriels
7. **/contact** - Contact et FAQ

## 🔧 Scripts Disponibles

```bash
npm run dev          # Démarre le serveur de développement
npm run build        # Build pour la production
npm run preview      # Prévisualise le build de production
npm run lint         # Vérifie le code avec ESLint
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

Ce projet est sous licence MIT.

## 🌍 Contact

- **Email** : contact@agrismart.bj
- **Téléphone** : +229 XX XX XX XX
- **Adresse** : Cotonou, Bénin

---

Développé avec ❤️ pour les agriculteurs du Bénin
