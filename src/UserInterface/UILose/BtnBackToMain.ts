import { GameManger } from '../../GameManager';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';
import { EventManager } from '../../Utils/Observer';
import { BaseButtonUI } from '../BaseButtonUI';

export class BtnBackMainMenu extends BaseButtonUI {
    constructor() {
        super({
            width: 60,
            height: 60,
            textureAsset:SafeKeyAsset.IMGBackToMenU,
        });
        this.setButtonOnclick();
    }

    private setButtonOnclick() {
        if (this.button == null) return;
        this.button.on('click', function () {
            EventManager.emit(SafeKeyEvent.PlaySoundSFXBTN);
             GameManger.getInstance().exitGame();
           
        });
    }
}