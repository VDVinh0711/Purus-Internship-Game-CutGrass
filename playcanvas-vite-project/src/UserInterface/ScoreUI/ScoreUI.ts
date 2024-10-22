import * as pc from 'playcanvas'
import { AssetManager } from '../../Utils/AssetManager';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
export class ScoreUI extends pc.Entity {
    constructor() {
        super();
        this.setUpBegin();
    }


    private setUpBegin() {
        this.addComponent('element',
            {
                type: pc.ELEMENTTYPE_TEXT,
                anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
                pivot: new pc.Vec2(0.5, 0.5),
                fontAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.FontCreanBeige),
                fontSize: 30,
                text: '+30',
               
                useInput: false,
                width: 100,
                height: 30,
            }
        )
    }


    public setTextScore(score: number) {
        if (this.element == null) return;
        this.element.text = `+ ${score}`;
    }
}