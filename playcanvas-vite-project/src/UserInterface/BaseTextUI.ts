import * as pc from 'playcanvas';
import { AssetManager } from '../Utils/AssetManager';

 export class BaseTextUI extends pc.Entity {
    constructor(fontSize: number = 42, initialText: string = '0',  pivot: pc.Vec2 = new pc.Vec2(0.5, 0.5),anchor: pc.Vec4 = new pc.Vec4(0.5, 0.5,0.5, 0.5)) {
        super();
        this.setElement(fontSize, initialText,pivot, anchor);
    }

    protected setElement(fontSize: number, initialText: string , pivot: pc.Vec2, anchor: pc.Vec4) {
        this.addComponent('element', {
            pivot: pivot,
            anchor: anchor,
            fontAsset: AssetManager.getInstance().getAsset('fontArial'),
            fontSize: fontSize,
            text: initialText,
            type: pc.ELEMENTTYPE_TEXT
        });
    }

    protected setText(text: string) {
        if (this.element) {
            this.element.text = text;
        }
    }
}