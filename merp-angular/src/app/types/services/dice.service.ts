import { Injectable, signal, WritableSignal } from "@angular/core";
import { ThreeDDice, IApiResponse, ITheme, IRoll, ThreeDDiceRollEvent, DiceEventCallback, RollEventCallback, IDiceRollOptions, IDiceRoll, DiceEvent, parseRollEquation } from 'dddice-js';
import { ToastService } from "./toast.service";
import { DiceSet } from "../models/DiceSet";
import { PreferenceDataService } from "./preference.data.service";
import { AppSignalStore } from "./app-signal.store";
import { SystemDataService } from "./system.data.service";


@Injectable({ providedIn: 'root' })
export class DiceService {
  private dddice!: ThreeDDice;
  rolling: WritableSignal<boolean> = signal<boolean>(false);
  connected: WritableSignal<boolean> = signal<boolean>(false);
  currentDiceSetSignal: WritableSignal<DiceSet>;

  constructor(private toastService: ToastService,
    private appSignalStore: AppSignalStore,
    private preferenceDataService: PreferenceDataService,
    private systemDataService: SystemDataService
  ) {
    this.currentDiceSetSignal = appSignalStore.GetCurrentDiceSetSignal();
  }

  initialize(diceCanvas: HTMLCanvasElement) {
    console.log('initialize dice');
    if (!this.connected()) {
      console.log("connect!");
      this.dddice = new ThreeDDice(diceCanvas, "deQXuEpEDtNq3LX7V9dv4UCWJw9d63l83BUqjV4B");
      this.dddice.start();
      this.dddice.connect("VYlOjZK");
      console.log('connectedddddd');
      this.connected.set(true);

      this.dddice.on(ThreeDDiceRollEvent.RollFinished, (event: IRoll) => {
        let message = 'GM rolled: ';
        if (event.label) {
          message = event.label!;
        }
        const calculationString = this.getRollCalculation(event);
        this.toastService.showToast(`${message} ${event.total_value} (${calculationString})`);
      });

      // load the dice themes
      this.dddice.api?.diceBox.list().then(result => {
        let dice: Array<DiceSet> = new Array<DiceSet>();
        result.data.map(item => {
          const preview = item.preview.preview;
          let diceCount = Object.keys(item.sizes).length;
          if (diceCount >= 7) {
            dice.push({ id: item.id, name: item.name, preview: preview } as DiceSet);
          }
        });

        this.dddice.api?.diceBox.next().then(result => {
          console.log(result);
          result.data.map(item => {
            const preview = item.preview.preview;
            let diceCount = Object.keys(item.sizes).length;
            if (diceCount >= 7) {
              dice.push({ id: item.id, name: item.name, preview: preview } as DiceSet);
            }

          });
          this.appSignalStore.SetAllDiceSetsSignalValue(dice);
        });


        let currentDiceSet: DiceSet = null;
        let currentDiceSetResult = this.preferenceDataService.GetCurrentDiceSet();
        if (currentDiceSetResult.success) {
          currentDiceSet = currentDiceSetResult.value;

        } else if (dice.length > 0) {
          currentDiceSet = dice[0];

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
    console.log('Connected?', this.connected());
    console.log('Rolling?', this.rolling());
    if (this.connected() && !this.rolling()) {
      this.rolling.set(true);
      console.log('in roll');
      const { dice } = parseRollEquation(`1d100+${bonus}`, this.currentDiceSetSignal().id);
      console.log(dice);
      // const modifier: string = bonus.toString();
      const options = {
        label: `${characterName} made a ${skillType} (${rollType}) roll:`
      } as IDiceRollOptions;
      this.dddice.roll(dice, options);
      //?
      this.rolling.set(false);
    } else { console.log('chill your fuckin cheese'); }
  }

  getRollCalculation(event: IRoll) {
    console.log(event);
    let calculationString: string = '';
    if (event.values && (event.values.length === 3)) {
      let ones: number = parseInt(event.values[0].value_to_display as string);
      let tens: number = parseInt(event.values[1].value_to_display as string);
      let rollTotal: number = tens + ones;
      calculationString = `${rollTotal} ${this.systemDataService.formatBonusPrefix(event.values[2].value)})`;
    }
    return calculationString;
  }
}
