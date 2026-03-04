import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  try {
    const payload = await req.json()
    const { name, email, project } = payload.record // Dados recém inseridos na tabela 'contacts'

    // 1. E-mail de confirmação para o Cliente (Estilizado)
    const clientEmailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Sonus Prime <contato@sonusprime.com.br>', // Use o domínio validado no Resend
        to: email,
        subject: 'Recebemos o seu contato! - Sonus Prime',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #000; color: #fff; padding: 40px; border-radius: 8px;">
            <h1 style="color: #fff; text-align: center;">SONUS PRIME</h1>
            <p style="font-size: 16px; color: #ccc;">Olá <strong>${name}</strong>,</p>
            <p style="font-size: 16px; color: #ccc;">Recebemos a sua mensagem sobre o projeto: <em>"${project}"</em>.</p>
            <p style="font-size: 16px; color: #ccc;">A nossa equipa já está a analisar as suas informações e entraremos em contacto muito em breve para agendarmos uma conversa.</p>
            <hr style="border-color: #333; margin: 30px 0;" />
            <p style="font-size: 14px; color: #888; text-align: center;">Elevando o Padrão Digital.<br>Equipa Sonus Prime</p>
          </div>
        `
      })
    })

    // 2. E-mail de aviso interno para a Agência
    const agencyEmailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Sistema Sonus Prime <contato@sonusprime.com.br>',
        to: ['joaojunior.jj@hotmail.com', 'linnubr@gmail.com'],
        subject: `Novo Lead: ${name}`,
        html: `
          <h3>Novo contato recebido pelo site!</h3>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Sobre o Projeto:</strong><br/>${project}</p>
        `
      })
    })

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    })
  }
})