import * as pc from 'playcanvas'
import { AssetManager } from '../../Utils/AssetManager';
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';
import { ScoreManager } from '../../Player/ScoreManager';

export class TextScoreInGame extends pc.Entity {
    constructor() {
        super();
        this.setElement();
        this.init();
        this.registerEvent();
    }


    private registerEvent()
    {
        EventManager.on(SafeKeyEvent.OnChangeScore, this.setTextScore.bind(this));
    }

    public init()
    {
        this.setTextScore(ScoreManager.getInstance().getSCore());
    }
   

    private setElement() {
        this.addComponent('element', {
            anchor: [0, 1, 0, 1], 
            pivot: [0, 1],       
            fontAsset: AssetManager.getInstance().getAsset('fontArial'),
            fontSize: 24,
            text: '0',
            type: pc.ELEMENTTYPE_TEXT,
           
        });
    }

    private setTextScore(score : number)
    {
        if(this.element == null) return;
        this.element.text = "Score :  " + score;
    }
}