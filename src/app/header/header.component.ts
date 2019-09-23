import { Component, OnInit, OnDestroy, EventEmitter } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user
      // this.isAuthenticated = !user ? false : true -->meme chose que !!user
      console.log(!user);
      console.log(!!user);
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  // @Output() menuSelected = new EventEmitter<string>();

  // onSelect(menu: string) {
  //   this.menuSelected.emit(menu);
  // }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();

  }
}
