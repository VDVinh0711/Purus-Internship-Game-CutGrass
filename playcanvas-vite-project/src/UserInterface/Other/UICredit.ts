import * as pc from 'playcanvas'
import * as TWEEN from '@tweenjs/tween.js'
import { AssetManager } from '../../Utils/AssetManager';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';
import { IUIController } from '../IUiController';
export class UICredit extends pc.Entity implements IUIController
{
    private app: pc.Application;
    private title!: pc.Entity;
    private overLay!: pc.Entity;
    private btnClose!: pc.Entity;
    private background!: pc.Entity;
    private tweenIn!: TWEEN.Tween;
    private tweenOut!: TWEEN.Tween;
    private txtNoti !: pc.Entity;


    private inconBottomLeft !: pc.Entity;
    private iconBottomRight !: pc.Entity;

    private readonly width: number = 500;
    private readonly height: number = 500;


    constructor(app: pc.Application) {
        super();
        this.app = app;
        this.setUpBegin();
    }


    private setUpBegin() {
        this.setElement();
        this.setOverlay();
        this.setBackground();
        this.setTitle();
        this.setUpTextNotify();
        this.setBtnClose();
        this.setUpTweenOut();
        this.setUpTweenIn();

        this.setIconConnerBottomLeft();
        this.setIconBottomRight();

    }


    private setElement(): void {
        this.addComponent('element', {
            type: pc.ELEMENTTYPE_GROUP,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: this.width,
            height: this.height,
        });
    }

    private setTitle(): void {
        this.title = new pc.Entity('titleNotification');
        this.addChild(this.title);
        this.title.addComponent("element", {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [0.5, 1, 0.5, 1],
            pivot: [0.5, 1],
            width: 300,
            height: 90,
            color: new pc.Color(1, 1, 1),
            textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGTitleCredit)
        });
    }

    private setBackground(): void {
        this.background = new pc.Entity('background');
        this.addChild(this.background);
        this.background.addComponent("element", {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: this.width,
            height: this.height,
            color: new pc.Color(128 / 255, 228 / 255, 124 / 255),
            textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGBackGroundPaper)
        });
    }

    private setOverlay(): void {
        this.overLay = new pc.Entity('OverLay');
        this.addChild(this.overLay);
        this.overLay.addComponent('element', {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: this.app.graphicsDevice.width,
            height: this.app.graphicsDevice.height,
            useInput: true,
            color: new pc.Color(1, 1, 1),
            opacity: 0
        });

        if (this.overLay.element) {
            this.overLay.element.on('click', () => this.Close());
        }
    }

    private setUpTextNotify() {
        this.txtNoti = new pc.Entity("txtDimond");
        this.addChild(this.txtNoti);
        this.txtNoti.addComponent('element', {
            type: pc.ELEMENTTYPE_TEXT,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: this.width -80,
            autoWidth: false,    // Thêm dòng này
            autoHeight: true,
            alignment: new pc.Vec2(0.5, 0.5),
            fontAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.FontCreanBeige),
            fontSize: 25,
            text: "This is the game 'Cut Grass', completed during my internship at Purus Game. The game was developed over a period of one month. I would also like to sincerely thank the entire team at Purus Game, especially Mr. Hai, Mr. Khiem, and my colleagues, for their support and guidance in helping me complete this game.",
            wrapLines: true,
        });

        this.txtNoti.setLocalPosition(0, 0, 0);
    }

    private setUpTweenIn() {
        const optionStart = { x: 0, y: 1000, z: 0 };
        const optionEnd = { x: 0, y: 0, z: 0 };

        this.tweenIn = new TWEEN.Tween(optionStart)
            .to(optionEnd, 300)
            .easing(TWEEN.Easing.Bounce.Out)
            .onUpdate(() => {
                this.setLocalPosition(optionStart.x, optionStart.y, optionStart.z);
            });

    }

    private setUpTweenOut(): void {

        const optionStart = { x: 0, y: 0, z: 0 };
        const optionEnd = { x: 0, y: -1000, z: 0 };

        this.tweenOut = new TWEEN.Tween(optionStart)
            .to(optionEnd, 300)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(() => {
                this.setLocalPosition(optionStart.x, optionStart.y, optionStart.z);
            })
            .onComplete(() => {
                this.enabled = false;
                EventManager.emit(SafeKeyEvent.OpenUIMainMenu);
               
            });
    }

    private setBtnClose(): void {
        this.btnClose = new pc.Entity('btn-Close');
        this.addChild(this.btnClose);
        this.btnClose.addComponent('button');
        this.btnClose.addComponent('element', {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [0.5, 0, 0.5, 0],
            pivot: [0.5, 0],
            width: 60,
            height: 60,
            useInput: true,
            color: new pc.Color(1, 1, 1),
            textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGButtonOK),
        });

        if (this.btnClose.button) {
            this.btnClose.button.on('click', () => {
                EventManager.emit(SafeKeyEvent.PlaySoundSFXBTN);
               
                this.Close()
            });
        }
    }

    public update(): void {
        if (!this.enabled) return;

        if (this.tweenIn.isPlaying()) {
            this.tweenIn.update();
        }
        if (this.tweenOut.isPlaying()) {
            this.tweenOut.update();
        }
    }


    private setIconConnerBottomLeft()
    {
        this.inconBottomLeft = new pc.Entity("iconBottomLeft");
        this.addChild(this.inconBottomLeft);
        this.inconBottomLeft.addComponent('element',{
            type : pc.ELEMENTTYPE_IMAGE,
            anchor : [0,0,0,0],
            pivot : [0,0],
            width : 100,
            height : 100,
            color : new pc.Color(1,1,1),
            textureAsset : AssetManager.getInstance().getAsset(SafeKeyAsset.IMGICONCATBOTTOMLEFT),
        })
    }


    private setIconBottomRight()
    {
        this.iconBottomRight = new pc.Entity("iconbottomright");
        this.addChild(this.iconBottomRight);
        this.iconBottomRight.addComponent('element',{
            type : pc.ELEMENTTYPE_IMAGE,
            anchor : [1,0,1,0],
            pivot : [1,0],
            width : 100,
            height : 100,
            color : new pc.Color(1,1,1),
            textureAsset : AssetManager.getInstance().getAsset(SafeKeyAsset.IMGICONCATBOTTOMRIGHT),
        })
    }
  
    Open(): void {
        this.enabled = true;
        this.tweenIn.start();
    }

    Close(): void {
        
        this.tweenOut.start();
    }
    
}