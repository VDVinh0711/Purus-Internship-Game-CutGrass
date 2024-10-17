import * as pc from 'playcanvas'
import { BaseButtonUI } from "../../BaseButtonUI";
import { EventManager } from '../../../Utils/Observer';
import { SafeKeyEvent } from '../../../Helper/SafeKeyEvent';



export class BtnExit extends BaseButtonUI {
    constructor() {
        super({
            width: 50,
            height: 50,
            textureAsset: 'srpiteButtonPlay',
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
            console.log("exit setting");
            EventManager.emit(SafeKeyEvent.CloseUISetting);
        });
    }
}