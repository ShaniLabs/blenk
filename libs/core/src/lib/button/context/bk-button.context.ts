import { Signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

export class BkButtonContext {
  onClick?: () => void;
  #disabled = new BehaviorSubject<boolean>(false);
  disabled: Signal<boolean> = toSignal(this.#disabled, { initialValue: false });
  #label = new BehaviorSubject<string>('');
  label: Signal<string> = toSignal(this.#label, { initialValue: '' });
  #hidden = new BehaviorSubject<boolean>(false);
  hidden: Signal<boolean> = toSignal(this.#hidden, { initialValue: false });

  setDisabled(disabled: boolean) {
    this.#disabled.next(disabled);
  }

  setHidden(hidden: boolean) {
    this.#hidden.next(hidden);
  }

  setLabel(label: string) {
    this.#label.next(label);
  }
}

export interface BkButtonContextConfig {
  disabled?: boolean;
  hidden?: boolean;
  label?: string;
  onClick?: () => void;
}

export function injectNkButton(config?: BkButtonContextConfig) {
  const context = new BkButtonContext();
  if (config?.disabled) context.setDisabled(config.disabled);
  if (config?.hidden) context.setHidden(config.hidden);
  if (config?.onClick) context.onClick = config.onClick;
  if (config?.label) context.setLabel(config.label);
  return context;
}
