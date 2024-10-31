import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';
import { AssetManager } from '../../Utils/AssetManager';
import { EventManager } from '../../Utils/Observer';
import { BaseButtonUI } from '../BaseButtonUI';
export class BtnSoundBackground extends BaseButtonUI
{

   
    constructor()
    {
        super({
            width: 50,
            height: 50,
            textureAsset: SafeKeyAsset.IMGButtonSoundBG,
        });
        this.setButtonOnClick();
        EventManager.on(SafeKeyEvent.OnChangeVolumeSoundBG,this.changeIConSoungBG.bind(this));
        
    }


    private changeIConSoungBG(volume : number)
    {
        if(this.element == null) return;
        const texureIMG = volume == 1 ? AssetManager.getInstance().getAsset(SafeKeyAsset.IMGButtonSoundBG)?.id!
                            : AssetManager.getInstance().getAsset(SafeKeyAsset.IMGBtnCloseSoundBG)?.id!
        this.element.textureAsset = texureIMG;
    }

    private setButtonOnClick()
    {
        if (this.button == null) return;
        this.button.on('click', () => {
           EventManager.emit(SafeKeyEvent.PlaySoundSFXBTN);
           EventManager.emit(SafeKeyEvent.OnTogleSoundBG)
        });
    }
}