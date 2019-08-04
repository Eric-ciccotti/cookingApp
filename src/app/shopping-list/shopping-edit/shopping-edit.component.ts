import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('amountInput', {static: true}) amountInputRef: ElementRef;

  onAdd(nameInput) {
    const ingredientAmount = this.amountInputRef.nativeElement.value;
      // selection de la valeur de l'élement avec viewChild

    const ingredientName = nameInput.value;
    // selection de la valeur de l'élement en la faisant passer par la méthode

    const newIngredient = new Ingredient(ingredientName, ingredientAmount);
    // creation d'un nouvelle objet basé sur la classe 'Ingredient'
    
    this.shoppingListService.onAddIngredient(newIngredient);
  }



  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
  }

}
