import * as pc from 'playcanvas'
import { BaseButtonUI } from "../BaseButtonUI";
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';



export class BtnExit extends BaseButtonUI {
    constructor() {
        super({
            width: 50,
            height: 50,
            textureAsset: SafeKeyAsset.IMGButtonCLose,
        });
        this.setAnchorPivot();
        this.setButtonOnclick();
    }

    private setAnchorPivot()
    {
        if(this.element == null) return;
        this.element.anchor = new pc.Vec4(1,1,1,1);
        this.element.pivot = new pc.Vec2(1,1);
    }
    private setButtonOnclick() {
        if (this.button == null) return;
        this.button.on('click', () => {
            EventManager.emit(SafeKeyEvent.PlaySoundSFXBTN);
            EventManager.emit(SafeKeyEvent.CloseUISetting);
            EventManager.emit(SafeKeyEvent.OpenUIMainMenu);
        });
    }
}