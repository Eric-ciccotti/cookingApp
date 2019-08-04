import { Directive, ElementRef, Input, HostListener, HostBinding} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})

export class DropdownDirective {
@HostListener('click') onClick() {
  this.isOpen = !this.isOpen;
}

@HostBinding('class.open') isOpen: boolean;
// la class 'open' sera binder selon la valeur de isOpen

// @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
//   this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
// }

@HostListener('focusout') closeDropDown() {
  this.isOpen = false;
}
// si il y a n'y a plus de focus sur l'élement alors il se ferme

// si il y a un click sur le document, on récupère cette evenement
  constructor(private elRef: ElementRef) {}
}
