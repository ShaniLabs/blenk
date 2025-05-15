import {Meta, moduleMetadata, StoryFn} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import {CommonModule} from '@angular/common';
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {BkButtonContext, BkButtonDirective, injectBkButton} from '@blenk/core';

@Component({
  standalone: true,
  imports: [CommonModule, BkButtonDirective],
  selector: 'story-bk-button-wrapper',
  template: `
    <button
      class="btn-active"
      [bkButton]="context">
      @if (context.loading()) {
        <span class="bk-button__spinner"></span>
      }
      {{ context.label() }}
    </button>
  `,
})
class StoryBkButtonWrapper implements OnChanges {
  @Input() label = '';
  @Input() disabled = false;
  @Input() loading = false;

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

  ngOnChanges({label, disabled, loading}: SimpleChanges): void {
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
  }
}

export default {
  title: 'ui/Button',
  component: StoryBkButtonWrapper,
  decorators: [
    moduleMetadata({
      imports: [StoryBkButtonWrapper],
    }),
  ],
  argTypes: {
    label: {control: 'text'},
    disabled: {control: 'boolean'},
    loading: {control: 'boolean'},
  },
} as Meta<StoryBkButtonWrapper>;

const Template: StoryFn<StoryBkButtonWrapper> = (args: StoryBkButtonWrapper) => ({props: args});

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
