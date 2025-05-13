import { Signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

export class BkButtonContext {
  onClick?: (event: PointerEvent) => void;
  #label = new BehaviorSubject<string>('');
  #disabled = new BehaviorSubject<boolean>(false);
  #loading = new BehaviorSubject<boolean>(false);

  label: Signal<string> = toSignal(this.#label, { initialValue: '' });
  disabled: Signal<boolean> = toSignal(this.#disabled, { initialValue: false });
  loading: Signal<boolean> = toSignal(this.#loading, { initialValue: false });

  setDisabled(disabled: boolean) {
    this.#disabled.next(disabled);
  }

  setLoading(loading: boolean) {
    this.#loading.next(loading);
  }

  setLabel(label: string) {
    this.#label.next(label);
  }
}

export interface BkButtonContextConfig {
  disabled?: boolean;
  loading?: boolean;
  label?: string;
  onClick?: (event: PointerEvent) => void;
}

export function injectNkButton(config?: BkButtonContextConfig) {
  const context = new BkButtonContext();
  if (config?.disabled) context.setDisabled(config.disabled);
  if (config?.loading) context.setLoading(config.loading);
  if (config?.label) context.setLabel(config.label);
  if (config?.onClick) context.onClick = config.onClick;
  return context;
}
