import {Directive, input} from '@angular/core';
import {BkButtonContext} from '@blenk/core';

@Directive({
  selector: '[bkButton]',
  standalone: true,
  host: {
    '[disabled]': 'context().disabled()',
    '[attr.aria-disabled]': 'context().disabled()',
    '[attr.aria-busy]': 'context().loading()',
    '[attr.aria-label]': 'context().label()',
    '[attr.title]': 'context().disabled() ? context().disabledReason() : null',
    '(click)': 'handleClick($event)'
  }
})
export class BkButtonDirective {
  context = input.required<BkButtonContext>({alias: 'bkButton'});

  handleClick(event: MouseEvent): void {
    const ctx = this.context();
    if (ctx.disabled() || ctx.loading()) {
      event.preventDefault();
      return;
    }
    ctx.click?.(event);
  }
}
