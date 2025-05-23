import {computed, signal} from '@angular/core';

export interface BkNumberInputConfig {
  initialValue?: number;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  loading?: boolean;
  errors?: Record<string, unknown> | null;
  label?: string;
  placeholder?: string;
  onFocus?: (event?: FocusEvent) => void;
  onBlur?: (event?: FocusEvent) => void;
  onDirtyChange?: (dirty: boolean) => void;
}

export class BkNumberInputContext {
  readonly #initialValue: number | null;
  readonly #value = signal<number | null>(null);
  readonly #label = signal('');
  readonly #dirty = signal(false);
  readonly #disabled = signal(false);
  readonly #loading = signal(false);
  readonly #required = signal(false);
  readonly #readonly = signal(false);
  readonly #errors = signal<Record<string, unknown> | null>(null);
  readonly #touched = signal(false);
  readonly #placeholder = signal<string | undefined>(undefined);
  readonly #onFocus?: (event?: FocusEvent) => void;
  readonly #onBlur?: (event?: FocusEvent) => void;
  readonly #onDirtyChange?: (dirty: boolean) => void;

  readonly value = this.#value;
  readonly label = this.#label;
  readonly dirty = this.#dirty;
  readonly disabled = this.#disabled;
  readonly required = this.#required;
  readonly readonly = this.#readonly;
  readonly loading = this.#loading;
  readonly errors = this.#errors;
  readonly touched = this.#touched;
  readonly placeholder = this.#placeholder;
  readonly hasValue = computed(() => this.#value() !== null);

  readonly valid = computed(() => this.#errors() === null);

  constructor(config?: BkNumberInputConfig) {
    const initial = config?.initialValue ?? null;
    this.#initialValue = initial;
    this.#value.set(initial);
    if (config?.disabled) this.#disabled.set(true);
    if (config?.required) this.#required.set(true);
    if (config?.readonly) this.#readonly.set(true);
    if (config?.loading) this.#loading.set(config.loading);
    if (config?.errors) this.#errors.set(config.errors);
    if (config?.label) this.#label.set(config.label);
    if (config?.placeholder) this.#placeholder.set(config.placeholder);
    if (config?.onFocus) this.#onFocus = config.onFocus;
    if (config?.onBlur) this.#onBlur = config.onBlur;
    if (config?.onDirtyChange) this.#onDirtyChange = config.onDirtyChange;
  }

  setValue(value: number | null) {
    if (!this.#readonly()) {
      if (value !== this.#initialValue && !this.dirty()) {
        this.setDirty(true);
      }
      this.#value.set(value);
    }
  }

  private setDirty(dirty: boolean): void {
    this.#dirty.set(dirty);
    this.#onDirtyChange?.(dirty);
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

  setLoading(loading: boolean) {
    this.#loading.set(loading);
  }

  setErrors(errors: Record<string, unknown> | null) {
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
    this.#touched.set(false);
    this.#errors.set(null);
    this.setDirty(false);
  }

  focus(event?: FocusEvent): void {
    this.#onFocus?.(event);
  }

  blur(event?: FocusEvent): void {
    if (!this.touched()) {
      this.#touched.set(true);
    }
    this.#onBlur?.(event);
  }
}

export function injectBkNumberInput(config?: BkNumberInputConfig): BkNumberInputContext {
  return new BkNumberInputContext(config);
}
