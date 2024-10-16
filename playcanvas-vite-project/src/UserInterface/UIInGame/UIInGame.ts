import * as pc from 'playcanvas'
import { IUIController } from '../IUiController';
import { TextScoreInGame } from './TextScoreInGame';
import { TextLevelInGame } from './TextLevelInGame';
import { TextMapInGame } from './TextMapInGame';
import { UIWinLevel } from './SubUI/UI_WinLevel';
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';
import { UIWinMap } from './SubUI/UI_Winmap';

export class UIInGame extends pc.Entity implements IUIController
{
    private app : pc.Application;
    private txt_Score !: TextScoreInGame;
    private txt_Level !: TextLevelInGame;
    private txt_Map !: TextMapInGame;

    private uiWinLevel !: UIWinLevel;
    private uiWinMap !: UIWinMap;



    constructor(app : pc.Application)
    {
        super();
        this.app = app;
        this.registerEvent();
        this.setElement();
        this.setUpBegin();
    }


    private registerEvent()
    {
        EventManager.on(SafeKeyEvent.OpenUIWinLevel, this.OpenUIWinLevel.bind(this));
        EventManager.on(SafeKeyEvent.CloseUIWinLevel, this.CloseUiWinLevel.bind(this));

        EventManager.on(SafeKeyEvent.OpenUIWinMap, this.OpenUIWinMap.bind(this));
        EventManager.on(SafeKeyEvent.CloseUIWinMap, this.CloseUiWinMap.bind(this));
    }

    private setElement()
    {
        this.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],  
            pivot: [0.5, 0.5],       
            width:this.app.graphicsDevice.width,
            height: this.app.graphicsDevice.height,          
            type: pc.ELEMENTTYPE_GROUP
        });
    }

    private setUpBegin()
    {
        const margiin = 50;
              
        this.txt_Score = new TextScoreInGame();
        this.addChild(this.txt_Score);
        this.txt_Score.setLocalPosition(0,0,0);
       
        this.txt_Level = new TextLevelInGame();
        this.addChild(this.txt_Level);
        this.txt_Level.setLocalPosition(0,-margiin ,0);

        this.txt_Map = new TextMapInGame();
        this.addChild(this.txt_Map);
        this.txt_Map.setLocalPosition(0,-margiin *2,0);


        this.uiWinLevel = new UIWinLevel(this.app);
        this.addChild(this.uiWinLevel);
        this.uiWinLevel.enabled = false;

        this.uiWinMap = new UIWinMap(this.app);
        this.addChild(this.uiWinMap);
        this.uiWinMap.enabled = false;

    }



    private init()
    {
        this.txt_Level.init();
        this.txt_Score.init();
        this.txt_Map.init();
    }



    private OpenUIWinLevel()
    {
        this.uiWinLevel.enabled = true;
    }
    private CloseUiWinLevel()
    {
        this.uiWinLevel.enabled = false;
    }

    private OpenUIWinMap()
    {
        this.uiWinMap.enabled = true;
    }
    private CloseUiWinMap()
    {
        this.uiWinMap.enabled = false;
    }

    Open(): void {
        this.init();
        this.enabled = true;
    }

    Close(): void {
       
        this.enabled = false;
    }
}