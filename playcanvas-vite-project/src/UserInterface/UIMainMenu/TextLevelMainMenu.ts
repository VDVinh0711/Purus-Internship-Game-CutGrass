import * as pc from 'playcanvas'
import { AssetManager } from '../../Utils/AssetManager';
import { LevelManager } from '../../Level/LevelManager';

export class TextLevelMainMenu extends pc.Entity {
    constructor() {
        super();
        this.setElement();
        this.init();
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