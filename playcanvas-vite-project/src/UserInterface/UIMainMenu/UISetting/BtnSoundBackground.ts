import { BaseButtonUI } from '../../BaseButtonUI';
export class BtnSoundBackground extends BaseButtonUI
{
    constructor()
    {
        super({
            width: 50,
            height: 50,
            textureAsset: 'srpiteButtonPlay',
        });

        this.setButtonOnClick();
    }

    private setButtonOnClick()
    {
        if (this.button == null) return;
        this.button.on('click', () => {
           console.log(" button sound background Click")
        });
    }
}