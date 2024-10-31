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
            textureAsset: SafeKeyAsset.IMGButtonCLoseCircle,
        });
        this.setAnchorPivot(new pc.Vec4(1,1,1,1), new pc.Vec2(1,1));
        this.setButtonOnclick();
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