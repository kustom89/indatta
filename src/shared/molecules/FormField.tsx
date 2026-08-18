import type { ChangeEventHandler, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface BaseFieldProps {
  readonly id: string;
  readonly name: string;
  readonly label: string;
  readonly error?: string;
  readonly invalid?: boolean;
  readonly required?: boolean;
  readonly optionalLabel?: string;
}

type InputFieldProps = BaseFieldProps &
  InputHTMLAttributes<HTMLInputElement> & {
    readonly as?: 'input';
    readonly onChange: ChangeEventHandler<HTMLInputElement>;
  };

type SelectFieldProps = BaseFieldProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    readonly as: 'select';
    readonly options: readonly string[];
    readonly onChange: ChangeEventHandler<HTMLSelectElement>;
  };

type TextareaFieldProps = BaseFieldProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    readonly as: 'textarea';
    readonly onChange: ChangeEventHandler<HTMLTextAreaElement>;
  };

type FormFieldProps = InputFieldProps | SelectFieldProps | TextareaFieldProps;

export const FormField = (props: FormFieldProps) => {
  const { id, name, label, error, invalid = false, required = false, optionalLabel } = props;

  return (
    <div className="field" data-field={name} data-invalid={invalid ? 'true' : undefined}>
      <label htmlFor={id}>
        {label} {optionalLabel ? <small>{optionalLabel}</small> : null}
        {required ? <span>*</span> : null}
      </label>
      <FieldControl {...props} invalid={invalid} />
      <p className={`field-error ${invalid ? 'is-visible' : ''}`}>{error}</p>
    </div>
  );
};

const FieldControl = (props: FormFieldProps & { readonly invalid: boolean }) => {
  if (props.as === 'select') {
    const { id, name, options, invalid, as: _as, label: _label, error: _error, required: _required, optionalLabel: _optionalLabel, ...selectProps } = props;
    return (
      <select {...selectProps} id={id} name={name} aria-invalid={invalid || undefined}>
        <option value="">Selecciona...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  if (props.as === 'textarea') {
    const { id, name, invalid, as: _as, label: _label, error: _error, required: _required, optionalLabel: _optionalLabel, ...textareaProps } = props;
    return <textarea {...textareaProps} id={id} name={name} aria-invalid={invalid || undefined} />;
  }

  const { id, name, invalid, as: _as, label: _label, error: _error, required: _required, optionalLabel: _optionalLabel, ...inputProps } = props;
  return <input {...inputProps} id={id} name={name} aria-invalid={invalid || undefined} />;
};
