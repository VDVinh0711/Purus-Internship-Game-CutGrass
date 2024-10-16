import * as pc from 'playcanvas'
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';
import { ScoreManager } from '../../Player/ScoreManager';
import { BaseTextUI } from '../BaseTextUI';

export class TextScoreInGame extends BaseTextUI {
    constructor() {
        super(24, '0',new pc.Vec2(0,1), new pc.Vec4(0,1,0,1));
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
   
    private setTextScore(score : number)
    {
        if(this.element == null) return;
        this.element.text = "Score :  " + score;
    }
}