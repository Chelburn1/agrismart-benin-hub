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
    const { culture, region, sol } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `Tu es un expert agricole spécialisé dans l'agriculture au Bénin. 
    Fournis des recommandations détaillées et pratiques en français pour optimiser la production agricole.
    Inclus des conseils sur:
    - La préparation du sol
    - Les périodes de plantation optimales
    - L'irrigation et l'arrosage
    - Les fertilisants recommandés
    - La protection contre les maladies et parasites
    - Les bonnes pratiques de récolte
    Sois concis mais précis, et adapte tes conseils au contexte béninois.`;

    const userPrompt = `Je cultive ${culture} dans la région de ${region} sur un sol ${sol}. 
    Quels sont les meilleurs conseils pour optimiser ma production ?`;

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
      throw new Error('Failed to get AI recommendations');
    }

    const data = await response.json();
    const recommendations = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ recommendations }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in agricultural-advice function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
