import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceHolder]'
})

export class PlaceHolderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
  // viewContainerRef va permettre d'avoir la référence, et obtenir des informations à l'endroit où cette directive est ensuite utilisée
}
