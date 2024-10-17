import * as pc from 'playcanvas'
import { AssetManager } from '../../Utils/AssetManager';
import { IUIController } from '../IUiController';
import { GameManger } from '../../GameManager';
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';


export class UiLoseGame extends pc.Entity implements IUIController
{   
    private app : pc.Application;
    private txt_title !: pc.Entity;
    private icon_Lose !: pc.Entity;
    private btn_BacktoMain !: pc.Entity;
    private btn_PlayAgain !: pc.Entity;
    private btn_nextWithDimons !:pc.Entity;
    constructor(app : pc.Application)
    {
        super();
        this.app = app;
        this.setElement();
       // this.setUpTitle();
        this.setIconLose();
        this.setButtonBackMenu();
        this.setButtonPlayAgain();
        this.setButtonNextLevelWithDimond();
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

    private setUpTitle()
    {
        this.txt_title = new pc.Entity('TextSuccess');
        this.addChild(this.txt_title);
        this.txt_title.addComponent('element', {
            type: pc.ELEMENTTYPE_TEXT,
            anchor: [0.5, 1, 0.5, 1],
            pivot: [0.5, 1],
            fontAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.FontCreanBeige),
            fontSize: 40,
            text: 'Lose',
        });
        this.txt_title.setLocalPosition(0, -200, 0);
    }

    private setIconLose() {
        this.icon_Lose = new pc.Entity("Icon Win");
        this.addChild(this.icon_Lose);
        this.icon_Lose.addComponent('element', {
            anchor: [0.5, 1, 0.5, 1],
            pivot: [0.5, 1],
            width: 200,
            height: 100,
            type: pc.ELEMENTTYPE_IMAGE,
            useInput: false,
            color: new pc.Color(1, 1, 1),
            textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGIConLose),
        });
        this.icon_Lose.setLocalPosition(0, -100, 0);
    }


    private setButtonBackMenu()
    {
        this.btn_BacktoMain = new pc.Entity('BackMenu');
        this.addChild(this.btn_BacktoMain);
        this.btn_BacktoMain.addComponent('button');
        this.btn_BacktoMain.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: 50,
            height: 50,
            type: pc.ELEMENTTYPE_IMAGE,
            useInput: true,
            color: new pc.Color(1, 1, 1),
            textureAsset : AssetManager.getInstance().getAsset(SafeKeyAsset.IMGBackToMenU),
        });

        this.btn_BacktoMain.setLocalPosition(-100,0,0);

        if(this.btn_BacktoMain.button == null) return;
        this.btn_BacktoMain.button.on('click', ()=>{
            console.log("click back menu");
            EventManager.emit(SafeKeyEvent.OpenUIMainMenu);
            GameManger.getInstance().setUpBegin();
        });
    }


    private setButtonPlayAgain()
    {
        this.btn_PlayAgain = new pc.Entity('BackMenu');
        this.addChild(this.btn_PlayAgain);
        this.btn_PlayAgain.addComponent('button');
        this.btn_PlayAgain.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: 50,
            height: 50,
            type: pc.ELEMENTTYPE_IMAGE,
            useInput: true,
            color: new pc.Color(1, 1, 1),
            textureAsset : AssetManager.getInstance().getAsset(SafeKeyAsset.IMGBtnPlayAgain),
        });

        this.btn_PlayAgain.setLocalPosition(0,0,0);
        

        if(this.btn_PlayAgain.button == null) return;
        this.btn_PlayAgain.button.on('click', () =>
        {
            GameManger.getInstance().reload();
        });
    }

    private setButtonNextLevelWithDimond()
    {
        this.btn_nextWithDimons = new pc.Entity('BackMenu');
        this.addChild(this.btn_nextWithDimons);
        this.btn_nextWithDimons.addComponent('button');
        this.btn_nextWithDimons.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: 50,
            height: 50,
            type: pc.ELEMENTTYPE_IMAGE,
            useInput: true,
            color: new pc.Color(1, 1, 1),
            textureAsset : AssetManager.getInstance().getAsset(SafeKeyAsset.IMGRevive),
        });

        this.btn_nextWithDimons.setLocalPosition(100,0,0);


        if(this.btn_nextWithDimons.button == null) return;
        this.btn_nextWithDimons.button.on('click', () =>
            {
                console.log("chuc nang nay chua co")
            });
    }

    Open(): void {
        this.enabled = true;
    }

    Close(): void {
        this.enabled = false;
    }


}