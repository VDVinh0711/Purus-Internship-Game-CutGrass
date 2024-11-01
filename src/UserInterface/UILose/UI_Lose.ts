import * as pc from 'playcanvas'
import { AssetManager } from '../../Utils/AssetManager';
import { IUIController } from '../IUiController';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import { BtnBackMainMenu } from './BtnBackToMain';
import { BtnPlayAgain } from './BtnPlayAgain';
import { TxtScoreLoseGame } from './TxtScoreLoseGame';
import * as TWEEN from '@tweenjs/tween.js'

export class UiLoseGame extends pc.Entity implements IUIController {

    private icon_Lose !: pc.Entity;
    private btn_BacktoMain !: BtnBackMainMenu;
    private btn_PlayAgain !: BtnPlayAgain;
    private showScore !: TxtScoreLoseGame;
    private background !: pc.Entity;


    private  width: number = 400;
    private  height: number = 600;

    private tweenIn !: TWEEN.Tween;
    private tweenOut !: TWEEN.Tween;
    constructor() {
        super();

        this.setElement();
        this.setUpBegin();
    }

    private setElement() {
        this.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: this.width,
            height: this.height,
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

        this.setUpTweenIn();
        this.setUpTweenOut();
    }

    private setUpBackGround() {
        this.background = new pc.Entity('Background');
        this.addChild(this.background);
        this.background.addComponent('element', {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: this.width,
            height: this.height,
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
            width: 300,
            height: 150,
            type: pc.ELEMENTTYPE_IMAGE,
            useInput: false,
            color: new pc.Color(1, 1, 1),
            textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGIConLose),
        });
        this.icon_Lose.setLocalPosition(0, 0, 0);
    }



    private setUpTweenIn() {
        const optionStart = { x: 0, y: 1000, z: 0 };
        const optionEnd = { x: 0, y: 0, z: 0 };
        this.tweenIn = new TWEEN.Tween(optionStart)
            .to(optionEnd, 500)
            .easing(TWEEN.Easing.Bounce.Out)
            .onUpdate(() => {
                this.setLocalPosition(optionStart.x, optionStart.y, optionStart.z);
            })
            .yoyo(false)
    }

    private setUpTweenOut() {

        const optionStart = { x: 0, y: 0, z: 0 };
        const optionEnd = { x: 0, y: -1000, z: 0 };
        this.tweenOut = new TWEEN.Tween(optionStart)
            .to(optionEnd, 300)
            .easing(TWEEN.Easing.Linear.None)
            .onComplete(() => {
                this.enabled = false;
            })
            .onUpdate(() => {
                this.setLocalPosition(optionStart.x, optionStart.y, optionStart.z);
            })
            .yoyo(false)
    }


    public update() {
        if (!this.enabled) return
        if (this.tweenIn.isPlaying()) {
            this.tweenIn.update();
        }
        if (this.tweenOut.isPlaying()) {
            this.tweenOut.update();
        }
    }

    Open(): void {
        this.showScore.init();
        this.enabled = true;
        this.tweenIn.start();
    }

    Close(): void {
        this.tweenOut.start();
    }



    protected updateShopSize() {
        const minScale = 0.7;
        const maxScale = 1;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const scaleX = screenWidth / 1920;
        const scaleY = screenHeight / 1080;
       
        const scale = Math.min(scaleX, scaleY);
        
        const finalScale = Math.max(minScale, Math.min(maxScale, scale));

        this.width *= finalScale;
        this.height *= finalScale;


        if(this.element == null) return;
        this.element.width = this.width;
        this.element.height = this.height;

    }
}