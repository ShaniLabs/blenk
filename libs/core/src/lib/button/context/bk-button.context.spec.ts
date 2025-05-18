import {BkButtonContext, BkButtonContextConfig} from './bk-button.context';

describe('BkButtonContext', () => {
  let ctx: BkButtonContext;

  beforeEach(() => {
    ctx = new BkButtonContext();
  });

  it('defaults signals to empty/false', () => {
    expect(ctx.label()).toBe('');
    expect(ctx.disabled()).toBe(false);
    expect(ctx.loading()).toBe(false);
    expect(ctx.disabledReason()).toBe('');
  });

  it('initializes only the provided config fields', () => {
    const config: BkButtonContextConfig = {
      label: 'Test',
      // loading and disabledReason undefined
    };
    const c = new BkButtonContext(config);
    expect(c.label()).toBe('Test');
    expect(c.disabled()).toBe(false);
    expect(c.loading()).toBe(false);
    expect(c.disabledReason()).toBe('');
  });

  it('respects full config and blocks click when loading or disabled', () => {
    const mockFn = jest.fn();
    const c = new BkButtonContext({
      label: 'X',
      disabled: true,
      loading: true,
      disabledReason: 'nope',
      onClick: mockFn,
    });
    expect(c.label()).toBe('X');
    expect(c.disabled()).toBe(true);
    expect(c.loading()).toBe(true);
    expect(c.disabledReason()).toBe('nope');

    c.click({} as MouseEvent);
    expect(mockFn).not.toHaveBeenCalled();
  });

  describe('setters & dynamic state changes', () => {
    it('allows dynamic toggling of disabled and then clicking', () => {
      const mockFn = jest.fn();
      const c = new BkButtonContext({onClick: mockFn, disabled: true});
      // initially blocked
      c.click({} as MouseEvent);
      expect(mockFn).not.toHaveBeenCalled();

      // enable and click
      c.setDisabled(false);
      expect(c.disabled()).toBe(false);
      c.click({} as MouseEvent);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('allows enabling/disabling repeatedly', () => {
      ctx.setDisabled(true);
      expect(ctx.disabled()).toBe(true);
      ctx.setDisabled(false);
      expect(ctx.disabled()).toBe(false);
      ctx.setDisabled(true);
      expect(ctx.disabled()).toBe(true);
    });

    it('setLoading properly toggles loading state', () => {
      ctx.setLoading(true);
      expect(ctx.loading()).toBe(true);
      ctx.setLoading(false);
      expect(ctx.loading()).toBe(false);
    });

    it('setDisabledReason operates independently of disabled flag', () => {
      ctx.setDisabledReason('foo');
      expect(ctx.disabledReason()).toBe('foo');
      ctx.setDisabled(true);
      expect(ctx.disabledReason()).toBe('foo');
    });

    it('setLabel updates label correctly', () => {
      ctx.setLabel('A');
      expect(ctx.label()).toBe('A');
      ctx.setLabel('B');
      expect(ctx.label()).toBe('B');
    });
  });

  describe('click()', () => {
    let mockFn: jest.Mock<(e: MouseEvent) => void>;
    let c: BkButtonContext;

    beforeEach(() => {
      mockFn = jest.fn();
      c = new BkButtonContext({onClick: mockFn});
    });

    it('invokes callback when not disabled/loading', () => {
      c.setDisabled(false);
      c.setLoading(false);
      c.click({} as MouseEvent);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('does not throw or call when no callback provided', () => {
      const noCbCtx = new BkButtonContext();
      expect(() => noCbCtx.click({} as MouseEvent)).not.toThrow();
    });

    it('calls callback correctly on multiple consecutive clicks', () => {
      c.setDisabled(false);
      c.setLoading(false);
      c.click({} as MouseEvent);
      c.click({} as MouseEvent);
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('never calls when only one of disabled/loading is true', () => {
      c.setDisabled(true);
      c.setLoading(false);
      c.click({} as MouseEvent);
      c.setDisabled(false);
      c.setLoading(true);
      c.click({} as MouseEvent);
      expect(mockFn).not.toHaveBeenCalled();
    });
  });

  describe('multiple contexts are isolated', () => {
    it('does not share state between distinct instances', () => {
      const first = new BkButtonContext({label: 'one', disabled: true});
      const second = new BkButtonContext({label: 'two', disabled: false});
      expect(first.label()).toBe('one');
      expect(second.label()).toBe('two');
      expect(first.disabled()).toBe(true);
      expect(second.disabled()).toBe(false);

      first.setLabel('1');
      second.setLabel('2');
      expect(first.label()).toBe('1');
      expect(second.label()).toBe('2');
    });
  });
});
