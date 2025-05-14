import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BkButtonContext, BkButtonDirective} from '@blenk/core';

@Component({
  selector: 'bk-button',
  imports: [CommonModule, BkButtonDirective],
  templateUrl: './bk-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BkButtonComponent {
  context = input.required<BkButtonContext>();
}
