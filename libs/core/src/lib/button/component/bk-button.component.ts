import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BkButtonDirective} from '../directive';
import {action} from '@storybook/addon-actions';
import {BkButtonContext, injectBkButton} from '../context';

@Component({
  selector: 'bk-button-component',
  imports: [CommonModule, BkButtonDirective],
  template: `
    <button [bkButton]="context"> {{ context.label() }}</button>
  `,
  styleUrl: './bk-button.component.css',
})
export class BkButtonComponent implements OnChanges {
  @Input() label = '';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() disabledReason = '';

  context: BkButtonContext;

  constructor() {
    // Create context in DI scope
    this.context = injectBkButton({
      label: this.label,
      disabled: this.disabled,
      loading: this.loading,
      onClick: action('button-click'),
    });
  }

  ngOnChanges({label, disabled, loading, disabledReason}: SimpleChanges): void {
    // Update context signals on input changes
    if (label) {
      this.context.setLabel(this.label);
    }
    if (disabled) {
      this.context.setDisabled(this.disabled);
    }
    if (loading) {
      this.context.setLoading(this.loading);
    }
    if (disabledReason) {
      this.context.setDisabledReason(this.disabledReason);
    }
  }
}
