
import { BaseButtonUI } from '../BaseButtonUI';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import { AssetManager } from '../../Utils/AssetManager';
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';
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
        EventManager.on(SafeKeyEvent.OnChangeVolumeSoundSFX,this.changeIConSFX.bind(this));
      
    }



    private changeIConSFX(volume : number)
    {
        if(this.element == null) return;
        if(this.element == null) return;
        const texureIMG = volume == 1 ? AssetManager.getInstance().getAsset(SafeKeyAsset.IMGButtonSoundSFX)?.id!
                            : AssetManager.getInstance().getAsset(SafeKeyAsset.IMGBtnCloseSoundSFX)?.id!
        this.element.textureAsset = texureIMG;
    }
   
    private setButtonOnClick()
    {
        if (this.button == null) return;
        this.button.on('click', () => {
           EventManager.emit(SafeKeyEvent.PlaySoundSFXBTN);
           EventManager.emit(SafeKeyEvent.OnTogleSoundSFX);
        });
    }
}