import {Meta, moduleMetadata, StoryFn} from '@storybook/angular';
import {BkButtonComponent} from '../../../../core/src/lib/button/component/bk-button.component';

export default {
  title: 'Components/Button',
  component: BkButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [BkButtonComponent],
    }),
  ],
  argTypes: {
    label: {control: 'text'},
    disabled: {control: 'boolean'},
    loading: {control: 'boolean'},
    disabledReason: {control: 'text'},
  },
} as Meta<BkButtonComponent>;

const Template: StoryFn<BkButtonComponent> = (args: BkButtonComponent) => ({props: args});

export const Default = Template.bind({});
Default.args = {
  label: 'Click Me',
  disabled: false,
  loading: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled',
  disabled: true,
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  label: 'Loading',
  disabled: false,
  loading: true,
};

export const CustomLabel = Template.bind({});
CustomLabel.args = {
  label: 'Custom Label',
  disabled: false,
  loading: false,
};

export const WithLongText = Template.bind({});
WithLongText.args = {
  label: 'This is a very long button label to test wrapping or truncation behavior in the UI',
  disabled: false,
  loading: false,
};

