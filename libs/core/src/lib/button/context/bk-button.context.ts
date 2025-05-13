import {signal, Signal} from '@angular/core';

export interface BkButtonContextConfig {
  disabled?: boolean;
  loading?: boolean;
  label?: string;
  disabledReason?: string;
  onClick?: (event: MouseEvent) => void;
}


export class BkButtonContext {
  readonly #label = signal<string>('');
  readonly #disabled = signal<boolean>(false);
  readonly #loading = signal<boolean>(false);
  readonly #disabledReason = signal<string>('');

  readonly label: Signal<string> = this.#label.asReadonly();
  readonly disabled: Signal<boolean> = this.#disabled.asReadonly();
  readonly loading: Signal<boolean> = this.#loading.asReadonly();
  readonly disabledReason: Signal<string> = this.#disabledReason.asReadonly();

  readonly #onClick?: (event: MouseEvent) => void;

  constructor(config?: BkButtonContextConfig) {
    if (config) {
      this.setLabel(config.label ?? '');
      this.setDisabled(config.disabled ?? false);
      this.setLoading(config.loading ?? false);
      this.setDisabledReason(config.disabledReason ?? '');
      this.#onClick = config.onClick;
    }
  }

  setLabel(label: string): void {
    this.#label.set(label);
  }

  setDisabled(isDisabled: boolean): void {
    this.#disabled.set(isDisabled);
  }

  setLoading(isLoading: boolean): void {
    this.#loading.set(isLoading);
  }

  setDisabledReason(reason: string): void {
    this.#disabledReason.set(reason);
  }

  click(event: MouseEvent): void {
    if (!this.disabled() && !this.loading() && this.#onClick) {
      this.#onClick(event);
    }
  }
}

export function injectBkButton(config?: BkButtonContextConfig) {
  return new BkButtonContext(config);
}
