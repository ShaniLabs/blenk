import {BkTextInputContext} from './index';

describe('BkTextInputContext', () => {
  describe('Default State', () => {
    let ctx: BkTextInputContext;

    beforeEach(() => {
      ctx = new BkTextInputContext();
    });

    it('should initialize to default empty state', () => {
      expect(ctx.value()).toBe('');
      expect(ctx.dirty()).toBe(false);
      expect(ctx.touched()).toBe(false);
      expect(ctx.focused()).toBe(false);
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

  describe('Input Behavior', () => {
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

    it('should reset to initial value and clear state', () => {
      const ctx = new BkTextInputContext({initialValue: 'reset-me'});
      ctx.setValue('changed');
      ctx.setErrors({invalid: true});
      ctx.focus();
      ctx.blur();
      ctx.reset();

      expect(ctx.value()).toBe('reset-me');
      expect(ctx.dirty()).toBe(false);
      expect(ctx.errors()).toBeNull();
      expect(ctx.focused()).toBe(false);
      expect(ctx.touched()).toBe(false);
    });

    it('should not re-mark dirty if setting same value', () => {
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

  describe('Focus & Touched State', () => {
    it('should mark focused on focus', () => {
      const ctx = new BkTextInputContext();
      ctx.focus();
      expect(ctx.focused()).toBe(true);
    });

    it('should mark touched on blur after focus', () => {
      const ctx = new BkTextInputContext();
      ctx.focus();
      ctx.blur();
      expect(ctx.focused()).toBe(false);
      expect(ctx.touched()).toBe(true);
    });

    it('should not mark touched on blur without focus', () => {
      const ctx = new BkTextInputContext();
      ctx.blur();
      expect(ctx.touched()).toBe(false);
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
