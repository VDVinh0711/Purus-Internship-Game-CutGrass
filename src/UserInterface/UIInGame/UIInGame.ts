import * as pc from 'playcanvas'
import { IUIController } from '../IUiController';
import { TextScoreInGame } from './TextScoreInGame';
import { TextLevelInGame } from './TextLevelInGame';
import { TextMapInGame } from './TextMapInGame';
import { UIWinLevel } from './SubUI/UI_WinLevel';
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';
import { UIWinMap } from './SubUI/UI_Winmap';
import { UIBladeStat } from './UIBladeStats';
import { BtnPauseGame } from './BtnPauseGame';

export class UIInGame extends pc.Entity implements IUIController {
    private app: pc.Application;
    private txt_Score !: TextScoreInGame;
    private txt_Level !: TextLevelInGame;
    private txt_Map !: TextMapInGame;
    private uiWinLevel !: UIWinLevel;
    private uiWinMap !: UIWinMap;
    private uiStats !: UIBladeStat;
    private btnPauseGame !: BtnPauseGame;

    private paddingtxtInfo : number = 60;
    private sizeText : number = 35;

    private readonly paddingUIInGame : number = 20;

   

    constructor(app: pc.Application) {
        super();
        this.app = app;
        this.registerEvent();
        this.setElement();
        this.setUpBegin();
    }


    private registerEvent() {
        EventManager.on(SafeKeyEvent.OpenUIWinLevel, this.OpenUIWinLevel.bind(this));
        EventManager.on(SafeKeyEvent.CloseUIWinLevel, this.CloseUiWinLevel.bind(this));

        EventManager.on(SafeKeyEvent.OpenUIWinMap, this.OpenUIWinMap.bind(this));
        EventManager.on(SafeKeyEvent.CloseUIWinMap, this.CloseUiWinMap.bind(this));

        EventManager.on(SafeKeyEvent.OpenUIStats, this.OpenUIStat.bind(this));
        EventManager.on(SafeKeyEvent.CloseUIStats, this.CloseUIStat.bind(this));
    }

    private setElement() {
        this.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: this.app.graphicsDevice.width-this.paddingUIInGame,
            height: this.app.graphicsDevice.height-this.paddingUIInGame,
            type: pc.ELEMENTTYPE_GROUP,
            useInput : false,
        });
    }

    private setUpBegin() {
        

        this.updateResizeWindow();

        this.txt_Score = new TextScoreInGame();
        this.addChild(this.txt_Score);
        this.txt_Score.setSizeText(this.sizeText);
        this.txt_Score.setLocalPosition(0, 0, 0);

        this.txt_Level = new TextLevelInGame();
        this.addChild(this.txt_Level);
        this.txt_Level.setSizeText(this.sizeText);
        this.txt_Level.setLocalPosition(0, -this.paddingtxtInfo, 0);

        this.txt_Map = new TextMapInGame();
        this.addChild(this.txt_Map);
        this.txt_Map.setSizeText(this.sizeText);
        this.txt_Map.setLocalPosition(0, -this.paddingtxtInfo * 2, 0);

        this.uiWinLevel = new UIWinLevel(this.app);
        this.addChild(this.uiWinLevel);
        this.uiWinLevel.enabled = false;

        this.uiWinMap = new UIWinMap(this.app);
        this.addChild(this.uiWinMap);
        this.uiWinMap.enabled = false;

        this.uiStats = new UIBladeStat();
        this.addChild(this.uiStats);
        this.uiStats.enabled = false;

        this.btnPauseGame = new BtnPauseGame();
        this.addChild(this.btnPauseGame);
    }



    private init() {
        this.txt_Level.init();
        this.txt_Score.init();
        this.txt_Map.init();
    }



    private OpenUIWinLevel() {
        this.btnPauseGame.enabled =false;
        this.uiWinLevel.enabled = true;
    }
    private CloseUiWinLevel() {
        this.uiWinLevel.enabled = false;
        this.btnPauseGame.enabled =true;
    }

    private OpenUIWinMap() {
        this.btnPauseGame.enabled =false;
        this.uiWinMap.enabled = true;
    }
    private CloseUiWinMap() {
        this.uiWinMap.enabled = false;
        this.btnPauseGame.enabled =true;
    }


    private OpenUIStat() {
        this.uiStats.Open();
    }
    private CloseUIStat() {
        this.uiStats.Close();
    }

    Open(): void {
        this.init();
        this.enabled = true;
    }

    Close(): void {
        this.enabled = false;
    }



    public update()
    {
        this.uiStats.update();
    }

    private updateResizeWindow()
    {
        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;

        if(innerWidth < innerHeight)
        {
           this.sizeText = 25;
           this.paddingtxtInfo = 35;

        }
        else
        {
            this.sizeText = 35;
            this.paddingtxtInfo = 60;
        }
    }
}