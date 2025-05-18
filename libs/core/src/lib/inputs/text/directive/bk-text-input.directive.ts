import {Directive, effect, ElementRef, input, output} from '@angular/core';
import {BkTextInputContext} from '@blenk/core';

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
    '(input)': 'handleInput($event)',
    '(focus)': 'handleFocus($event)',
    '(blur)': 'context().blur()'
  }
})
export class BkTextInputDirective {
  context = input.required<BkTextInputContext>({alias: 'bkTextInput'});

  focus = output<FocusEvent>();

  constructor(private readonly el: ElementRef<HTMLInputElement>) {
    effect(() => {
      const value = this.context().value();
      if (this.el.nativeElement.value !== value) {
        this.el.nativeElement.value = value;
      }
    });
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.context().setValue(target.value);
  }

  handleFocus($event: FocusEvent) {
    this.context().focus();
    this.focus.emit($event);
  }
}
