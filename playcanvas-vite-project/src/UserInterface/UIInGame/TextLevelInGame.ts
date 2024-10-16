import * as pc from 'playcanvas'
import { AssetManager } from '../../Utils/AssetManager';
import { LevelManager } from '../../Level/LevelManager';
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';

export class TextLevelInGame extends pc.Entity {
    constructor() {
        super();
        this.setElement();
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

    private setTextLevel(level : number)
    {
        if(this.element == null) return;
        this.element.text = "Level :  " + level;
    }
}