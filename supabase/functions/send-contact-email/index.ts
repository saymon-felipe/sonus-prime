import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  try {
    const payload = await req.json()
    const data = payload.record || payload
    const { name, email, project } = data || {}

    if (!name || !email) {
      throw new Error(`Dados incompletos. Payload: ${JSON.stringify(payload)}`)
    }

    console.log(`➡️ Processando e-mail estilizado para: ${name}`)

    // IMPORTANTE: Assim que subir a logo em formato PNG na Netlify, o link funcionará em 100% dos e-mails
    const logoUrl = 'https://sonus-prime.netlify.app/logo.png'

    // 1. E-mail de confirmação para o Cliente (Tema Escuro Elegante)
    const clientEmailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Sistema Sonus Prime <onboarding@resend.dev>', // Mudar para contato@sonusprime.com.br após verificar domínio
        to: 'agencia.sonusprime@gmail.com', // MODO SANDBOX: Mude para a variável 'email' na versão final
        subject: 'Recebemos o seu contato! - Sonus Prime',
        html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #f5f5f7; padding: 40px; border-radius: 12px; border: 1px solid #222;">
            <div style="text-align: center; margin-bottom: 40px;">
              <img src="${logoUrl}" alt="Sonus Prime" style="width: 180px; display: inline-block; border: none; outline: none;" />
            </div>
            <h2 style="font-weight: 300; font-size: 24px; color: #ffffff; margin-bottom: 20px;">Olá, <strong>${name}</strong>.</h2>
            <p style="font-size: 16px; color: #cccccc; line-height: 1.6;">Recebemos a sua mensagem detalhando o seguinte projeto:</p>
            <blockquote style="border-left: 3px solid #ffffff; margin: 20px 0; padding-left: 15px; color: #aaaaaa; font-style: italic;">
              "${project}"
            </blockquote>
            <p style="font-size: 16px; color: #cccccc; line-height: 1.6;">Nossa equipe já está analisando as suas informações. Entraremos em contato muito em breve para agendar uma conversa e darmos o próximo passo.</p>
            <hr style="border: none; border-top: 1px solid #333; margin: 40px 0 30px;" />
            <div style="text-align: center;">
              <p style="font-size: 11px; color: #666666; letter-spacing: 2px; text-transform: uppercase;">Elevando o Padrão Digital</p>
              <p style="font-size: 12px; color: #444444;">&copy; Sonus Prime Agência WEB</p>
            </div>
          </div>
        `
      })
    })

    const clientData = await clientEmailRes.json()
    if (!clientEmailRes.ok) {
      throw new Error(`Erro Resend (Cliente): ${JSON.stringify(clientData)}`)
    }

    // 2. E-mail de aviso interno para a Agência (Tema Claro / Foco na Leitura)
    const agencyEmailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Sistema Sonus Prime <onboarding@resend.dev>', // Mudar para contato@sonusprime.com.br após verificar domínio
        to: ['agencia.sonusprime@gmail.com'],
        subject: `🔥 Novo Lead Recebido: ${name}`,
        html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f7; color: #1d1d1f; padding: 40px; border-radius: 12px; border: 1px solid #e5e5ea;">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="${logoUrl}" alt="Sonus Prime" style="width: 150px; display: inline-block; border: none; outline: none; background-color: #000; padding: 10px; border-radius: 4px;" />
            </div>
            <h2 style="color: #000; margin-bottom: 20px; font-size: 22px; border-bottom: 2px solid #000; padding-bottom: 15px;">Novo lead capturado!</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #ddd; width: 80px;"><strong>Nome:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #ddd; color: #444;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #ddd;"><strong>E-mail:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #ddd;"><a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a></td>
              </tr>
            </table>

            <div style="background-color: #ffffff; padding: 25px; border-radius: 8px; border: 1px solid #e5e5ea; box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
              <h3 style="margin-top: 0; font-size: 14px; color: #86868b; text-transform: uppercase; letter-spacing: 1px;">Sobre o Projeto</h3>
              <p style="margin: 0; font-size: 16px; color: #1d1d1f; line-height: 1.6; white-space: pre-wrap;">${project}</p>
            </div>
          </div>
        `
      })
    })

    const agencyData = await agencyEmailRes.json()
    if (!agencyEmailRes.ok) {
      throw new Error(`Erro Resend (Agência): ${JSON.stringify(agencyData)}`)
    }

    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" }, status: 200 })
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { headers: { "Content-Type": "application/json" }, status: 400 })
  }
})