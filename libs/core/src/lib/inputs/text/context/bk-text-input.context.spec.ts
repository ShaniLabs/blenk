import {BkTextInputContext, injectBkTextInput} from './index';

describe('BkTextInputContext', () => {
  describe('Default State', () => {
    let ctx: BkTextInputContext;

    beforeEach(() => {
      ctx = injectBkTextInput();
    });

    it('should initialise to a clean empty state', () => {
      expect(ctx.value()).toBe('');
      expect(ctx.dirty()).toBe(false);
      expect(ctx.touched()).toBe(false);
      expect(ctx.disabled()).toBe(false);
      expect(ctx.required()).toBe(false);
      expect(ctx.readonly()).toBe(false);
      expect(ctx.errors()).toBeNull();
      expect(ctx.valid()).toBe(true);
      expect(ctx.hasValue()).toBe(false);
      expect(ctx.label()).toBe('');
      expect(ctx.placeholder()).toBeUndefined();
    });
  });

  it('inject with configuration', () => {
    const context = injectBkTextInput({
      initialValue: 'init',
      disabled: true,
      required: true,
      readonly: true,
      errors: {required: true},
      label: 'Email',
      placeholder: 'Enter email',
    });

    expect(context.value()).toBe('init');
    expect(context.disabled()).toBe(true);
    expect(context.required()).toBe(true);
    expect(context.readonly()).toBe(true);
    expect(context.errors()).toEqual({required: true});
    expect(context.label()).toBe('Email');
    expect(context.placeholder()).toBe('Enter email');
    expect(context.valid()).toBe(false);
    expect(context.hasValue()).toBe(true);
  })

  describe('Configuration Scenarios', () => {
    it('should respect initial configuration', () => {
      const ctx = new BkTextInputContext({
        initialValue: 'init',
        disabled: true,
        required: true,
        readonly: true,
        errors: {required: true},
        label: 'Email',
        placeholder: 'Enter email'
      });

      expect(ctx.value()).toBe('init');
      expect(ctx.disabled()).toBe(true);
      expect(ctx.required()).toBe(true);
      expect(ctx.readonly()).toBe(true);
      expect(ctx.errors()).toEqual({required: true});
      expect(ctx.label()).toBe('Email');
      expect(ctx.placeholder()).toBe('Enter email');
      expect(ctx.valid()).toBe(false);
      expect(ctx.hasValue()).toBe(true);
    });

    it('should not override initial value on setValue if readonly', () => {
      const ctx = new BkTextInputContext({initialValue: 'locked', readonly: true});
      ctx.setValue('new');
      expect(ctx.value()).toBe('locked');
      expect(ctx.dirty()).toBe(false);
    });
  });

  describe('Input Behaviour', () => {
    it('should update value and mark dirty', () => {
      const ctx = new BkTextInputContext({initialValue: 'init'});
      ctx.setValue('changed');
      expect(ctx.value()).toBe('changed');
      expect(ctx.dirty()).toBe(true);
    });

    it('should set hasValue to true for non-empty strings', () => {
      const ctx = new BkTextInputContext();
      ctx.setValue('something');
      expect(ctx.hasValue()).toBe(true);
    });

    it('should reset to the initial value and clear state', () => {
      const ctx = new BkTextInputContext({initialValue: 'reset-me'});
      ctx.setValue('changed');
      ctx.setErrors({invalid: true});
      ctx.blur();          // marks as touched
      ctx.reset();

      expect(ctx.value()).toBe('reset-me');
      expect(ctx.dirty()).toBe(false);
      expect(ctx.errors()).toBeNull();
      expect(ctx.touched()).toBe(false);
    });

    it('should not mark dirty if setting the same value', () => {
      const ctx = new BkTextInputContext({initialValue: 'same'});
      ctx.setValue('same');
      expect(ctx.dirty()).toBe(false);
    });
  });

  describe('Validation & Errors', () => {
    it('should set and clear errors', () => {
      const ctx = new BkTextInputContext();
      ctx.setErrors({custom: 'error'});
      expect(ctx.errors()).toEqual({custom: 'error'});
      expect(ctx.valid()).toBe(false);

      ctx.setErrors(null);
      expect(ctx.errors()).toBeNull();
      expect(ctx.valid()).toBe(true);
    });
  });

  describe('Focus & Blur', () => {
    it('invokes onFocus and keeps touched false', () => {
      const onFocus = jest.fn();
      const ctx = new BkTextInputContext({onFocus});
      ctx.focus();
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(ctx.touched()).toBe(false);
    });

    it('invokes onBlur and marks touched', () => {
      const onBlur = jest.fn();
      const ctx = new BkTextInputContext({onBlur});
      ctx.blur();
      expect(onBlur).toHaveBeenCalledTimes(1);
      expect(ctx.touched()).toBe(true);
    });

    it('keeps touched true on subsequent blurs', () => {
      const ctx = new BkTextInputContext();
      ctx.blur();
      ctx.blur();
      expect(ctx.touched()).toBe(true);
    });
  });

  describe('Other Setters', () => {
    it('should update placeholder and label dynamically', () => {
      const ctx = new BkTextInputContext();
      ctx.setPlaceholder('type here');
      ctx.setLabel('Username');
      expect(ctx.placeholder()).toBe('type here');
      expect(ctx.label()).toBe('Username');
    });

    it('should update disabled, required, and readonly flags', () => {
      const ctx = new BkTextInputContext();
      ctx.setDisabled(true);
      ctx.setRequired(true);
      ctx.setReadonly(true);

      expect(ctx.disabled()).toBe(true);
      expect(ctx.required()).toBe(true);
      expect(ctx.readonly()).toBe(true);
    });
  });
});
