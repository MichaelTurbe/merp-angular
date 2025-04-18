import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DiceService } from './types/services/dice.service';
import { AppSignalStore } from './types/services/app-signal.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'merp-angular';
  constructor(private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private appSignalStore: AppSignalStore,
    protected diceService: DiceService,
  ) {

  }

  public navigateToMyCharacters() {
    this.router.navigate(["/"]);
  }

  ngOnInit() {
    const diceCanvas = this.document.getElementById("diceCanvas") as HTMLCanvasElement;
    this.diceService.initialize(diceCanvas);
  }
}
