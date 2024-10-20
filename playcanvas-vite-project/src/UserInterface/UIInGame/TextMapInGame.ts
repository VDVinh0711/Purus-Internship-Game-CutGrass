import * as pc from 'playcanvas'
import { LevelManager } from '../../Level/LevelManager';
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';
import { BaseTextUI } from '../BaseTextUI';

export class TextMapInGame extends BaseTextUI {
    constructor() {
        super(30, '0',new pc.Vec2(0,1), new pc.Vec4(0,1,0,1));
        this.init();
        this.setColorText();
        this.registerEvent();
    }


    private setColorText()
    {
        if(this.element)
        {
            this.element.color = new pc.Color(211/255,111/255,12/255);
        }
    }
    private registerEvent()
    {
        EventManager.on(SafeKeyEvent.OnChangeMap, this.setTextMap.bind(this));
    }

    public init()
    { 
        this.setTextMap(LevelManager.getInstance().getCurrentMap());
    }

    private setTextMap(indexMap : number)
    {
        if(this.element == null) return;
        this.element.text = "Map :  " + (indexMap+1) + "/" + LevelManager.getInstance().getTotalMaps();
    }
}