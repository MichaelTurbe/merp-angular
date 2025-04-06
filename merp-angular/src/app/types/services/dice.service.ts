import { Injectable, signal, WritableSignal } from "@angular/core";
import { ThreeDDice, IApiResponse, ITheme, IRoll, ThreeDDiceRollEvent, DiceEventCallback, RollEventCallback, IDiceRollOptions, IDiceRoll, DiceEvent, parseRollEquation } from 'dddice-js';
import { ToastService } from "./toast.service";


@Injectable({ providedIn: 'root' })
export class DiceService {
  private dddice!: ThreeDDice;
  rolling: WritableSignal<boolean> = signal<boolean>(false);
  connected: WritableSignal<boolean> = signal<boolean>(false);

  constructor(private toastService: ToastService) {

  }

  initialize(diceCanvas: HTMLCanvasElement) {
    if (!this.connected()) {
      this.dddice = new ThreeDDice(diceCanvas, "deQXuEpEDtNq3LX7V9dv4UCWJw9d63l83BUqjV4B");
      this.dddice.start();
      this.dddice.connect("VYlOjZK");
      this.connected.set(true);

      this.dddice.on(ThreeDDiceRollEvent.RollFinished, (event: IRoll) => {
        let message = 'GM rolled: ';
        if (event.label) {
          message = event.label!;
        }
        const calculationString = this.getRollCalculation(event);
        this.toastService.showToast(`${message} ${event.total_value} ${calculationString}`);
      });
    } else {
      console.log('already connected');
    }
  }

  executeRoll(characterName: string, skillType: string, rollType: string, bonus: number) {
    if (this.connected() && !this.rolling()) {
      console.log('in roll');
      const { dice } = parseRollEquation(`1d100+${bonus}`, 'bloodreign-first-anniversary');
      console.log(dice);
      // const modifier: string = bonus.toString();
      const options = {
        label: `${characterName} made a ${skillType} (${rollType}) roll:`
      } as IDiceRollOptions;
      // const diceRoll1 = {
      //   // theme: this.currentDiceSetId,
      //   type: "d100",

      // } as IDiceRoll;

      // const diceRoll2 = {
      //   // theme: this.currentDiceSetId,
      //   type: "mod",
      //   value: modifier
      // } as unknown as IDiceRoll;

      // this.rolling.set(true);
      this.dddice.roll(dice, options);
      //?
      this.rolling.set(false);
    } else { console.log('chill your fuckin cheese'); }
  }

  getRollCalculation(event: IRoll) {
    console.log(event);
    let calculationString: string = '';
    if (event.values && (event.values.length === 3)) {
      calculationString = `(d100 + ${event.values[2].value})`;
    }
    return calculationString;
  }
}
