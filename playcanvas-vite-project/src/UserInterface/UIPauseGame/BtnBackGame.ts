
import { BaseButtonUI } from "../BaseButtonUI";
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';



export class BtnBackGame extends BaseButtonUI {
    constructor() {
        super({
            width: 60,
            height: 60,
            textureAsset: SafeKeyAsset.IMGButtonPlay,
        });
        this.setButtonOnclick();
    }
    private setButtonOnclick() {
        if (this.button == null) return;
        this.button.on('click', () => {
            EventManager.emit(SafeKeyEvent.PlaySoundSFXBTN);
            EventManager.emit(SafeKeyEvent.OpenUIInGame);
            EventManager.emit(SafeKeyEvent.UnSetPauseBlade);
        });
    }
}