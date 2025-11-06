import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, type } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `Tu es un expert agricole spécialisé dans la création de contenu éducatif pour les agriculteurs béninois.
    Crée du contenu détaillé, pratique et engageant en français sur des sujets agricoles.
    Le contenu doit être:
    - Informatif et basé sur des pratiques agricoles éprouvées
    - Adapté au contexte béninois
    - Accessible aux agriculteurs de tous niveaux
    - Structuré avec des sections claires
    - Incluant des conseils pratiques et actionnables`;

    const userPrompt = type === 'article' 
      ? `Écris un article de blog complet (800-1000 mots) sur le sujet: "${topic}". 
         Structure: Introduction, 3-4 sections principales avec sous-titres, conclusion avec points clés à retenir.`
      : type === 'video'
      ? `Crée un script détaillé pour une vidéo éducative (5-7 minutes) sur: "${topic}".
         Inclus: Introduction accrocheuse, points principaux à couvrir, démonstrations suggérées, conclusion.`
      : `Crée un guide pratique PDF sur: "${topic}".
         Format: Titre, objectifs d'apprentissage, étapes détaillées, conseils pratiques, ressources additionnelles.`;

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
      throw new Error('Failed to generate blog content');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-blog-content function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
