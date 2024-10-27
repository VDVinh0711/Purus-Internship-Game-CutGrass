import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';
import { EventManager } from '../../Utils/Observer';
import { BaseButtonUI } from '../BaseButtonUI';

export class BtnShop extends BaseButtonUI {
    constructor() {
        super({
            width: 100,
            height: 100,
            textureAsset:SafeKeyAsset.IMGBtnShop,
        });
        this.setButtonOnclick();
    }

    private setButtonOnclick() {
        if (this.button == null) return;
        this.button.on('click', function () {
            EventManager.emit(SafeKeyEvent.PlaySoundSFXBTN);
            EventManager.emit(SafeKeyEvent.OpenUIShop);
        });
    }
}