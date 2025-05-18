import {Meta, moduleMetadata, StoryFn} from '@storybook/angular';
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {BkTextInputContext, BkTextInputDirective, injectBkTextInput} from '@blenk/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {JsonPipe} from '@angular/common';

@Component({
    standalone: true,
    selector: 'bk-story-text-input-wrapper',
    imports: [BkTextInputDirective, JsonPipe],
    template: `
        <div class="flex flex-col gap-3 w-full max-w-md p-6 border rounded-lg shadow-sm bg-white">
            <label for="textInput" class="font-medium text-sm text-gray-800">{{ context.label() }}</label>

            <input
                    name="textInput"
                    type="text"
                    class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 read-only:bg-gray-50"
                    [bkTextInput]="context"
            />

            <div class="text-xs text-gray-500">
                <div><strong>Value:</strong> {{ context.value() }}</div>
                <div><strong>Dirty:</strong> {{ context.dirty() }}</div>
                <div><strong>Touched:</strong> {{ context.touched() }}</div>
                <div><strong>Focused:</strong> {{ context.focused() }}</div>
                <div><strong>Valid:</strong> {{ context.valid() }}</div>
                <div><strong>Has Value:</strong> {{ context.hasValue() }}</div>
                <div><strong>Disabled:</strong> {{ context.disabled() }}</div>
                <div><strong>Readonly:</strong> {{ context.readonly() }}</div>
            </div>

            @if (!context.valid() && context.touched()) {
                <p class="text-sm text-red-500 mt-1">
                    <strong>Error:</strong> {{ context.errors() | json }}
                </p>
            }

            <pre class="bg-gray-50 border rounded p-3 text-xs mt-3 text-gray-700">{{
                    {
                        value: context.value(),
                        dirty: context.dirty(),
                        touched: context.touched(),
                        focused: context.focused(),
                        valid: context.valid(),
                        hasValue: context.hasValue(),
                        disabled: context.disabled(),
                        readonly: context.readonly(),
                        placeholder: context.placeholder(),
                        label: context.label(),
                        errors: context.errors()
                    } | json
                }}</pre>
        </div>
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
