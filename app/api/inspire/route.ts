import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { mood, budget, companions } = await request.json();

    const prompt = `
أنت مستشار سفر ذكي لموقع mfly.ai. 
المستخدم يبحث عن وجهة سفر تناسب:
- المزاج: ${mood}
- الميزانية: ${budget}
- الرفقاء: ${companions}

أجب بلغة عربية فصيحة وبلهجة كويتية محترمة.
قدم:
1. اسم الوجهة المقترحة (دولة/مدينة).
2. لماذا تناسب معطيات المستخدم.
3. معلومات سريعة: الفيزا (للمواطن الكويتي)، الطقس، أفضل وقت للزيارة.
4. مقترح برنامج تقريبي (3-5 أيام) مع تقدير تكاليف.
5. نصيحة ذكية لتوفير المال أو الوقت.

كن مُفصلاً ودقيقاً وودوداً.
`;

    // استدعاء DeepSeek API
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'أنت مستشار سفر خبير، تعمل لصالح منصة mfly.ai.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 800,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    const suggestion = data.choices[0]?.message?.content || 'عذراً، لم أستطع توليد اقتراح في الوقت الحالي.';

    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error('Inspire API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}