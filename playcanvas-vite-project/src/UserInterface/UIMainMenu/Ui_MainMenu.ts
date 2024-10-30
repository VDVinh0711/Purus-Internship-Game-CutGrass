import * as pc from 'playcanvas'
import { BtnPlay } from './BtnPlay';
import { BtnSetting } from './BtnSetting';
import { TextScoreMainMenu } from './TextScoreMainMenu';
import { TextLevelMainMenu } from './TextLevelMainMenu';
import { IUIController } from '../IUiController';
import { UIShowDimond } from './UIShowDimondMainMenu';

import { BtnShop } from './BtnShop';
import { BtnCredit } from './BtnCredit';

export class UIMainMenu extends pc.Entity implements IUIController {
    private app: pc.Application;
    private btn_Play!: BtnPlay;
    private btn_Setting!: BtnSetting;
    private btn_credit !: BtnCredit;
    private txt_Score!: TextScoreMainMenu;
    private txt_Level!: TextLevelMainMenu;
    private uiShowDimond!: UIShowDimond;
    private btn_shop !: BtnShop;
    
    

    constructor(app: pc.Application) {
        super();

        this.app = app;
        this.setElement();
        this.setUpBegin();
        this.init();
       
    }

    private setElement() {
        this.addComponent('element', {
            anchor: [0, 0, 1, 1],
            pivot: [0.5, 0.5],
            width: this.app.graphicsDevice.width,
            height: this.app.graphicsDevice.height,
            type: pc.ELEMENTTYPE_GROUP
        });
    }

   

    private setUpBegin() {
        //Btn Play
        this.btn_Play = new BtnPlay();
        this.addChild(this.btn_Play);
        this.btn_Play.setLocalPosition(0, -50, 0);

        //Btn setting
        this.btn_Setting = new BtnSetting();
        this.addChild(this.btn_Setting);
       

        //Btn Shop
        this.btn_shop = new BtnShop();
        this.addChild(this.btn_shop);
       

        //Btn Credit
        this.btn_credit = new BtnCredit()
        this.addChild(this.btn_credit);
       

        //Text Score
        this.txt_Score = new TextScoreMainMenu();
        this.addChild(this.txt_Score);
        this.txt_Score.setLocalPosition(0, 300, 0);

        //Text Level
        this.txt_Level = new TextLevelMainMenu();
        this.addChild(this.txt_Level);
        this.txt_Level.setLocalPosition(0, 400, 0);

        //Text Dimond
        this.uiShowDimond = new UIShowDimond();
        this.addChild(this.uiShowDimond);
        this.uiShowDimond.setLocalPosition(0, 200, 0);


        this.updateResizeWindow();
    }

    public update(dt : number)
    {
        this.btn_Play.update(dt);
    }


    private init() {
        this.txt_Score.init();
        this.txt_Level.init();
        this.uiShowDimond.init();
    }

    Open(): void {
        this.init();
        this.enabled = true;
    }

    Close(): void {
        this.enabled = false;
    }



    private updateResizeWindow()
    {
        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;

        if(innerWidth < innerHeight)
        {
            this.btn_credit.setAnchorPivot(new pc.Vec4(0,0,0,0), new pc.Vec2(0,0));
            this.btn_credit.setLocalPosition(0,0,0);

            this.btn_Setting.setAnchorPivot(new pc.Vec4(1,0,1,0), new pc.Vec2(1,0));
            this.btn_Setting.setLocalPosition(0,0,0);

          
            this.btn_shop.setAnchorPivot(  new pc.Vec4(0.5,0,0.5,0), new pc.Vec2(0.5,0))
            this.btn_shop.setLocalPosition(0,0,0);
        }
        else
        {
            this.btn_credit.setAnchorPivot(new pc.Vec4(0.5,0.5,0.5,0.5), new pc.Vec2(0.5,0.5));
            this.btn_credit.setLocalPosition(0,-300,0);


            this.btn_Setting.setAnchorPivot(new pc.Vec4(0.5,0.5,0.5,0.5), new pc.Vec2(0.5,0.5));
            this.btn_Setting.setLocalPosition(100, -200, 0);

          
            this.btn_shop.setAnchorPivot(new pc.Vec4(0.5,0.5,0.5,0.5), new pc.Vec2(0.5,0.5))
            this.btn_shop.setLocalPosition(-100, -200, 0);
        }
    }
}