import {BkButtonContext, injectBkButton} from './bk-button.context';

describe('BkButtonContext', () => {
  let ctx: BkButtonContext;

  describe('default and config state', () => {
    it('should initialize with default state when no config is passed', () => {
      ctx = injectBkButton();
      expect(ctx.label()).toBe('');
      expect(ctx.disabled()).toBe(false);
      expect(ctx.loading()).toBe(false);
      expect(ctx.disabledReason()).toBe('');
    });

    it('should initialize with empty config object', () => {
      ctx = injectBkButton({});
      expect(ctx.label()).toBe('');
      expect(ctx.disabled()).toBe(false);
      expect(ctx.loading()).toBe(false);
      expect(ctx.disabledReason()).toBe('');
    });

    it('should initialize with partial config', () => {
      ctx = injectBkButton({label: 'My Button'});
      expect(ctx.label()).toBe('My Button');
      expect(ctx.disabled()).toBe(false);
      expect(ctx.loading()).toBe(false);
      expect(ctx.disabledReason()).toBe('');
    });

    it('should initialize with full config', () => {
      const mockClick = jest.fn();
      const mockFocus = jest.fn();
      const mockBlur = jest.fn();

      ctx = injectBkButton({
        label: 'Save',
        disabled: true,
        loading: true,
        disabledReason: 'Form invalid',
        onClick: mockClick,
        onFocus: mockFocus,
        onBlur: mockBlur,
      });

      expect(ctx.label()).toBe('Save');
      expect(ctx.disabled()).toBe(true);
      expect(ctx.loading()).toBe(true);
      expect(ctx.disabledReason()).toBe('Form invalid');
    });
  });

  describe('interaction behavior', () => {
    it('should prevent click if disabled or loading', () => {
      const mockClick = jest.fn();
      ctx = injectBkButton({disabled: true, loading: true, onClick: mockClick});
      ctx.click(new MouseEvent('click'));
      expect(mockClick).not.toHaveBeenCalled();
    });

    it('should invoke click handler when not disabled/loading', () => {
      const mockClick = jest.fn();
      ctx = injectBkButton({onClick: mockClick});
      ctx.click(new MouseEvent('click'));
      expect(mockClick).toHaveBeenCalledTimes(1);
    });

    it('should invoke focus handler', () => {
      const mockFocus = jest.fn();
      ctx = injectBkButton({onFocus: mockFocus});
      ctx.focus(new FocusEvent('focus'));
      expect(mockFocus).toHaveBeenCalled();
    });

    it('should invoke blur handler', () => {
      const mockBlur = jest.fn();
      ctx = injectBkButton({onBlur: mockBlur});
      ctx.blur(new FocusEvent('blur'));
      expect(mockBlur).toHaveBeenCalled();
    });
  });

  describe('dynamic state changes', () => {
    beforeEach(() => {
      ctx = injectBkButton();
    });

    it('should update label', () => {
      ctx.setLabel('A');
      expect(ctx.label()).toBe('A');
    });

    it('should update disabled', () => {
      ctx.setDisabled(true);
      expect(ctx.disabled()).toBe(true);
      ctx.setDisabled(false);
      expect(ctx.disabled()).toBe(false);
    });

    it('should update loading', () => {
      ctx.setLoading(true);
      expect(ctx.loading()).toBe(true);
      ctx.setLoading(false);
      expect(ctx.loading()).toBe(false);
    });

    it('should update disabled reason independently of disabled state', () => {
      ctx.setDisabledReason('reason');
      expect(ctx.disabledReason()).toBe('reason');
      ctx.setDisabled(true);
      expect(ctx.disabledReason()).toBe('reason');
    });
  });

  describe('isolation', () => {
    it('should not share state between instances', () => {
      const a = injectBkButton({label: 'one', disabled: true});
      const b = injectBkButton({label: 'two', disabled: false});
      expect(a.label()).toBe('one');
      expect(b.label()).toBe('two');
      expect(a.disabled()).toBe(true);
      expect(b.disabled()).toBe(false);

      a.setLabel('ONE');
      b.setLabel('TWO');
      expect(a.label()).toBe('ONE');
      expect(b.label()).toBe('TWO');
    });
  });
});
