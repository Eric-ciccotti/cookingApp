import {
  Directive,
  ElementRef,
  Input,
  HostListener,
  HostBinding
} from "@angular/core";

@Directive({
  selector: "[appDropdown]"
})
export class DropdownDirective {
  @HostBinding("class.open") isOpen: boolean;
  // la class 'open' sera binder selon la valeur de isOpen

  // @HostListener('click') dropdownEnable() {
  //   this.isOpen = !this.isOpen;
  // }
  // fonctionne mais ne gere pas la fermeture du menu déroulant

  @HostListener("document:click", ["$event"]) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  // si on click n'importe ou sur le document et que ce click ne contient pas
  // l'élement
  //
  // La méthode native Node.contains () renvoie une valeur booléenne indiquant si un nœud
  // est un descendant (nœud enfant, etc.) d'un nœud donné.
  //
  // si l'élément cliqué est un descendant de la liste déroulante,
  // l'état est basculé, sinon la liste déroulante est fermée.

  constructor(private elRef: ElementRef) {}
}
