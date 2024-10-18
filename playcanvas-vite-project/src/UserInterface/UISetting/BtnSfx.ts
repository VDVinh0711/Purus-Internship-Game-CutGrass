
import { BaseButtonUI } from '../BaseButtonUI';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import * as pc from 'playcanvas'
import { AssetManager } from '../../Utils/AssetManager';
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
      //  this.setIcon();
    }


    private setIcon()
    {
        if(this.element == null) return;
        this.element.textureAsset = AssetManager.getInstance().getAsset(SafeKeyAsset.IMGButtonSoundSFX)?.resource.renderAsset;
    }
    private setButtonOnClick()
    {
        if (this.button == null) return;
        this.button.on('click', () => {
           console.log("sfx button Click")
        });
    }
}