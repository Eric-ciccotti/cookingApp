import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;

  ngOnInit() {
    console.log(this.recipe);
  }

  // constructor(private router: Router, private route: ActivatedRoute) {}

  // onNaviguate(index: number) {
  //   this.router.navigate([index], {relativeTo: this.route});
  // }

  // méthode pour acceder à une route à partir du fichier ts

}
