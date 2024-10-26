import * as pc from 'playcanvas';
import * as TWEEN from '@tweenjs/tween.js';
import { AssetManager } from '../../../Utils/AssetManager';
import { SafeKeyAsset } from '../../../Helper/SafeKeyAsset';
import { DisplayDimond } from './DisplayDimond';
import { EventManager } from '../../../Utils/Observer';
import { SafeKeyEvent } from '../../../Helper/SafeKeyEvent';

export class DimondRewardPopUp extends pc.Entity {
    private app: pc.Application;
    private title!: pc.Entity;
    private overLay!: pc.Entity;
    private displayDimond!: DisplayDimond;
    private btnClose!: pc.Entity;
    private background!: pc.Entity;
    private tweenIn!: TWEEN.Tween;
    private tweenOut!: TWEEN.Tween;

    constructor(app: pc.Application) {
        super();
        this.app = app;
        this.initializeComponents();
    }

    private initializeComponents(): void {
        this.setElement();
        this.setOverlay();
        this.setBackground();
        this.setTitle();
        this.setDisplayDimond();
        this.setBtnClose();
    }

    private setElement(): void {
        this.addComponent('element', {
            type: pc.ELEMENTTYPE_GROUP,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: 300,
            height: 300,
        });
    }

    private setBackground(): void {
        this.background = new pc.Entity('background');
        this.addChild(this.background);
        this.background.addComponent("element", {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: 300,
            height: 300,
            color: new pc.Color(128/255, 228/255, 124/255),
            textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGBackGroundPaper)
        });
    }

    private setDisplayDimond(): void {
        this.displayDimond = new DisplayDimond();
        this.addChild(this.displayDimond);
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
            this.btnClose.button.on('click', () => 
                {
                    EventManager.emit(SafeKeyEvent.PlaySoundSFXBTN);
                    this.CloseUI()
                });
        }
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

    private setUpTween(): void {
        const optionTweenStart = { scale: 0 };
        const optionTweenEnd = { scale: 1 };

        this.tweenIn = new TWEEN.Tween(optionTweenStart)
            .to(optionTweenEnd, 300)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(() => {
                this.setLocalScale(optionTweenStart.scale, optionTweenStart.scale, 1);
            });

        const optionTweenBStart = { scale: 1 };
        const optionTweenBEnd = { scale: 0 };

        this.tweenOut = new TWEEN.Tween(optionTweenBStart)
            .to(optionTweenBEnd, 300)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(() => {
                this.setLocalScale(optionTweenBStart.scale, optionTweenBStart.scale, 1);
            })
            .onComplete(() => {
                this.enabled = false;
            });
    }

    public OpenUI(dimondCount: number): void {
        this.displayDimond.setDimondScore(` + ${dimondCount}`);
        this.init();
        this.enabled = true;
    }

    private CloseUI(): void {
        EventManager.emit(SafeKeyEvent.UnSetPauseBlade);
        this.tweenOut.start();
    }

    public init(): void {
        this.setUpTween();
        this.tweenIn.start();
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
}