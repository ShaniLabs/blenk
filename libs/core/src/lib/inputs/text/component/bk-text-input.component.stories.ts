import {Meta, moduleMetadata, StoryFn} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import {StoryBkTextInputWrapperComponent} from './bk-text-input.component';

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
    loading: {control: 'boolean'},
    placeholder: {control: 'text'},
    label: {control: 'text'},
    errors: {control: 'object'},
    reset: action('reset')
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

export const Loading = Template.bind({});
Loading.args = {
  value: 'Loading...',
  loading: true,
  label: 'Loading Field'
};
