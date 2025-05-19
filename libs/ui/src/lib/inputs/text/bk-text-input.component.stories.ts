import {Meta, moduleMetadata, StoryFn} from '@storybook/angular';
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {BkTextInputContext, BkTextInputDirective, injectBkTextInput} from '@blenk/core';
import {toObservable} from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'bk-story-text-input-wrapper',
  imports: [BkTextInputDirective],
  template: `
    <input [bkTextInput]="context"/>
  `
})
class StoryBkTextInputWrapperComponent implements OnChanges {
  @Input() value = '';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() errors: Record<string, unknown> | null = null;
  @Input() placeholder = '';
  @Input() label = '';

  context: BkTextInputContext = injectBkTextInput();

  focus$ = toObservable(this.context.focused);
  touched$ = toObservable(this.context.touched);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.context.setValue(this.value);
    }
    if (changes['disabled']) {
      this.context.setDisabled(this.disabled);
    }
    if (changes['readonly']) {
      this.context.setReadonly(this.readonly);
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

export default {
  title: 'Inputs/Text',
  component: StoryBkTextInputWrapperComponent,
  decorators: [
    moduleMetadata({
      imports: [StoryBkTextInputWrapperComponent],
    })
  ],
  argTypes: {
    value: {control: 'text'},
    disabled: {control: 'boolean'},
    readonly: {control: 'boolean'},
    required: {control: 'boolean'},
    placeholder: {control: 'text'},
    label: {control: 'text'},
    errors: {control: 'object'}
  }
} as Meta<StoryBkTextInputWrapperComponent>;

const Template: StoryFn<StoryBkTextInputWrapperComponent> = (args: StoryBkTextInputWrapperComponent) => ({props: args});

export const Default = Template.bind({});
Default.args = {
  value: 'Hello',
  placeholder: 'Type here...'
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Username',
  value: ''
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: 'Disabled input',
  disabled: true,
  label: 'Disabled Field'
};

export const Readonly = Template.bind({});
Readonly.args = {
  value: 'Readonly input',
  readonly: true,
  label: 'Readonly Field'
};

export const RequiredEmpty = Template.bind({});
RequiredEmpty.args = {
  value: '',
  required: true,
  label: 'Required Field',
  placeholder: 'Required field'
};

export const WithCustomError = Template.bind({});
WithCustomError.args = {
  value: 'Invalid value',
  errors: {custom: 'This value is invalid'},
  label: 'Custom Error'
};

export const FullyInvalid = Template.bind({});
FullyInvalid.args = {
  value: '',
  required: true,
  readonly: false,
  disabled: false,
  errors: {
    required: 'Required',
    pattern: 'Must be alphanumeric'
  },
  label: 'Fully Invalid Input'
};
