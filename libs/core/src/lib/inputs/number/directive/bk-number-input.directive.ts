import {Directive, effect, ElementRef, inject, input} from '@angular/core';
import {BkNumberInputContext} from '../context';

@Directive({
  selector: '[bkNumberInput]',
  standalone: true,
  host: {
    '[type]': '"number"',
    '[attr.aria-disabled]': 'context().disabled() ? "true" : null',
    '[attr.aria-readonly]': 'context().readonly() ? "true" : null',
    '[attr.aria-invalid]': '!context().valid() ? "true" : null',
    '[attr.aria-busy]': 'context().loading() ? "true" : null',
    '[required]': 'context().required() ? "" : null',
    '[placeholder]': 'context().placeholder()',
    '[disabled]': 'context().disabled()',
    '[readonly]': 'context().readonly()',
    '[value]': 'context().value() === null ? "" : context().value()',
    '(input)': 'handleInput($event)',
    '(focus)': 'context().focus()',
    '(blur)': 'context().blur()'
  }
})
export class BkNumberInputDirective {
  private readonly hostElement = inject(ElementRef<HTMLInputElement>);
  context = input.required<BkNumberInputContext>({alias: 'bkNumberInput'});

  constructor() {
    effect(() => {
      const value = this.context().value();
      const element = this.hostElement.nativeElement;
      const current = element.value === '' ? null : Number(element.value);
      if (value !== current && !(value === null && element.value === '')) {
        element.value = value === null ? '' : value.toString();
      }
    });
  }

  handleInput(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const newValue = inputEl.value === '' ? null : Number(inputEl.value);
    this.context().setValue(Number.isNaN(newValue) ? null : newValue);
  }
}
