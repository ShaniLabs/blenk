import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BkButtonContext } from '../context';

@Component({
  selector: 'bk-button',
  imports: [CommonModule],
  templateUrl: './bk-button.component.html',
  styleUrl: './bk-button.component.css',
})
export class BkButtonComponent {
  context = input.required<BkButtonContext>();
}
