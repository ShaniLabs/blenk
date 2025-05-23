import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BkTextInputContext, BkTextInputDirective, injectBkTextInput} from '../index';
import {action} from '@storybook/addon-actions';

@Component({
  standalone: true,
  selector: 'bk-story-text-input-wrapper',
  imports: [BkTextInputDirective],
  styleUrls: ['bk-text-input.component.css'],
  template: `
    <input [bkTextInput]="context"/>
  `
})
export class StoryBkTextInputWrapperComponent implements OnChanges, OnInit {
  @Input() value = '';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() loading = false;
  @Input() errors: Record<string, unknown> | null = null;
  @Input() placeholder = '';
  @Input() label = '';

  context!: BkTextInputContext;

  ngOnInit(): void {
    this.context = injectBkTextInput({
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
