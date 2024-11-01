import * as pc from 'playcanvas';
import { IUIController } from '../IUiController';
import { UiItemInShop } from './UIItemInShop/UIItemInShop';
import { AssetManager } from '../../Utils/AssetManager';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import { BtnBackUIShop } from './BtnBackShop';
import { UIDimondUserShop } from './UIDimodUserShop';
import { ShopManager } from '../../Shop/ShopManager';
import * as TWEEN from '@tweenjs/tween.js';
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';

export class UIShop extends pc.Entity implements IUIController {
    private app !: pc.Application;
    private titleSHop !: pc.Entity;
    private btnBack !: BtnBackUIShop
    private overLay !: pc.Entity;
    private background !: pc.Entity;
    private groupItems !: pc.Entity;
    private dimondUser !: UIDimondUserShop;


    private paddingGroup !: pc.Vec4;
    private posBtnBack !: pc.Vec3;




    private minScale : number = 0.7;
    private maxScale : number = 1;

    private widthGroupItem : number = 600;
    private heightGroupItem : number = 600;
    private paddingGroupItem : number = 100;

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

       

        this.updateSizeShop();

        this.setUpElement();
        this.setUpOverLay();
        this.setUpBackground();
        this.setUpGroupItems();
        this.setUpTitleShop();

        this.btnBack = new BtnBackUIShop();
        this.addChild(this.btnBack);
        this.btnBack.setLocalPosition(this.posBtnBack);
       
        this.dimondUser = new UIDimondUserShop();
        this.addChild(this.dimondUser);
        this.setupItemShop();


      


        this.setUpTweenIn();
        this.setUpTweenOut();
    }
    private setUpElement() {
        this.addComponent('element', {
            type: pc.ELEMENTTYPE_GROUP,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: this.widthGroupItem,
            height: this.heightGroupItem
        });
    }

    private setUpBackground() {
        this.background = new pc.Entity('background');
        this.addChild(this.background);
        this.background.addComponent('element', {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: this.widthGroupItem,
            height: this.heightGroupItem,
            color: new pc.Color(1, 1, 1),
            textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGBackGroundPaper),
        });
    }

    private setUpGroupItems() {
        this.groupItems = new pc.Entity('groupItem');
        this.addChild(this.groupItems);
        this.groupItems.addComponent('element', {
            type: pc.ELEMENTTYPE_GROUP,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: this.widthGroupItem - this.paddingGroupItem,
            height: this.widthGroupItem - this.paddingGroupItem
        });

        this.groupItems.addComponent('layoutgroup', {
            orientation: pc.ORIENTATION_HORIZONTAL,
            reverseY: true,
            alignment: new pc.Vec2(0, 1),
            padding: this.paddingGroup,
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
                pivot: [0.5, 0.5],
                width: this.widthGroupItem/2,
                height: this.widthGroupItem/5,
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
                useInput : true,
            }
        )
        if(this.overLay.element == null) return;
        this.overLay.element?.on('click', () => {
            this.Close();
        });
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
                EventManager.emit(SafeKeyEvent.OpenUIMainMenu);
            });
    }




    protected updateSizeShop() {
       
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const scaleX = screenWidth / 1920;
        const scaleY = screenHeight / 1080;
        
       
        const scale = Math.min(scaleX, scaleY);
        const finalScale = Math.max(this.minScale, Math.min(this.maxScale, scale));

        this.widthGroupItem *= finalScale;
        this.heightGroupItem *= finalScale;

        if(screenWidth < screenHeight)
        {
            this.paddingGroup = new pc.Vec4(40,40,0,40)
            this.posBtnBack = new pc.Vec3(-20,-10,0);
        }
        else
        {
            this.paddingGroup = new pc.Vec4(50,0 ,0,40)
            this.posBtnBack = new pc.Vec3(0,0,0);
        }

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