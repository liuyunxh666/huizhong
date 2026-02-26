import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-gateway-authorization',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text, voice_id, emotion, speed = 1 } = await req.json()
    const apiKey = Deno.env.get('INTEGRATIONS_API_KEY')

    if (!apiKey) {
      throw new Error('Missing INTEGRATIONS_API_KEY')
    }

    const response = await fetch('https://api-bj.minimaxi.com/v1/t2a_v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Gateway-Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "speech-2.8-hd",
        text,
        stream: false,
        voice_setting: {
          voice_id: voice_id || "male-qn-qingse",
          speed,
          emotion: emotion || "fluent"
        },
        audio_setting: {
          format: "mp3",
          sample_rate: 32000
        },
        output_format: "hex"
      })
    })

    const result = await response.json()
    
    if (result.base_resp && result.base_resp.status_code !== 0) {
      throw new Error(result.base_resp.status_msg || 'API Error')
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
