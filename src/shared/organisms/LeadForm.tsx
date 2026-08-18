import type { FormEvent } from 'react';
import { useLeadForm } from '@/hooks/useLeadForm';
import { FormField } from '@/shared/molecules/FormField';
import type { LandingContent } from '@/types/landing';

interface LeadFormProps {
  readonly content: LandingContent;
}

export const LeadForm = ({ content }: LeadFormProps) => {
  const form = useLeadForm(content);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void form.submit();
  };

  return (
    <form className="lead-form reveal" data-state={form.sending ? 'sending' : undefined} noValidate aria-describedby="formGlobalNote" onSubmit={onSubmit}>
      <div className={`form-summary ${form.summary ? 'is-visible' : ''}`} role="alert">
        {form.summary}
      </div>
      <div className={`status-panel ${form.status ? 'is-visible' : ''} ${form.statusOk ? 'ok' : ''}`} role="status">
        {form.status}
      </div>
      <div className="form-grid">
        <FormField id="f-nombre" name="nombre" label="Nombre" required error={form.errors.nombre} invalid={!!form.errors.nombre} value={form.values.nombre} autoComplete="name" maxLength={120} onChange={(event) => form.setValue('nombre', event.target.value)} />
        <FormField id="f-empresa" name="empresa" label="Empresa" required error={form.errors.empresa} invalid={!!form.errors.empresa} value={form.values.empresa} autoComplete="organization" maxLength={160} onChange={(event) => form.setValue('empresa', event.target.value)} />
        <FormField id="f-cargo" name="cargo" label="Cargo" required error={form.errors.cargo} invalid={!!form.errors.cargo} value={form.values.cargo} autoComplete="organization-title" maxLength={120} onChange={(event) => form.setValue('cargo', event.target.value)} />
        <FormField id="f-correo" name="correo" label="Correo" type="email" required error={form.errors.correo} invalid={!!form.errors.correo} value={form.values.correo} autoComplete="email" onChange={(event) => form.setValue('correo', event.target.value)} />
        <FormField id="f-telefono" name="telefono" label="Teléfono o WhatsApp" type="tel" required={form.needsPhone} optionalLabel={form.needsPhone ? undefined : 'opcional'} error={form.errors.telefono} invalid={!!form.errors.telefono} value={form.values.telefono} autoComplete="tel" maxLength={30} onChange={(event) => form.setValue('telefono', event.target.value)} />
        <FormField as="select" id="f-solucion" name="solucion" label="Tipo de desafío" required options={content.contact.solutionOptions} error={form.errors.solucion} invalid={!!form.errors.solucion} value={form.values.solucion} onChange={(event) => form.setValue('solucion', event.target.value)} />
      </div>
      <FormField as="textarea" id="f-problema" name="problema" label="Mensaje" required error={form.errors.problema} invalid={!!form.errors.problema} value={form.values.problema} rows={4} maxLength={2000} placeholder="Cuéntanos qué necesitas resolver." onChange={(event) => form.setValue('problema', event.target.value)} />
      <fieldset id="f-canal" tabIndex={-1}>
        <legend>
          Canal de contacto preferido <span>*</span>
        </legend>
        <div className="channel-options">
          {content.contact.channels.map((channel) => (
            <label key={channel}>
              <input type="radio" name="canal" value={channel} checked={form.values.canal === channel} onChange={(event) => form.setValue('canal', event.target.value)} />
              <span>{channel}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <p className={`field-error channel-error ${form.errors.canal ? 'is-visible' : ''}`}>{form.errors.canal}</p>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="f-pagina-web">Página web</label>
        <input id="f-pagina-web" name="pagina_web" value={form.values.pagina_web} tabIndex={-1} autoComplete="off" onChange={(event) => form.setValue('pagina_web', event.target.value)} />
      </div>
      <label className="consent">
        <input type="checkbox" id="f-consent" checked={form.values.consentimiento} aria-invalid={!!form.errors.consentimiento || undefined} onChange={(event) => form.setValue('consentimiento', event.target.checked)} />
        <span>{content.contact.consent} *</span>
      </label>
      <p className={`field-error ${form.errors.consentimiento ? 'is-visible' : ''}`}>{form.errors.consentimiento}</p>
      <div className="form-actions">
        <button className="button button-primary" type="submit" disabled={form.sending}>
          <span className="button-spinner" aria-hidden="true"></span>
          <span>{form.submitLabel}</span>
          <b aria-hidden="true">↗</b>
        </button>
        <p id="formGlobalNote">{content.contact.globalNote}</p>
      </div>
    </form>
  );
};
