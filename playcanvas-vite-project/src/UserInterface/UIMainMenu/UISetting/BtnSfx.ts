import * as pc from 'playcanvas'
import { BaseButtonUI } from '../../BaseButtonUI';
export class BtnSFX extends BaseButtonUI
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
           console.log("sfx button Click")
        });
    }
}