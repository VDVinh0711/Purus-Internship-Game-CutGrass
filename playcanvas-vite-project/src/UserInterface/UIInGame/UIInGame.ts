import * as pc from 'playcanvas'
import { IUIController } from '../IUiController';
import { TextScoreInGame } from './TextScoreInGame';
import { TextLevelInGame } from './TextLevelInGame';
import { TextMapInGame } from './TextMapInGame';

export class UiInGame extends pc.Entity implements IUIController
{
    private app : pc.Application;
    private txt_Score !: TextScoreInGame;
    private txt_Level !: TextLevelInGame;
    private txt_Map !: TextMapInGame;


    constructor(app : pc.Application)
    {
        super();
        this.app = app;
        this.setElement();
        this.setUpBegin();
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
        this.txt_Level = new TextLevelInGame();
        this.addChild(this.txt_Level);
        this.txt_Level.setLocalPosition(200,200,0);


        this.txt_Score = new TextScoreInGame();
        this.addChild(this.txt_Score);
        this.txt_Score.setLocalPosition(-200,200,0);

        this.txt_Map = new TextMapInGame();
        this.addChild(this.txt_Map);
        this.txt_Map.setLocalPosition(0,200,0);
    }



    private init()
    {
        this.txt_Level.init();
        this.txt_Score.init();
        this.txt_Map.init();
    }


    Open(): void {
       
        this.init();
        this.enabled = true;
    }

    Close(): void {
       
        this.enabled = false;
    }
}