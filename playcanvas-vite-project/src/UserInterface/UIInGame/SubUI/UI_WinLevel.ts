import * as pc from 'playcanvas'
import { AssetManager } from '../../../Utils/AssetManager';
import { GameManger } from '../../../GameManager';
import { UIBaseSubUI } from './UI_BaseSubUI';
import { SafeKeyAsset } from '../../../Helper/SafeKeyAsset';


export class UIWinLevel extends UIBaseSubUI {
    private img_win!: pc.Entity;

    constructor(app: pc.Application) {
        super(app);
        this.setIconWin();
        this.setTitle();
    }

    protected setElement() {
        super.setElement();
        this.element?.on('click', () => {
            console.log("click something");
            GameManger.getInstance().nextLevel();
        });
    }

    private setTitle() {
        this.txt_title.element!.text = 'Level Success';
        this.txt_title.element!.anchor = new pc.Vec4(0.5,1,0.5,1);
        this.txt_title.setLocalPosition(0, -300, 0);
    }

    private setIconWin() {
        this.img_win = new pc.Entity("Icon Win");
        this.addChild(this.img_win);
        this.img_win.addComponent('element', {
            anchor: [0.5, 1, 0.5, 1],
            pivot: [0.5, 1],
            width: 200,
            height: 100,
            type: pc.ELEMENTTYPE_IMAGE,
            useInput: false,
            color: new pc.Color(1, 1, 1),
            textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGIconWin),
        });
        this.img_win.setLocalPosition(0, -100, 0);
    }
}