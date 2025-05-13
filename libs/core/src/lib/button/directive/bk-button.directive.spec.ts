import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BkButtonDirective } from '@blenk/core';
import { BkButtonContext } from '@blenk/core';

@Component({
  standalone: true,
  imports: [BkButtonDirective],
  template: `
    <button [bkButton]="ctx"></button>
  `,
})
class HostComponent {
  ctx = new BkButtonContext();
}

describe('BkButtonDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let hostComp: HostComponent;
  let buttonDe: DebugElement;
  let buttonEl: HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
    });

    fixture = TestBed.createComponent(HostComponent);
    hostComp = fixture.componentInstance;
    fixture.detectChanges();

    buttonDe = fixture.debugElement.query(By.css('button'));
    buttonEl = buttonDe.nativeElement;
  });

  it('should bind disabled and aria-disabled to context.disabled()', () => {
    expect(buttonEl.disabled).toBe(false);
    expect(buttonEl.getAttribute('aria-disabled')).toBe('false');

    hostComp.ctx.setDisabled(true);
    fixture.detectChanges();

    expect(buttonEl.disabled).toBe(true);
    expect(buttonEl.getAttribute('aria-disabled')).toBe('true');
  });

  it('should bind aria-busy to context.loading()', () => {
    expect(buttonEl.getAttribute('aria-busy')).toBe('false');

    hostComp.ctx.setLoading(true);
    fixture.detectChanges();

    expect(buttonEl.getAttribute('aria-busy')).toBe('true');
  });

  it('should bind aria-label to context.label()', () => {
    hostComp.ctx.setLabel('Save');
    fixture.detectChanges();

    expect(buttonEl.getAttribute('aria-label')).toBe('Save');
  });

  it('should bind title to context.disabledReason() when disabled', () => {
    hostComp.ctx.setDisabledReason('Not allowed');
    hostComp.ctx.setDisabled(true);
    fixture.detectChanges();

    expect(buttonEl.title).toBe('Not allowed');

    hostComp.ctx.setDisabled(false);
    fixture.detectChanges();

    expect(buttonEl.title).toBe('');
  });

  describe('click handling', () => {
    let clickEvent: MouseEvent;
    let clickSpy: jest.SpyInstance<void, [MouseEvent]>;

    beforeEach(() => {
      clickSpy = jest.spyOn(hostComp.ctx, 'click');
      clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    });

    it('invokes context.click when enabled & not loading', () => {
      hostComp.ctx.setDisabled(false);
      hostComp.ctx.setLoading(false);
      fixture.detectChanges();

      buttonDe.triggerEventHandler('click', clickEvent)
      expect(clickEvent.defaultPrevented).toBe(false);
      expect(clickSpy).toHaveBeenCalledWith(clickEvent);
    });

    it('prevents default and does not call click when disabled', () => {
      hostComp.ctx.setDisabled(true);
      hostComp.ctx.setLoading(false);
      fixture.detectChanges();

      buttonDe.triggerEventHandler('click', clickEvent)
      expect(clickEvent.defaultPrevented).toBe(true);
      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('prevents default and does not call click when loading', () => {
      hostComp.ctx.setDisabled(false);
      hostComp.ctx.setLoading(true);
      fixture.detectChanges();

      buttonDe.triggerEventHandler('click', clickEvent)
      expect(clickEvent.defaultPrevented).toBe(true);
      expect(clickSpy).not.toHaveBeenCalled();
    });
  });
});
