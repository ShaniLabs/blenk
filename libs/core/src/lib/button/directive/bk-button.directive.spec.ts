import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {BkButtonDirective} from './bk-button.directive';
import {injectBkButton} from '../context';

@Component({
  standalone: true,
  imports: [BkButtonDirective],
  template: `
    <button [bkButton]="ctx">{{ ctx.label() }}</button>`,
})
class HostComponent {
  onClickSpy = jest.fn();
  onFocusSpy = jest.fn();
  onBlurSpy = jest.fn();

  ctx = injectBkButton({
    label: 'Click Me',
    onClick: this.onClickSpy,
    onFocus: this.onFocusSpy,
    onBlur: this.onBlurSpy
  });
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
    buttonDe = fixture.debugElement.query(By.css('button'));
    buttonEl = buttonDe.nativeElement;

    fixture.detectChanges();
  });

  it('should create directive', () => {
    expect(buttonDe).toBeTruthy();
  });

  it('should initialize with provided label', () => {
    expect(buttonEl.getAttribute('aria-label')).toBe('Click Me');
  });

  it('should update disabled and aria-disabled attributes', () => {
    hostComp.ctx.setDisabled(true);
    fixture.detectChanges();

    expect(buttonEl.disabled).toBe(true);
    expect(buttonEl.getAttribute('aria-disabled')).toBe('true');

    hostComp.ctx.setDisabled(false);
    fixture.detectChanges();

    expect(buttonEl.disabled).toBe(false);
    expect(buttonEl.getAttribute('aria-disabled')).toBe('false');
  });

  it('should update aria-busy based on loading state', () => {
    hostComp.ctx.setLoading(true);
    fixture.detectChanges();

    expect(buttonEl.getAttribute('aria-busy')).toBe('true');

    hostComp.ctx.setLoading(false);
    fixture.detectChanges();

    expect(buttonEl.getAttribute('aria-busy')).toBe('false');
  });

  it('should set the title based on disabled reason when disabled', () => {
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

    beforeEach(() => {
      clickEvent = new MouseEvent('click', {bubbles: true});
    });

    it('should invoke click handler if not disabled', () => {
      hostComp.ctx.setDisabled(false);
      fixture.detectChanges();

      buttonEl.dispatchEvent(clickEvent);
      fixture.detectChanges();

      expect(hostComp.onClickSpy).toHaveBeenCalled();
    });

    it('should prevent click event if disabled', () => {
      hostComp.ctx.setDisabled(true);
      fixture.detectChanges();

      const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault');

      buttonEl.dispatchEvent(clickEvent);
      fixture.detectChanges();

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(hostComp.onClickSpy).not.toHaveBeenCalled();
    });
  });

  describe('focus and blur handling', () => {
    let focusEvent: FocusEvent;
    let blurEvent: FocusEvent;

    beforeEach(() => {
      focusEvent = new FocusEvent('focus');
      blurEvent = new FocusEvent('blur');
    });

    it('should invoke focus handler on button focus', () => {
      buttonEl.dispatchEvent(focusEvent);
      fixture.detectChanges();

      expect(hostComp.onFocusSpy).toHaveBeenCalled();
    });

    it('should invoke blur handler on button blur', () => {
      buttonEl.dispatchEvent(blurEvent);
      fixture.detectChanges();

      expect(hostComp.onBlurSpy).toHaveBeenCalled();
    });
  });
});
