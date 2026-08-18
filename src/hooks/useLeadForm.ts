import { useMemo, useState } from 'react';
import { z } from 'zod';
import type { LandingContent } from '@/types/landing';

export type LeadFormValues = {
  nombre: string;
  empresa: string;
  cargo: string;
  correo: string;
  telefono: string;
  solucion: string;
  canal: string;
  problema: string;
  consentimiento: boolean;
  pagina_web: string;
};

type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>;

const initialValues: LeadFormValues = {
  nombre: '',
  empresa: '',
  cargo: '',
  correo: '',
  telefono: '',
  solucion: '',
  canal: '',
  problema: '',
  consentimiento: false,
  pagina_web: '',
};

const phoneIsValid = (value: string) => {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15;
};

const schema = z
  .object({
    nombre: z.string().trim().min(1, 'Ingresa tu nombre.'),
    empresa: z.string().trim().min(1, 'Ingresa el nombre de tu empresa.'),
    cargo: z.string().trim().min(1, 'Ingresa tu cargo.'),
    correo: z.email('Ingresa un correo válido.'),
    telefono: z.string(),
    solucion: z.string().trim().min(1, 'Selecciona una opción.'),
    canal: z.string().trim().min(1, 'Selecciona cómo prefieres que te contactemos.'),
    problema: z.string().trim().min(1, 'Cuéntanos brevemente el problema.'),
    consentimiento: z.literal(true, { error: 'Debes aceptar para poder enviar el formulario.' }),
    pagina_web: z.string(),
  })
  .superRefine((values, context) => {
    if (['Teléfono', 'WhatsApp'].includes(values.canal) && !phoneIsValid(values.telefono)) {
      context.addIssue({
        code: 'custom',
        path: ['telefono'],
        message: 'Ingresa un teléfono válido para este canal.',
      });
    }
  });

export const useLeadForm = (content: LandingContent) => {
  const [values, setValues] = useState<LeadFormValues>(initialValues);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState('');
  const [statusOk, setStatusOk] = useState(false);

  const needsPhone = ['Teléfono', 'WhatsApp'].includes(values.canal);
  const submitLabel = content.contact.submitByChannel[values.canal] ?? 'Conversemos';

  const visibleErrors = useMemo(() => (submitted ? errors : {}), [errors, submitted]);

  const setValue = <Name extends keyof LeadFormValues>(name: Name, value: LeadFormValues[Name]) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[name];
      if (name === 'canal' && !['Teléfono', 'WhatsApp'].includes(String(value))) delete next.telefono;
      return next;
    });
  };

  const validate = () => {
    const result = schema.safeParse(values);
    if (result.success) {
      setErrors({});
      return true;
    }

    const nextErrors: LeadFormErrors = {};
    result.error.issues.forEach((issue) => {
      const name = issue.path[0] as keyof LeadFormValues | undefined;
      if (name && !nextErrors[name]) nextErrors[name] = issue.message;
    });
    setErrors(nextErrors);
    setSummary('Revisa los campos marcados antes de continuar.');
    return false;
  };

  const submit = async () => {
    setSubmitted(true);
    setSummary('');
    setStatus('');
    setStatusOk(false);
    if (!validate()) return;

    setSending(true);
    try {
      const response = await fetch(`${content.apiBase}/contacto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(`No pudimos procesar tu solicitud (${response.status}).`);

      if (values.canal === 'WhatsApp') {
        setStatus('Solicitud recibida. Abriendo WhatsApp...');
        setStatusOk(true);
        const message = encodeURIComponent(`Hola, soy ${values.nombre} de ${values.empresa}. Completé el formulario de INDATTA y quiero evaluar un proyecto relacionado con ${values.solucion}.`);
        window.location.assign(`https://wa.me/${content.whatsappNumber}?text=${message}`);
        return;
      }

      setStatus(content.contact.okByChannel[values.canal] ?? 'Recibimos tu solicitud.');
      setStatusOk(true);
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'Intenta nuevamente en unos minutos.';
      setSummary(`No pudimos enviar tu solicitud. ${detail} Tus datos siguen aquí; puedes volver a intentarlo.`);
    } finally {
      setSending(false);
    }
  };

  return {
    values,
    errors: visibleErrors,
    sending,
    summary,
    status,
    statusOk,
    needsPhone,
    submitLabel,
    setValue,
    submit,
  };
};
