import { NextResponse } from 'next/server';

const clean = (value: FormDataEntryValue | null, limit: number) =>
  typeof value === 'string' ? value.trim().slice(0, limit) : '';

export async function POST(request: Request) {
  const form = await request.formData();
  if (clean(form.get('website'), 200)) return NextResponse.json({ ok: true });

  const payload = {
    name: clean(form.get('name'), 100),
    email: clean(form.get('email'), 160),
    organization: clean(form.get('organization'), 160),
    message: clean(form.get('message'), 1500),
  };

  if (!payload.name || !/^\S+@\S+\.\S+$/.test(payload.email) || !payload.message) {
    return NextResponse.json({ ok: false, error: 'invalid_form' }, { status: 400 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ ok: false, error: 'contact_not_configured' }, { status: 503 });

  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-oncoorch-source': 'website' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });

    return response.ok
      ? NextResponse.json({ ok: true })
      : NextResponse.json({ ok: false, error: 'delivery_failed' }, { status: 502 });
  } catch {
    return NextResponse.json({ ok: false, error: 'delivery_unavailable' }, { status: 502 });
  }
}
