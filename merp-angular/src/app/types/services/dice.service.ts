import { Injectable, signal, WritableSignal } from "@angular/core";
import { ThreeDDice, IApiResponse, ITheme, IRoll, ThreeDDiceRollEvent, DiceEventCallback, RollEventCallback, IDiceRollOptions, IDiceRoll, DiceEvent, parseRollEquation, IEngineConfig, ThreeDDiceAPI } from 'dddice-js';
import { ToastService } from "./toast.service";
import { DiceSet } from "../models/DiceSet";
import { PreferenceDataService } from "./preference.data.service";
import { AppSignalStore } from "./app-signal.store";
import { SystemDataService } from "./system.data.service";
import { DiceRollDataService } from "./dice-roll.data.service";
import { DiceRoll } from "../models/DiceRoll";


@Injectable({ providedIn: 'root' })
export class DiceService {
  private dddice!: ThreeDDice;
  private dddiceApi!: ThreeDDiceAPI;
  rolling: WritableSignal<boolean> = signal<boolean>(false);
  connected: WritableSignal<boolean> = signal<boolean>(false);
  currentDiceSetSignal: WritableSignal<DiceSet>;
  private currentCharacterName: string = '';

  constructor(private toastService: ToastService,
    private appSignalStore: AppSignalStore,
    private preferenceDataService: PreferenceDataService,
    private systemDataService: SystemDataService,
    private diceRollDataService: DiceRollDataService
  ) {
    this.currentDiceSetSignal = appSignalStore.GetCurrentDiceSetSignal();
  }

