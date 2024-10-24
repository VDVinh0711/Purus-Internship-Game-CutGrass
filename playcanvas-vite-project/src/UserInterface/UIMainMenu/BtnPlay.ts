
import { GameManger } from '../../GameManager';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import { BaseButtonUI } from '../BaseButtonUI';
export class BtnPlay extends BaseButtonUI {
    constructor() {
        super({
            width: 150,
            height: 150,
            textureAsset: SafeKeyAsset.IMGButtonPlay,
        });
        this.setButtonOnclick();
    }
    private setButtonOnclick() {
        if (this.button == null) return;
        this.button.on('click', () => {
            GameManger.getInstance().playGame();
        });
    }
}