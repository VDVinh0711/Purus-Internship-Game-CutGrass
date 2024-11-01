import * as pc from 'playcanvas'
import { BaseButtonUI } from "../BaseButtonUI";
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';



export class BtnPauseGame extends BaseButtonUI {
    constructor() {
        super({
            width: 50,
            height: 50,
            textureAsset: SafeKeyAsset.IMGIconPause,
        });
        this.setAnchorPivot(new pc.Vec4(1,1,1,1), new pc.Vec2(1,1));
        this.setButtonOnclick();
      
    }
 
    private setButtonOnclick() {
        if (this.button == null) return;
        this.button.on('click', (event: pc.ElementInputEvent) => {
            event.stopPropagation();
            EventManager.emit(SafeKeyEvent.SetPauseBlade);
            EventManager.emit(SafeKeyEvent.OPenUIPauseGame);
        });
    }
}