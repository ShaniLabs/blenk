import {Meta, moduleMetadata, StoryFn} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import {StoryBkNumberInputWrapperComponent} from './bk-number-input.component';

export default {
  title: 'Inputs/Number',
  component: StoryBkNumberInputWrapperComponent,
  decorators: [
    moduleMetadata({
      imports: [StoryBkNumberInputWrapperComponent],
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
} as Meta<StoryBkNumberInputWrapperComponent>;

const Template: StoryFn<StoryBkNumberInputWrapperComponent> = (args: StoryBkNumberInputWrapperComponent) => ({props: args});

export const Default = Template.bind({});
Default.args = {
  value: 10,
  placeholder: 'Type here...'
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Username',
  value: 10
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: 0,
  disabled: true,
  label: 'Disabled Field'
};

export const Readonly = Template.bind({});
Readonly.args = {
  value: 0,
  readonly: true,
  label: 'Readonly Field'
};

export const RequiredEmpty = Template.bind({});
RequiredEmpty.args = {
  value: 0,
  required: true,
  label: 'Required Field',
  placeholder: 'Required field'
};

export const WithCustomError = Template.bind({});
WithCustomError.args = {
  value: 0,
  errors: {custom: 'This value is invalid'},
  label: 'Custom Error'
};

export const FullyInvalid = Template.bind({});
FullyInvalid.args = {
  value: 0,
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
  value: 0,
  loading: true,
  label: 'Loading Field'
};
