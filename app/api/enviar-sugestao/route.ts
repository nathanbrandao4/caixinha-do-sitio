import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, suggestion } = body

    if (!name || !suggestion) {
      return NextResponse.json(
        { error: 'Nome e sugestão são obrigatórios' },
        { status: 400 }
      )
    }

    // Salvar sugestão no banco de dados
    const { error: dbError } = await supabase.from('suggestions').insert({
      name,
      suggestion,
    })

    if (dbError) {
      console.error('Erro ao salvar sugestão:', dbError)
      throw dbError
    }

    // Tentar enviar email via Resend (se configurado)
    const resendApiKey = process.env.RESEND_API_KEY

    if (resendApiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'Caixinha do Sítio <onboarding@resend.dev>',
            to: ['nathanramos2771@gmail.com'],
            subject: `Nova Sugestão de ${name}`,
            html: `
              <h2>Nova Sugestão para as Férias!</h2>
              <p><strong>De:</strong> ${name}</p>
              <p><strong>Sugestão:</strong></p>
              <blockquote style="background: #f0f0f0; padding: 15px; border-left: 4px solid #22c55e;">
                ${suggestion}
              </blockquote>
              <hr>
              <p style="color: #666; font-size: 12px;">
                Enviado via Caixinha do Sítio
              </p>
            `,
          }),
        })
      } catch (emailError) {
        console.error('Erro ao enviar email (não crítico):', emailError)
        // Não falhar se o email não for enviado - a sugestão já foi salva
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro na API de sugestão:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
