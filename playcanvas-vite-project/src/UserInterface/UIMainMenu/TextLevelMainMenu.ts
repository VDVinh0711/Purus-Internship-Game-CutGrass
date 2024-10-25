import { LevelManager } from '../../Level/LevelManager';
import { BaseTextUI } from '../BaseTextUI';
import * as pc from 'playcanvas'

export class TextLevelMainMenu extends BaseTextUI {
    constructor() {
        super();
        this.setTextColor();
        this.init();
    }


    
    private setTextColor()
    {
        if(this.element != null)
        {
            this.element.color = new pc.Color(255/255,167/255,38/255)
        }
    }
    public init() {
        this.setTextLevel(LevelManager.getInstance().getCurrentLevel());
    }

    private setTextLevel(level: number) {
        this.setText(`Level: ${level + 1}`);
    }
}