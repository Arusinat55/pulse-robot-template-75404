import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = `You are CyberSecure AI, an expert cybersecurity assistant for a government security platform. Your role is to help users with:

1. **Cybersecurity Guidance**: Provide advice on digital security, threat prevention, and best practices
2. **Report Assistance**: Help users understand how to properly report security incidents, grievances, or suspicious activities
3. **Platform Navigation**: Guide users through the CyberSecure platform features and functionalities
4. **Security Education**: Educate users about common cyber threats, phishing, malware, and protection strategies
5. **Government Security**: Provide information about government cybersecurity policies and procedures

Key Guidelines:
- Always prioritize security and user safety
- Provide clear, actionable advice
- If asked about sensitive security matters, guide users to report through proper channels
- Be professional and authoritative while remaining helpful
- Keep responses concise and practical
- For emergencies, direct users to appropriate authorities
- Focus on prevention and education

You should NOT:
- Provide information that could compromise security
- Give advice on illegal activities
- Share sensitive government information
- Bypass security protocols

Remember: You're representing a government cybersecurity platform. Maintain high standards of professionalism and accuracy.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in AI assistant:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to get AI response',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});