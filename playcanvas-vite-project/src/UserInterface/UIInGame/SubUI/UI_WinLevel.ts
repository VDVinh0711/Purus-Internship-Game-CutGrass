import * as pc from 'playcanvas'
import { AssetManager } from '../../../Utils/AssetManager';
import { GameManger } from '../../../GameManager';


export class UIWinLevel extends pc.Entity {


    private app: pc.Application;
    private txt_success !: pc.Entity;
    private btn_nextLevel !: pc.Entity;
    private img_win !: pc.Entity;


    constructor(app: pc.Application) {
        super();
        this.app = app;

        this.setElement();
        this.setText();
        this.setIconWin();
    }


    private setElement() {
        this.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: this.app.graphicsDevice.width,
            height: this.app.graphicsDevice.height,
            type: pc.ELEMENTTYPE_GROUP,
            useInput: true,
        });


        this.element?.on('click' ,()=>
        {
            console.log("click some thing");
            GameManger.getInstance().nextLevel();
        })


    }


    private setText() {
        this.txt_success = new pc.Entity('TextClearLevle');
        this.addChild(this.txt_success);
        this.txt_success.addComponent('element', {
            type: pc.ELEMENTTYPE_TEXT,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            fontAsset: AssetManager.getInstance().getAsset('fontArial'),
            fontSize: 24,
            text: 'Clear Level',
        })
    }


    private setIconWin() {
        this.img_win = new pc.Entity("Icon Win");
        this.addChild(this.img_win);
        this.addComponent('element',
            {
                anchor: [0.5, 0.5, 0.5, 0.5],
                pivot: [0.5, 0.5],
                width: 50,
                height: 50,
                type: pc.ELEMENTTYPE_IMAGE,
                useInput: true,
                color: new pc.Color(1, 1, 1),
                textureAsset: AssetManager.getInstance().getAsset('srpiteButtonPlay'),
            }
        )
    }
}