import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.78.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Sujets pertinents pour les agriculteurs béninois
const topics = [
  { title: "Techniques modernes de culture du maïs", category: "Céréales", type: "article" },
  { title: "Gestion durable de l'eau en agriculture", category: "Irrigation", type: "article" },
  { title: "Lutte biologique contre les parasites du coton", category: "Protection", type: "article" },
  { title: "Optimisation de la culture du manioc", category: "Tubercules", type: "video" },
  { title: "Calendrier de plantation des cultures maraîchères", category: "Planification", type: "pdf" },
  { title: "Agriculture de conservation au Bénin", category: "Durabilité", type: "article" },
  { title: "Fertilisation naturelle des sols", category: "Sol", type: "article" },
  { title: "Culture de la tomate en saison sèche", category: "Maraîchage", type: "video" },
  { title: "Stockage et conservation des récoltes", category: "Post-récolte", type: "pdf" },
  { title: "Élevage associé aux cultures", category: "Agro-pastoralisme", type: "article" },
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { count = 3 } = await req.json().catch(() => ({ count: 3 }));
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!LOVABLE_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Required environment variables are not configured');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Sélectionner des sujets aléatoires
    const selectedTopics = topics
      .sort(() => Math.random() - 0.5)
      .slice(0, count);

    const generatedArticles = [];

    for (const topic of selectedTopics) {
      console.log(`Generating article for: ${topic.title}`);

      const systemPrompt = `Tu es un expert agricole spécialisé dans l'agriculture béninoise.
      Crée un article complet et professionnel en français pour le blog AgriSmart Bénin.
      L'article doit être:
      - Informatif et basé sur des pratiques agricoles éprouvées
      - Adapté au contexte climatique et économique du Bénin
      - Pratique avec des conseils actionnables
      - Bien structuré avec introduction, développement et conclusion
      - Environ 600-800 mots
      - Écrit dans un style accessible mais professionnel`;

      const userPrompt = `Écris un article complet sur: "${topic.title}"
      
      L'article doit couvrir:
      1. Introduction (pourquoi c'est important pour les agriculteurs béninois)
      2. Techniques et méthodes pratiques
      3. Calendrier ou timing optimal
      4. Conseils spécifiques au climat béninois
      5. Erreurs à éviter
      6. Bénéfices attendus
      
      Commence directement par le contenu, sans titre ni préambule.`;

      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
        }),
      });

      if (!response.ok) {
        console.error('AI API error:', response.status, await response.text());
        continue;
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      // Générer une description courte (première phrase ou 200 premiers caractères)
      const description = content.split('.')[0] + '.';

      // Insérer l'article dans la base de données
      const { data: insertedArticle, error: insertError } = await supabase
        .from('blog_posts')
        .insert({
          title: topic.title,
          description: description.substring(0, 200),
          content: content,
          type: topic.type,
          category: topic.category,
          published: true,
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error inserting article:', insertError);
        continue;
      }

      generatedArticles.push(insertedArticle);
      console.log(`Successfully generated and saved: ${topic.title}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        count: generatedArticles.length,
        articles: generatedArticles,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in auto-generate-blog function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
