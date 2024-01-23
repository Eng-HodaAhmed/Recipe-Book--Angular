import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDropdownToggle]'
})
export class DropdownToggleDirective {
  @HostBinding('class.open')isOpen=false;
  constructor(private elemRef:ElementRef) { 
  }
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elemRef.nativeElement.contains(event.target) ?!this.isOpen : false;
  }
  // @HostListener("click")toggle(){
  //   this.isOpen=!this.isOpen;
  // }
  

}
