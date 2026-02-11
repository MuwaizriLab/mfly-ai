import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // استخدام OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-v3.2',
        messages: [
          {
            role: 'system',
            content: 'أنت مستشار سفر ذكي لموقع mfly.ai. أجِب بلغة عربية فصيحة وبلهجة كويتية محترمة. ركّز على توفير وقت المسافر وتقليل جهد الموظف الأرضي. كن مفيداً ودقيقاً.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    const reply = data.choices[0]?.message?.content || 'عفواً، لم أستطع الرد حالياً.';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}