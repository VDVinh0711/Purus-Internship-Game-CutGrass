import * as pc from "playcanvas";
import { BtnPlayAgain } from "../UILose/BtnPlayAgain";
import { BtnBackMainMenu } from "../UILose/BtnBackToMain";
import { AssetManager } from "../../Utils/AssetManager";
import { SafeKeyAsset } from "../../Helper/SafeKeyAsset";
import { BtnBackGame } from "./BtnBackGame";
import { IUIController } from "../IUiController";
import { EventManager } from "../../Utils/Observer";
import { SafeKeyEvent } from "../../Helper/SafeKeyEvent";
import * as TWEEN from '@tweenjs/tween.js'

export class UIPauseGame extends pc.Entity implements IUIController {
    private app: pc.Application;
    private container!: pc.Entity;
    private btnPlayAgain!: BtnPlayAgain;
    private btnBackMain!: BtnBackMainMenu;
    private background!: pc.Entity;
    private btnBackGame!: BtnBackGame;
    private titlePauseGame!: pc.Entity;
    private overlay!: pc.Entity;
    //Tween

    private tweenIn !: TWEEN.Tween;
    private tweenOut !: TWEEN.Tween;





    private widthContainer : number = 400;
    private heightContainer : number = 300;

    constructor(app: pc.Application) {
        super();
        this.app = app;
        this.setUpElement();
        this.setUpOverlay();
        this.setElementContainer();
        this.setUpContainer();
        this.setUpTweenIn();
        this.setUpTweenOut();
    }

    private setUpElement() {
        this.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width : this.app.graphicsDevice.width,
            height : this.app.graphicsDevice.height,
            type: pc.ELEMENTTYPE_GROUP,
            useInput : true,
        });
    }

    private setElementContainer() {
        this.container = new pc.Entity('container');
        this.addChild(this.container);
        this.container.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: this.widthContainer,
            height: this.heightContainer,
            type: pc.ELEMENTTYPE_GROUP,
            useInput : true,
        });
    }

    private setUpContainer() {
        this.setUpBackGroundContainer();
        this.setTitlePauseGame();

        this.btnPlayAgain = new BtnPlayAgain();
        this.container.addChild(this.btnPlayAgain);
        this.btnPlayAgain.setLocalPosition(0, 0, 0);

        this.btnBackMain = new BtnBackMainMenu();
        this.container.addChild(this.btnBackMain);
        this.btnBackMain.setLocalPosition(-100, 0, 0);

        this.btnBackGame = new BtnBackGame();
        this.container.addChild(this.btnBackGame);
        this.btnBackGame.setLocalPosition(100, 0, 0);
    }

    private setUpBackGroundContainer() {
        this.background = new pc.Entity('Background');
        this.container.addChild(this.background);
        this.background.addComponent('element', {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [0.5, 0.5, 0.5, 0.5], 
            pivot: [0.5, 0.5],
            width : this.widthContainer,
            height : this.heightContainer,
            color: new pc.Color(1, 1, 1),
            textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGBackGroundPaper)
        });
    }

    private setTitlePauseGame() {
        this.titlePauseGame = new pc.Entity('titlePauseGame');
        this.container.addChild(this.titlePauseGame);
        this.titlePauseGame.addComponent('element', {
            anchor: [0.5, 1, 0.5, 1],
            pivot: [0.5, 1],
            width: 250,
            height: 100,
            type: pc.ELEMENTTYPE_IMAGE,
            useInput: false,
            color: new pc.Color(1, 1, 1),
            textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGTilePauseGame),
        });
    }



    private setUpOverlay() {
        this.overlay = new pc.Entity('overlay');
        this.addChild(this.overlay);
        this.overlay.addComponent('element', {
            anchor: [0, 0, 1, 1],
            pivot: [0.5, 0.5],
            width: this.app.graphicsDevice.width,
            height: this.app.graphicsDevice.height,
            type: pc.ELEMENTTYPE_IMAGE,
            useInput: true,
            color: new pc.Color(1,1,1),
            opacity:0,
        });

        this.overlay.element!.on('click', () => {
            EventManager.emit(SafeKeyEvent.UnSetPauseBlade);
            EventManager.emit(SafeKeyEvent.OpenUIInGame);
        });
    }



    private setUpTweenIn()
    {
        const optionStart = {x : 0, y:1000, z:0};
        const optionEnd  = {x: 0, y:0 , z:0};
        
        this.tweenIn = new TWEEN.Tween(optionStart)
        .to(optionEnd,500)
        .easing(TWEEN.Easing.Bounce.Out)
        .onUpdate(()=>
        {
            this.setLocalPosition(optionStart.x,optionStart.y,optionStart.z);
        })
        .yoyo(false)
    }

    private setUpTweenOut()
    {
       
        const optionStart = {x :0, y: 0, z: 0};
        const optionEnd  = {x: 0, y:-1000, z:0};
        
        this.tweenOut = new TWEEN.Tween(optionStart)
        .to(optionEnd,300)
        .easing(TWEEN.Easing.Linear.None)
        .onComplete(()=>
        {
            this.enabled = false;
        })
        .onUpdate(()=>
        {
            this.setLocalPosition(optionStart.x,optionStart.y,optionStart.z);
        })
        .yoyo(false)
    }


    public update()
    {
        if(!this.enabled) return
        if(this.tweenIn.isPlaying())
        {
            this.tweenIn.update();
        }
        if(this.tweenOut.isPlaying())
        {
            this.tweenOut.update();
        }
    }

    Open(): void {
        this.enabled = true;
        this.tweenIn.start();
    }

    Close(): void {
       this.tweenOut.start();
    }
}