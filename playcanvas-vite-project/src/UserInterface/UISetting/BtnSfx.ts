
import { BaseButtonUI } from '../BaseButtonUI';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
export class BtnSFX extends BaseButtonUI
{
    constructor()
    {
        super({
            width: 50,
            height: 50,
            textureAsset: SafeKeyAsset.IMGButtonSoundSFX,
        });
        this.setButtonOnClick();
    }

    private setButtonOnClick()
    {
        if (this.button == null) return;
        this.button.on('click', () => {
           console.log("sfx button Click")
        });
    }
}