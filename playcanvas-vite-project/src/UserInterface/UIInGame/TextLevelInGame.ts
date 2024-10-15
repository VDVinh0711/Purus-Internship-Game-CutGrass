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
            pivot: new pc.Vec2(0.5, 0.5),
            anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
            fontAsset: AssetManager.getInstance().getAsset('fontArial'),
            fontSize: 42,
            text: '0',
            type: pc.ELEMENTTYPE_TEXT
        });
    }

    private setTextLevel(level : number)
    {
        if(this.element == null) return;
        this.element.text = "Level :  " + level;
    }
}