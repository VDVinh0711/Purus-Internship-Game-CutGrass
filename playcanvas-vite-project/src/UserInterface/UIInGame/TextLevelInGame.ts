import * as pc from 'playcanvas'
import { LevelManager } from '../../Level/LevelManager';
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';
import { BaseTextUI } from '../BaseTextUI';

export class TextLevelInGame extends BaseTextUI {
    constructor() {
        super(24, '0',new pc.Vec2(0,1), new pc.Vec4(0,1,0,1));
        this.init();
        this.registerEvent();
    }

    private registerEvent()
    {
        EventManager.on(SafeKeyEvent.OnChangeLevel, this.setTextLevel.bind(this));
    }

    public init()
    {
        this.setTextLevel(LevelManager.getInstance().getCurrentLevel());
    }
   
    private setTextLevel(level : number)
    {
        if(this.element == null) return;
        this.element.text = "Level :  " + (level +1);
    }
}