import * as pc from 'playcanvas'
import * as TWEEN from '@tweenjs/tween.js'
import { AssetManager } from '../../../Utils/AssetManager';
import { SafeKeyAsset } from '../../../Helper/SafeKeyAsset';
import { EventManager } from '../../../Utils/Observer';
import { SafeKeyEvent } from '../../../Helper/SafeKeyEvent';
export class NotifyText extends pc.Entity {
    private app: pc.Application;
    private title!: pc.Entity;
    private overLay!: pc.Entity;

    private btnClose!: pc.Entity;
    private background!: pc.Entity;
    private tweenIn!: TWEEN.Tween;
    private tweenOut!: TWEEN.Tween;
    private txtNoti !: pc.Entity;

    private readonly width: number = 300;
    private readonly height: number = 300;


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
            textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGTitleNotification)
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
            this.overLay.element.on('click', () => this.CloseUI());
        }
    }

    private setUpTextNotify() {
        this.txtNoti = new pc.Entity("txtDimond");
        this.addChild(this.txtNoti);
        this.txtNoti.addComponent('element', {
            type: pc.ELEMENTTYPE_TEXT,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: this.width - 40,
            autoWidth: false,    // Thêm dòng này
            autoHeight: true,
            alignment: new pc.Vec2(0.5, 0.5),
            fontAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.FontCreanBeige),
            fontSize: 25,
            text: 'you don have money ',
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
                this.CloseUI()
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


    private setTextNotify(text: string) {
        if (this.txtNoti.element == null) return;
        this.txtNoti.element.text = text;
    }

    public OpenUI(text: string): void {
        this.enabled = true;
        this.setTextNotify(text);
        this.tweenIn.start();

    }

    private CloseUI(): void {
        this.tweenOut.start();
    }
}
