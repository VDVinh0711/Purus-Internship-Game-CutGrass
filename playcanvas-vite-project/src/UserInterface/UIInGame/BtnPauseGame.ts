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
        this.setAnchorPivot();
        this.setButtonOnclick();
        this.setLocalPosition(-20,0,0);
    }

    private setAnchorPivot()
    {
        if(this.element == null) return;
        this.element.anchor = new pc.Vec4(1,1,1,1);
        this.element.pivot = new pc.Vec2(1,1);
    }
    private setButtonOnclick() {
        if (this.button == null) return;
        this.button.on('click', (event: pc.ElementInputEvent) => {
            console.log("btn click");
            event.stopPropagation();
            EventManager.emit(SafeKeyEvent.SetPauseBlade);
            EventManager.emit(SafeKeyEvent.OPenUIPauseGame);
        });
    }
}