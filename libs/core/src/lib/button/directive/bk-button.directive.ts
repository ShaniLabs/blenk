import {Directive, input} from '@angular/core';
import {BkButtonContext} from '../context';

@Directive({
  selector: '[bkButton]',
  standalone: true,
  host: {
    '[disabled]': 'context().disabled()',
    '[attr.aria-disabled]': 'context().disabled()',
    '[attr.aria-busy]': 'context().loading()',
    '[attr.aria-label]': 'context().label()',
    '[attr.title]': 'context().disabled() ? context().disabledReason() : null',
    '(click)': 'context().click($event)',
    '(focus)': 'context().focus($event)',
    '(blur)': 'context().focus($event)',
  }
})
export class BkButtonDirective {
  context = input.required<BkButtonContext>({alias: 'bkButton'});
}
