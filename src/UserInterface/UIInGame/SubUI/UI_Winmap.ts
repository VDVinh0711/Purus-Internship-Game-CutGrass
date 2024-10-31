import * as pc from 'playcanvas'
import { GameManger } from '../../../GameManager';
import { UIBaseSubUI } from './UI_BaseSubUI';


export class UIWinMap extends UIBaseSubUI {

    constructor(app: pc.Application) {
        super(app);
        this.setTitle();
    }

    protected setElement() {
        super.setElement();
        this.element?.on('click', () => {
            GameManger.getInstance().nextMapInLevel();
        });
    }

    private setTitle() {
        this.txt_title.element!.text = 'ALL Grass Clear';
    }
}