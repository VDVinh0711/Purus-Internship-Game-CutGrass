import * as pc from 'playcanvas'
import { AssetManager } from '../../Utils/AssetManager';
import { ScoreManager } from '../../Player/ScoreManager';

export class TextScoreMainMenu extends pc.Entity {
    constructor() {
        super();
        this.setElement();
        this.init();
        
    }
    public init()
    {
        this.setElement();
        this.setTextScore(ScoreManager.getInstance().getSCore());
    }

    private setElement() {

        this.addComponent('element', {
            pivot: new pc.Vec2(0.5, 0.5),
            anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
            fontAsset: AssetManager.getInstance().getAsset('fontArial'),
            fontSize: 42,
            text: '100',
            type: pc.ELEMENTTYPE_TEXT
        });
    }

    private setTextScore(score : number)
    {
        if(this.element == null) return;
        this.element.text = "Score : " + score;
    }
}