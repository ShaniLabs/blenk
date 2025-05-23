import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BkNumberInputContext, BkNumberInputDirective, injectBkNumberInput} from '../index';
import {action} from '@storybook/addon-actions';

@Component({
  standalone: true,
  selector: 'bk-story-number-input-wrapper',
  imports: [BkNumberInputDirective],
  styleUrls: ['bk-number-input.component.css'],
  template: `
    <input [bkNumberInput]="context"/>
  `
})
export class StoryBkNumberInputWrapperComponent implements OnChanges, OnInit {
  @Input() value = 0;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() loading = false;
  @Input() errors: Record<string, unknown> | null = null;
  @Input() placeholder = '';
  @Input() label = '';

  context!: BkNumberInputContext;

  ngOnInit(): void {
    this.context = injectBkNumberInput({
      label: this.label,
      disabled: this.disabled,
      readonly: this.readonly,
      required: this.required,
      placeholder: this.placeholder,
      errors: this.errors,
      initialValue: this.value,
      onFocus: action('focus'),
      onBlur: action('blur'),
      onDirtyChange: action('dirty-change')
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.context) {

      if (changes['value']) {
        this.context.setValue(this.value);
      }
      if (changes['disabled']) {
        this.context.setDisabled(this.disabled);
      }
      if (changes['readonly']) {
        this.context.setReadonly(this.readonly);
      }
      if (changes['loading']) {
        this.context.setLoading(this.loading);
      }
      if (changes['required']) {
        this.context.setRequired(this.required);
      }
      if (changes['placeholder']) {
        this.context.setPlaceholder(this.placeholder);
      }
      if (changes['label']) {
        this.context.setLabel(this.label);
      }
      if (changes['errors']) {
        this.context.setErrors(this.errors);
      }
    }
  }
}
