import * as pc from 'playcanvas';
import { IUIController } from '../IUiController';
import { UiItemInShop } from './UIItemInShop/UIItemInShop';
import { AssetManager } from '../../Utils/AssetManager';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import { BtnBackUIShop } from './BtnBackShop';
import { UIDimondUserShop } from './UIDimodUserShop';
import { ShopManager } from '../../Shop/ShopManager';
import * as TWEEN from '@tweenjs/tween.js';

export class UIShop extends pc.Entity implements IUIController {
    private app !: pc.Application;
    private titleSHop !: pc.Entity;
    private btnBack !: BtnBackUIShop
    private overLay !: pc.Entity;
    private background !: pc.Entity;
    private groupItems !: pc.Entity;
    private dimondUser !: UIDimondUserShop;


    private tweenIn !: TWEEN.Tween;
    private tweenOut !: TWEEN.Tween;


    constructor(app: pc.Application) {
        super();
        this.app = app;
        this.setUpBegin();
    }


    private setupItemShop() {
        ShopManager.getInstance().getListItem().forEach(item => {
            const newItem = new UiItemInShop(item);
            this.groupItems.addChild(newItem);
        });
    }

    private setUpBegin() {
        this.setUpElement();
        this.setUpOverLay();

        this.setUpBackground();
        this.setUpGroupItems();
        this.setUpTitleShop();

        this.btnBack = new BtnBackUIShop();
        this.addChild(this.btnBack);

        this.dimondUser = new UIDimondUserShop();
        this.addChild(this.dimondUser);
        this.dimondUser.setLocalPosition(-50, 0, 0);
        this.setupItemShop();

        this.setUpTweenIn();
        this.setUpTweenOut();
    }
    private setUpElement() {
        this.addComponent('element', {
            type: pc.ELEMENTTYPE_GROUP,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: 600,
            height: 600
        });
    }

    private setUpBackground() {
        this.background = new pc.Entity('background');
        this.addChild(this.background);
        this.background.addComponent('element', {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: 500,
            height: 500,
            color: new pc.Color(1, 1, 1),
            textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGBackGroundPaper),
        });
    }

    private setUpGroupItems() {
        this.groupItems = new pc.Entity('gropItem');
        this.addChild(this.groupItems);
        this.groupItems.addComponent('element', {
            type: pc.ELEMENTTYPE_GROUP,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: 500,
            height: 500
        });

        this.groupItems.addComponent('layoutgroup', {
            orientation: pc.ORIENTATION_HORIZONTAL,
            reverseY: true,
            alignment: new pc.Vec2(0, 1),
            padding: new pc.Vec4(70, 0, 0, 70),
            spacing: new pc.Vec2(30, 30),
            widthFitting: pc.FITTING_NONE,
            heightFitting: pc.FITTING_NONE,
            wrap: true
        })
    }


    private setUpTitleShop() {
        this.titleSHop = new pc.Entity('titleShop');
        this.addChild(this.titleSHop);
        this.titleSHop.addComponent('element',
            {
                type: pc.ELEMENTTYPE_IMAGE,
                anchor: [0.5, 1, 0.5, 1],
                pivot: [0.5, 1],
                width: 250,
                height: 100,
                color: new pc.Color(1, 1, 1),
                textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGTitleShop)
            }
        )
    }

    private setUpOverLay() {
        this.overLay = new pc.Entity('overlay');
        this.addChild(this.overLay);
        this.overLay.addComponent('element',
            {
                type: pc.ELEMENTTYPE_IMAGE,
                anchor: [0.5, 0.5, 0.5, 0.5],
                pivot: [0.5, 0.5],
                width: this.app.graphicsDevice.width,
                height: this.app.graphicsDevice.height,
                color: new pc.Color(1, 1, 1),
                opacity: 0.5,
            }
        )
    }




    
    private setUpTweenIn() {
        const optionTweenStart = { scale: 0 };
        const optionTweenEnd = { scale: 1 };

        this.tweenIn = new TWEEN.Tween(optionTweenStart)
            .to(optionTweenEnd, 300)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(() => {
                this.setLocalScale(optionTweenStart.scale, optionTweenStart.scale, 1);
            });
    }
    private setUpTweenOut(): void {

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


    public update()
    {
        if (!this.enabled) return;

        if (this.tweenIn.isPlaying()) {
            this.tweenIn.update();
        }
        if (this.tweenOut.isPlaying()) {
            this.tweenOut.update();
        }
    }


    Open(): void {
        this.enabled = true;
        this.dimondUser.init();
        this.tweenIn.start();
    }
    Close(): void {
       this.tweenOut.start();
    }


}