  initialize(diceCanvas: HTMLCanvasElement) {
    try {
      if (!this.connected()) {
        this.dddice = new ThreeDDice(diceCanvas, "deQXuEpEDtNq3LX7V9dv4UCWJw9d63l83BUqjV4B");
        this.dddice.setConfig({ audio: false } as Partial<IEngineConfig>);
        this.dddice.start();
        this.dddice.connect("VYlOjZK");

        this.dddice.api.onConnect((event => {
          console.log('onConnect', event);
        }));

        this.dddice.api.onParticipantConnect((event => {
          console.log('onParticipantConnect', event);
        }));

        this.dddice.api.onParticipantDisconnect((event => {
          console.log('onParticipantDisconnect', event);
        }));

        this.dddice.on(ThreeDDiceRollEvent.RollFinished, (event: IRoll) => {
          console.log(event);

          let message = 'GM rolled: ';
          if (event.label) {
            message = event.label!;
          }
          const rollResult: RollResult = this.getRollCalculation(event);
          let calculationString = `${rollResult.actualTotal} (${rollResult.calculationString})`;
          let diceRoll: DiceRoll = {
            uuid: event.uuid,
            label: message,
            time: event.updated_at,
            equation: rollResult.calculationString,
            result: rollResult.actualTotal,
            onesNumber: rollResult.ones,
            tensNumber: rollResult.tens
          } as DiceRoll;
          this.diceRollDataService.addDiceRoll(diceRoll);

          //it was my roll
          if (event.external_id == this.currentCharacterName) {
            this.rolling.set(false);
          }
          this.toastService.showToast(`${message} ${calculationString})`);
        });

        this.dddice.api.onConnectionError((event => {
          console.log('onConnectionError', event);
        }));

        this.dddice.api.onConnectionStateChange((event => {
          console.log('onConnectionStateChange', event);
          if (event == 'connected') {
            this.toastService.showToast("Dice Service Connected", "success", 3000, "bottom-right", "green", "white");
            this.connected.set(true);
          } else {
            this.toastService.showToast(`Dice Service Failed: ${event}`, "error", 3000, "bottom-right", "red", "white");
            this.connected.set(false);
          }
        }));

        // load the dice themes
        this.dddice.api?.diceBox.list().then(result => {
          let dice: Array<DiceSet> = new Array<DiceSet>();
          result.data.map(item => {
            const preview = item.preview.preview;
            let diceCount = Object.keys(item.sizes).length;
            if (diceCount >= 7) {
              const d10 = item.preview.d10;
              const d10x = item.preview.d10x;
              dice.push({ id: item.id, name: item.name, preview: preview, d10: d10, d10x: d10x } as DiceSet);
            }
          });

          this.dddice.api?.diceBox.next().then(result => {
            result.data.map(item => {
              const preview = item.preview.preview;
              let diceCount = Object.keys(item.sizes).length;
              if (diceCount >= 7) {
                const d10 = item.preview.d10;
                const d10x = item.preview.d10x;
                dice.push({ id: item.id, name: item.name, preview: preview, d10: d10, d10x: d10x } as DiceSet);
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
    } catch (e) {
      console.log('caught error:', e);
    }
  }

  executeRoll(characterName: string, skillType: string, rollType: string, bonus: number, universalModifier: number) {
    this.currentCharacterName = characterName;
    let shouldRoll3dDice = this.appSignalStore.Get3dDiceSignal()();
    if (shouldRoll3dDice && this.connected() && !this.rolling()) {
      this.rolling.set(true);
      console.log(`in roll, bonus is ${bonus} and universalModifier is ${universalModifier}`);
      const newBonus: number = bonus + universalModifier;
      const { dice } = parseRollEquation(`1d100+${newBonus}`, this.currentDiceSetSignal().id);
      // const modifier: string = bonus.toString();
      const options = {
        label: `${characterName} made a ${skillType} (${rollType}) roll:`,
        external_id: characterName
      } as IDiceRollOptions;
      this.dddice.roll(dice, options).then(result => {
        console.log(result);
      }).catch(e => {
        console.log('FUCK YOU', e);
        this.toastService.showToast(e, "error", 10000, "bottom-right");
      });

    } else {
      if (!this.rolling()) {
        let label = `${characterName} made a ${skillType} (${rollType}) roll:`;
        if (shouldRoll3dDice && !this.connected()) {
          this.toastService.showToast(`Dice service disconnected, could not roll 3d dice. Rolling manually.`, "error", 3000, "bottom-right", "red", "white");
        }
        let diceRoll = this.rollManually(characterName, skillType, rollType, bonus, universalModifier);
        this.diceRollDataService.addDiceRoll(diceRoll);
        let calculationString = `${diceRoll.result} (${diceRoll.equation})`;
        this.toastService.showToast(`${label} ${calculationString})`);
      }
    }
  }

  getRollCalculation(event: IRoll): RollResult {
    let onesValue: number = 0;
    let rollResult: RollResult = {
      message: '',
      actualTotal: 0,
      modifier: 0,
      rollTotal: 0,
      calculationString: '',
      tens: 0,
      ones: 0
    };
    if (event.values && (event.values.length === 3)) {
      onesValue = parseInt(event.values[0].value_to_display as string);
      if (onesValue === 10) {
        onesValue = 0;
      }
      rollResult.ones = onesValue;
      let tens: number = parseInt(event.values[1].value_to_display as string);
      rollResult.tens = tens;
      rollResult.modifier = event.values[2].value;
      rollResult.rollTotal = tens + onesValue;
      rollResult.actualTotal = rollResult.rollTotal + rollResult.modifier;
      rollResult.calculationString = `${rollResult.rollTotal} ${this.systemDataService.formatBonusPrefix(event.values[2].value)}`;
    } else {

    }
    return rollResult;
  }

  getActualTotal(event: IRoll) {
    let actualTotal = 0;
    let onesValue = 0;
    if (event.values && (event.values.length === 3)) {
      onesValue = parseInt(event.values[0].value_to_display as string);
      let tens: number = parseInt(event.values[1].value_to_display as string);
      if (onesValue === 10) {
        onesValue = 0;
      }
      actualTotal = tens + onesValue;
    }
    return actualTotal;
  }

  secureRandom(min: number, max: number): number {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return min + (array[0] % (max - min + 1));
  }

  private rollManually(characterName: string, skillType: string, rollType: string, bonus: number, universalModifier: number): DiceRoll {
    let label = `${characterName} made a ${skillType} (${rollType}) roll:`;
    let rollResult: RollResult = {
      message: '',
      actualTotal: 0,
      modifier: 0,
      rollTotal: 0,
      calculationString: '',
      tens: 0,
      ones: 0
    };
    const newBonus: number = bonus + universalModifier;
    let d100 = this.secureRandom(1, 100);
    let rollTotal: number = d100 + newBonus;
    let calculationString = `${d100} + ${newBonus}`;

    rollResult.message = label;
    rollResult.actualTotal = rollTotal;
    rollResult.modifier = newBonus;
    rollResult.rollTotal = d100;
    rollResult.calculationString = calculationString;

    let diceRoll: DiceRoll = {
      uuid: "69",
      label: rollResult.message,
      time: new Date().toISOString(),
      equation: rollResult.calculationString,
      result: rollResult.actualTotal,
      onesNumber: rollResult.ones,
      tensNumber: rollResult.tens
    } as DiceRoll;
    return diceRoll;
  }

}

export interface RollResult {
  message: string;
  modifier: number;
  rollTotal: number;
  actualTotal: number;
  calculationString: string;
  tens: number;
  ones: number;
}
