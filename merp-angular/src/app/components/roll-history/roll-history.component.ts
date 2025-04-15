import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roll-history',
  imports: [],
  templateUrl: './roll-history.component.html',
  styleUrl: './roll-history.component.css'
})
export class RollHistoryComponent {
  private router: Router;

  public navigateToMyCharacters() {
    this.router.navigate(["/"]);
  }

  public navigateToRollHistory() {
    this.router.navigate(["/rollHistory"]);
  }

}
