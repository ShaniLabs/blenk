import {Meta, moduleMetadata, StoryFn} from '@storybook/angular';
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {BkTextInputContext, BkTextInputDirective, injectBkTextInput} from '@blenk/core';
import {toObservable} from '@angular/core/rxjs-interop';

@Component({
    standalone: true,
    selector: 'bk-story-text-input-wrapper',
    imports: [BkTextInputDirective],
    template: `
        <label for="textInput">{{ context.label() }}</label>
        <input name="textInput" type="text" [bkTextInput]="context"/>
        <p class="text-sm mt-2 text-gray-600">Value: {{ context.value() }}</p>
        @if (!context.valid() && context.touched()) {
            <p class="text-sm text-red-500">
                Error: {{ context.errors().length > 0 ? context.errors()[0] : ' }}
            </p>
        }
    `
})
class StoryBkTextInputWrapperComponent implements OnChanges {
    @Input() value = '';
    @Input() disabled = false;
    @Input() readonly = false;
    @Input() required = false;
    @Input() errors: Record<string, unknown> | null = null;
    @Input() placeholder = '';

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
        if (changes['error']) {
            this.context.setErrors(this.errors ? this.errors : null);
        }
    }
}

export default {
    title: 'Inputs/BkTextInput',
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
        errors: {control: 'object'}
    }
} as Meta<StoryBkTextInputWrapperComponent>;

const Template: StoryFn<StoryBkTextInputWrapperComponent> = (args: StoryBkTextInputWrapperComponent) => ({props: args});

export const Default = Template.bind({});
Default.args = {
    value: 'Hello',
    disabled: false,
    readonly: false,
    required: false,
    placeholder: 'Enter text...'
};

export const Disabled = Template.bind({});
Disabled.args = {
    value: 'Disabled input',
    disabled: true
};

export const Readonly = Template.bind({});
Readonly.args = {
    value: 'Readonly input',
    readonly: true
};

export const Required = Template.bind({});
Required.args = {
    value: '',
    required: true,
    placeholder: 'Required field'
};

export const WithError = Template.bind({});
WithError.args = {
    value: 'Invalid',
    errors: {required: 'This field is required'},
};
