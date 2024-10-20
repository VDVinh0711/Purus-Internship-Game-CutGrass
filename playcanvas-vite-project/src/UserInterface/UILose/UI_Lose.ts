import * as pc from 'playcanvas'
import { AssetManager } from '../../Utils/AssetManager';
import { IUIController } from '../IUiController';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import { BtnBackMainMenu } from './BtnBackToMain';
import { BtnPlayAgain } from './BtnPlayAgain';
import { TxtScoreLoseGame } from './TxtScoreLoseGame';


export class UiLoseGame extends pc.Entity implements IUIController {
    private app: pc.Application;
    private icon_Lose !: pc.Entity;
    private btn_BacktoMain !: BtnBackMainMenu;
    private btn_PlayAgain !: BtnPlayAgain;
    private btn_nextWithDimons !: pc.Entity;
    private showScore !: TxtScoreLoseGame;
    private background !: pc.Entity;

    constructor(app: pc.Application) {
        super();
        this.app = app;
        this.setElement();

        this.setUpBegin();
        // this.setUpBackGround();
        // this.setUpShowScore();
        //  this.setIconLose();
        // this.setButtonBackMenu();
        // this.setButtonPlayAgain();
        // this.setButtonNextLevelWithDimond();




    }

    private setElement() {
        this.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: 400,
            height: 600,
            type: pc.ELEMENTTYPE_GROUP
        });
    }


    private setUpBegin() {


        this.setUpBackGround();
        this.setIconLose();

        this.showScore = new TxtScoreLoseGame();
        this.addChild(this.showScore);
        this.showScore.setLocalPosition(0, 100, 0);

        this.btn_BacktoMain = new BtnBackMainMenu();
        this.addChild(this.btn_BacktoMain);
        this.btn_BacktoMain.setLocalPosition(-50, 0, 0);

        this.btn_PlayAgain = new BtnPlayAgain();
        this.addChild(this.btn_PlayAgain);
        this.btn_PlayAgain.setLocalPosition(50, 0, 0);
    }
    private setUpBackGround() {
        this.background = new pc.Entity('Background');
        this.addChild(this.background);
        this.background.addComponent('element', {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: 400,
            height: 600,
            color: new pc.Color(1, 1, 1),
            textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.BackGroundWood)
        })
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
        this.icon_Lose.setLocalPosition(0, 0, 0);
    }

    // private setUpShowScore()
    // {
    //     // this.uiShowTextSCore = new UITextScore();
    //     // this.addChild(this.uiShowTextSCore);
    //     // this.uiShowTextSCore.setLocalPosition(0,100,0);


    //     this.showScore  = new pc.Entity("showScore");
    //     this.addChild(this.showScore);
    //     this.showScore.addComponent('element',{
    //         type : pc.ELEMENTTYPE_TEXT,
    //         anchor : [0.5,0.5,0.5,0.5],
    //         pivot:[0.5,0.5],
    //         text : 'Score : 10000',
    //         fontAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.FontCreanBeige),
    //         fontSize : 30,
    //     })
    //     this.showScore.setLocalPosition(0,100,0);
    // }




    // private setButtonBackMenu()
    // {
    //     this.btn_BacktoMain = new pc.Entity('BackMenu');
    //     this.addChild(this.btn_BacktoMain);
    //     this.btn_BacktoMain.addComponent('button');
    //     this.btn_BacktoMain.addComponent('element', {
    //         anchor: [0.5, 0.5, 0.5, 0.5],
    //         pivot: [0.5, 0.5],
    //         width: 60,
    //         height: 60,
    //         type: pc.ELEMENTTYPE_IMAGE,
    //         useInput: true,
    //         color: new pc.Color(1, 1, 1),
    //         textureAsset : AssetManager.getInstance().getAsset(SafeKeyAsset.IMGBackToMenU),
    //     });

    //     this.btn_BacktoMain.setLocalPosition(-100,0,0);

    //     if(this.btn_BacktoMain.button == null) return;
    //     this.btn_BacktoMain.button.on('click', ()=>{
    //         console.log("click back menu");
    //         EventManager.emit(SafeKeyEvent.OpenUIMainMenu);
    //         GameManger.getInstance().setUpBegin();
    //     });
    // }


    // private setButtonPlayAgain()
    // {
    //     this.btn_PlayAgain = new pc.Entity('BackMenu');
    //     this.addChild(this.btn_PlayAgain);
    //     this.btn_PlayAgain.addComponent('button');
    //     this.btn_PlayAgain.addComponent('element', {
    //         anchor: [0.5, 0.5, 0.5, 0.5],
    //         pivot: [0.5, 0.5],
    //         width: 60,
    //         height: 60,
    //         type: pc.ELEMENTTYPE_IMAGE,
    //         useInput: true,
    //         color: new pc.Color(1, 1, 1),
    //         textureAsset : AssetManager.getInstance().getAsset(SafeKeyAsset.IMGBtnPlayAgain),
    //     });

    //     this.btn_PlayAgain.setLocalPosition(0,0,0);


    //     if(this.btn_PlayAgain.button == null) return;
    //     this.btn_PlayAgain.button.on('click', () =>
    //     {
    //         GameManger.getInstance().reload();
    //     });
    // }

    // private setButtonNextLevelWithDimond()
    // {
    //     this.btn_nextWithDimons = new pc.Entity('BackMenu');
    //     this.addChild(this.btn_nextWithDimons);
    //     this.btn_nextWithDimons.addComponent('button');
    //     this.btn_nextWithDimons.addComponent('element', {
    //         anchor: [0.5, 0.5, 0.5, 0.5],
    //         pivot: [0.5, 0.5],
    //         width: 60,
    //         height: 60,
    //         type: pc.ELEMENTTYPE_IMAGE,
    //         useInput: true,
    //         color: new pc.Color(1, 1, 1),
    //         textureAsset : AssetManager.getInstance().getAsset(SafeKeyAsset.IMGRevive),
    //     });

    //     this.btn_nextWithDimons.setLocalPosition(100,0,0);


    //     if(this.btn_nextWithDimons.button == null) return;
    //     this.btn_nextWithDimons.button.on('click', () =>
    //         {
    //             console.log("chuc nang nay chua co")
    //         });
    // }

    Open(): void {
        this.showScore.init();
        this.enabled = true;
    }

    Close(): void {
        this.enabled = false;
    }
}