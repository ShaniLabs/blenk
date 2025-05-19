import {Directive, effect, ElementRef, inject, input} from '@angular/core';
import {BkTextInputContext} from '../context';

@Directive({
  selector: '[bkTextInput]',
  standalone: true,
  host: {
    '[type]': "'text'",
    '[attr.aria-disabled]': 'context().disabled() ? "true" : null',
    '[attr.aria-readonly]': 'context().readonly() ? "true" : null',
    '[attr.aria-invalid]': '!context().valid() ? "true" : null',
    '[required]': 'context().required() ? "" : null',
    '[placeholder]': 'context().placeholder()',
    '[disabled]': 'context().disabled()',
    '[readonly]': 'context().readonly()',
    '[value]': 'context().value()',
    '(input)': 'handleInput($event)',
    '(focus)': 'context().focus()',
    '(blur)': 'context().blur()'
  }
})
export class BkTextInputDirective {
  private readonly hostElement = inject(ElementRef<HTMLInputElement>);

  context = input.required<BkTextInputContext>({alias: 'bkTextInput'});

  constructor() {
    effect(() => {
      const value = this.context().value();
      if (this.hostElement.nativeElement.value !== value) {
        this.hostElement.nativeElement.value = value;
      }
    });
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.context().setValue(target.value);
  }
}
