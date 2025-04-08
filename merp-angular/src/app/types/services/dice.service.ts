import { Injectable, signal, WritableSignal } from "@angular/core";
import { ThreeDDice, IApiResponse, ITheme, IRoll, ThreeDDiceRollEvent, DiceEventCallback, RollEventCallback, IDiceRollOptions, IDiceRoll, DiceEvent, parseRollEquation } from 'dddice-js';
import { ToastService } from "./toast.service";
import { DiceSet } from "../models/DiceSet";
import { PreferenceDataService } from "./preference.data.service";
import { AppSignalStore } from "./app-signal.store";


@Injectable({ providedIn: 'root' })
export class DiceService {
  private dddice!: ThreeDDice;
  rolling: WritableSignal<boolean> = signal<boolean>(false);
  connected: WritableSignal<boolean> = signal<boolean>(false);
  private dice: Array<DiceSet> = new Array<DiceSet>();

  constructor(private toastService: ToastService,
    private appSignalStore: AppSignalStore,
    private preferenceDataService: PreferenceDataService
  ) {

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

      // load the dice themes
      this.dddice.api?.diceBox.list().then(result => {
        result.data.map(item => {
          const preview = item.preview.preview;
          let diceCount = Object.keys(item.sizes).length;
          if (diceCount >= 7) {
            this.dice.push({ id: item.id, name: item.name, preview: preview } as DiceSet);
          }

        });
        this.dddice.api?.diceBox.next().then(result => {
          console.log(result);
          result.data.map(item => {
            const preview = item.preview.preview;
            let diceCount = Object.keys(item.sizes).length;
            if (diceCount >= 7) {
              this.dice.push({ id: item.id, name: item.name, preview: preview } as DiceSet);
            }

          });
        });
        this.appSignalStore.SetAllDiceSetsSignalValue(this.dice);

        let currentDiceSet: DiceSet = null;
        let currentDiceSetResult = this.preferenceDataService.GetCurrentDiceSet();
        if (currentDiceSetResult.success) {
          currentDiceSet = currentDiceSetResult.value;

        } else if (this.dice.length > 0) {
          currentDiceSet = this.dice[0];

        } else {
          currentDiceSet = null;
        }
        this.appSignalStore.SetCurrentDiceSetSignalValue(currentDiceSet);

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
