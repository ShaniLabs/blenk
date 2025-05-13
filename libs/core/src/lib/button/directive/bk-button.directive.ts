import {Directive, HostBinding, HostListener, input, Input, InputSignal} from '@angular/core';
import {BkButtonContext} from '@blenk/core';

@Directive({
  selector: '[bkButton]',
  standalone: true
})
export class BkButtonDirective {
  context: InputSignal<BkButtonContext> = input.required({alias: 'bkButton'});

  @HostBinding('disabled')
  get isDisabled(): boolean {
    console.log('isDisabled:', this.context().disabled());
    return this.context().disabled();
  }

  @HostBinding('attr.aria-busy')
  get ariaBusy(): string {
    console.log('ariaBusy:', this.context().loading());
    return this.context().loading() ? 'true' : 'false';
  }

  @HostListener('click', ['$event'])
  handleClick(event: PointerEvent): void {
    const ctx = this.context();
    if (ctx.disabled() || ctx.loading()) {
      event.preventDefault();
      return;
    }
    ctx.onClick?.(event);
  }
}
