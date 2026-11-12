import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appCopyright]'
})
export class Copyright {

  constructor(el: ElementRef) {
    const currentYear = new Date().getFullYear();
    const targetEl: HTMLElement = el.nativeElement;

    targetEl.classList.add('copyright');
    targetEl.textContent = `Copyright © ${currentYear} Alle Rechte vorbehalten.`;
   }

}
