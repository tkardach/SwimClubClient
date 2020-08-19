import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[hover-over]'
})
export class HoverOverDirective {

  constructor(public elementRef:ElementRef) { }
  @Input('hover-over') hoverOver:any;  

  @HostListener('mouseenter') onMouseEnter() {
    this.elementRef.nativeElement.classList.add(this.hoverOver);
 }

  @HostListener('mouseleave') onMouseLeave() {
    this.elementRef.nativeElement.classList.remove(this.hoverOver);
  }

}