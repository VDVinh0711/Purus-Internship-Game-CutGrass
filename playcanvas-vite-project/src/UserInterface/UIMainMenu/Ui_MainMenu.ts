import * as pc from 'playcanvas'
import { BtnPlay } from './BtnPlay';
import { BtnSetting } from './BtnSetting';
import { TextScoreMainMenu } from './TextScoreMainMenu';
import { TextLevelMainMenu } from './TextLevelMainMenu';
import { IUIController } from '../IUiController';
import { UISetting } from './UISetting/UISetting';
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';

export class UIMainMenu extends pc.Entity  implements IUIController
{
    private app : pc.Application;
    private btn_Play !: BtnPlay;
    private btn_Setting !: BtnSetting;
    private txt_Score !: TextScoreMainMenu;
    private txt_Level !: TextLevelMainMenu;

    private uiSetting !: UISetting;

    constructor(app : pc.Application)
    {
        super();

        this.app = app;
        this.setElement();
        this.setUpBegin();
       this.init();
       this.registerEvent();

       
    }


    private registerEvent()
    {
        EventManager.on(SafeKeyEvent.OpenUISetting, this.OpenUiSetting.bind(this));
        EventManager.on(SafeKeyEvent.CloseUISetting, this.CloseUISetting.bind(this));
    }

    private setElement()
    {
        this.addComponent('element', {
            anchor: [0, 0, 1, 1],
            pivot: [0.5, 0.5],
            width: this.app.graphicsDevice.width,
            height: this.app.graphicsDevice.height,
            type: pc.ELEMENTTYPE_GROUP
        });
    }

    private setUpBegin()
    {
        this.btn_Play = new BtnPlay();
        this.addChild(this.btn_Play);

        this.btn_Setting = new BtnSetting();
        this.addChild(this.btn_Setting);
        this.btn_Setting.setLocalPosition(0,-100,0);
        
        this.txt_Score = new TextScoreMainMenu();
        this.addChild(this.txt_Score);
        this.txt_Score.setLocalPosition(0,100,0);

        this.txt_Level = new TextLevelMainMenu();
        this.addChild(this.txt_Level);
        this.txt_Level.setLocalPosition(0,200,0);


        this.uiSetting = new UISetting();
        this.addChild(this.uiSetting);
        this.uiSetting.enabled = false;
    }


    private init()
    {
        this.txt_Score.init();
        this.txt_Level.init();
    }


    private OpenUiSetting()
    {
        this.uiSetting.enabled = true;
    }
    private CloseUISetting()
    {
        this.uiSetting.enabled = false;
    }

    Open(): void {
      
        this.init();
        this.enabled = true;
    }

    Close(): void {
        this.enabled = false;
    }
}