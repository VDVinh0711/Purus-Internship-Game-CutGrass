import * as pc from 'playcanvas';
import { AssetManager } from '../Utils/AssetManager';
import { SafeKeyAsset } from '../Helper/SafeKeyAsset';

 export class BaseTextUI extends pc.Entity {

    protected fontSize !: number;
    constructor(fontSize: number, initialText: string = '0',  pivot: pc.Vec2 = new pc.Vec2(0.5, 0.5),anchor: pc.Vec4 = new pc.Vec4(0.5, 0.5,0.5, 0.5)) {
        super();
        this.fontSize = fontSize;
        this.setElement(fontSize, initialText,pivot, anchor);
    }

    protected setElement(fontSize: number, initialText: string , pivot: pc.Vec2, anchor: pc.Vec4) {
        this.addComponent('element', {
            pivot: pivot,
            anchor: anchor,
            fontAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.FontCreanBeige),
            fontSize: fontSize,
            text: initialText,
            outlineColor: new pc.Color(0,0,0) ,
            outlineThickness : 0.5,
            type: pc.ELEMENTTYPE_TEXT
        });
    }

    protected setText(text: string) {
        if (this.element) {
            this.element.text = text;
        }
    }

    public setSizeText(size : number)
    {
        if(this.element == null) return;
        this.element.fontSize = size;
    }
      
}