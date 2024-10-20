import { GameManger } from '../../GameManager';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import { BaseButtonUI } from '../BaseButtonUI';

export class BtnPlayAgain extends BaseButtonUI {
    constructor() {
        super({
            width: 60,
            height: 60,
            textureAsset:SafeKeyAsset.IMGBtnPlayAgain,
        });
        this.setButtonOnclick();
    }

    private setButtonOnclick() {
        if (this.button == null) return;
        this.button.on('click', function () {
            GameManger.getInstance().reload();
        });
    }
}