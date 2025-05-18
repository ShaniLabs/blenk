import {computed, signal} from '@angular/core';

export interface BkTextInputConfig {
  initialValue?: string;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  errors?: Record<string, any> | null;
  label?: string;
  placeholder?: string;
}

export class BkTextInputContext {
  readonly #initialValue: string;
  readonly #value = signal('');
  readonly #label = signal('');
  readonly #dirty = signal(false);
  readonly #disabled = signal(false);
  readonly #required = signal(false);
  readonly #readonly = signal(false);
  readonly #errors = signal<Record<string, any> | null>(null);
  readonly #focused = signal(false);
  readonly #touched = signal(false);
  readonly #placeholder = signal<string | undefined>(undefined);

  readonly value = this.#value;
  readonly label = this.#label;
  readonly dirty = this.#dirty;
  readonly disabled = this.#disabled;
  readonly required = this.#required;
  readonly readonly = this.#readonly;
  readonly errors = this.#errors;
  readonly focused = this.#focused;
  readonly touched = this.#touched;
  readonly placeholder = this.#placeholder;
  readonly hasValue = computed(() => this.#value().length > 0);

  readonly valid = computed(() => this.#errors() === null);

  constructor(config?: BkTextInputConfig) {
    const initial = config?.initialValue ?? '';
    this.#initialValue = initial;
    this.#value.set(initial);
    if (config?.disabled) this.#disabled.set(true);
    if (config?.required) this.#required.set(true);
    if (config?.readonly) this.#readonly.set(true);
    if (config?.errors) this.#errors.set(config.errors);
    if (config?.label) this.#label.set(config.label);
    if (config?.placeholder) this.#placeholder.set(config.placeholder);
  }

  setValue(value: string) {
    if (!this.#readonly()) {
      if (value !== this.#initialValue) {
        this.#dirty.set(true);
      }
      this.#value.set(value);
    }
  }

  setDisabled(disabled: boolean) {
    this.#disabled.set(disabled);
  }

  setReadonly(readonly: boolean) {
    this.#readonly.set(readonly);
  }

  setRequired(required: boolean) {
    this.#required.set(required);
  }

  setErrors(errors: Record<string, any> | null) {
    this.#errors.set(errors);
  }

  setPlaceholder(placeholder: string) {
    this.#placeholder.set(placeholder);
  }

  setLabel(label: string) {
    this.#label.set(label);
  }

  reset(): void {
    this.#value.set(this.#initialValue);
    this.#dirty.set(false);
    this.#touched.set(false);
    this.#errors.set(null);
    this.#focused.set(false);
  }

  focus(): void {
    this.#focused.set(true);
  }

  blur(): void {
    if (this.#focused()) {
      this.#focused.set(false);
      this.#touched.set(true);
    }
  }
}

export function injectBkTextInput(config?: BkTextInputConfig): BkTextInputContext {
  return new BkTextInputContext(config);
}
