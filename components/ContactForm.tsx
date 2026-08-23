'use client';

import { FormEvent, useState } from 'react';

type FormState = 'idle' | 'sending' | 'sent' | 'error';

export function ContactForm() {
  const [state, setState] = useState<FormState>('idle');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState('sending');

    try {
      const response = await fetch('/api/contact', { method: 'POST', body: new FormData(form) });
      setState(response.ok ? 'sent' : 'error');
      if (response.ok) form.reset();
    } catch {
      setState('error');
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} aria-label="Formulario de contacto">
      <label>Nombre<input name="name" autoComplete="name" maxLength={100} required /></label>
      <label>Correo institucional<input name="email" type="email" autoComplete="email" maxLength={160} required /></label>
      <label>Organizacion<input name="organization" autoComplete="organization" maxLength={160} /></label>
      <label className="contact-form__message">Que necesita conectar?<textarea name="message" maxLength={1500} required /></label>
      <label className="contact-form__trap" aria-hidden="true">Sitio web<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <button className="button button--primary" disabled={state === 'sending'} type="submit">
        {state === 'sending' ? 'Enviando...' : 'Solicitar una conversacion'}
      </button>
      <p className="form-status" aria-live="polite">
        {state === 'sent' && 'Gracias. Recibimos su mensaje.'}
        {state === 'error' && 'Aun no pudimos enviar el mensaje. Intentelo nuevamente mas tarde.'}
      </p>
    </form>
  );
}
