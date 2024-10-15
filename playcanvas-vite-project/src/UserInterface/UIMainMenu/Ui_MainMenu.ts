import * as pc from 'playcanvas'
import { IUI } from '../IU';
import { BtnPlay } from './BtnPlay';
import { BtnSetting } from './BtnSetting';
import { TextScoreMainMenu } from './TextScoreMainMenu';
import { TextLevelMainMenu } from './TextLevelMainMenu';

export class UIMainMenu extends pc.Entity implements IUI
{
    private btn_Play: BtnPlay;
    private btn_Setting : BtnSetting;
    private txt_Score : TextScoreMainMenu;
    private txt_Level : TextLevelMainMenu;

    constructor()
    {
        super();
        this.addComponent('element', {
            anchor: [0, 0, 1, 1],
            pivot: [0.5, 0.5],
            width: 1280,
            height: 720,
            type: pc.ELEMENTTYPE_GROUP
        });

        this.btn_Play = new BtnPlay();
        this.addChild(this.btn_Play);

        this.btn_Setting = new BtnSetting();
        this.addChild(this.btn_Setting);
        this.btn_Setting.setLocalPosition(0,-100,0);

        this.txt_Score = new TextScoreMainMenu();
        this.addChild(this.txt_Score);
        this.txt_Score.setLocalPosition(200,0,0);


        this.txt_Level = new TextLevelMainMenu();
        this.addChild(this.txt_Level);
        this.txt_Score.setLocalPosition(200,0,0);
    }

    Open(): void {
        console.log("Call open"); 
        this.enabled = true;
    }

    Close(): void {
        console.log("Call close");
        this.enabled = false;
    }
}