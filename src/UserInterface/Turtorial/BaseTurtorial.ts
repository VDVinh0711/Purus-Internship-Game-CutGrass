import * as pc from  'playcanvas'
import { AssetManager } from '../../Utils/AssetManager';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';
import * as TWEEN from '@tweenjs/tween.js';

export abstract class BaseTurtorial extends pc.Entity
{
   
    private width : number = 600;
    private height : number = 700; 
    private groupTop !: pc.Entity;
    private groupBottom !: pc.Entity;
    private imgTur !: pc.Entity;
    private txtGuid !: pc.Entity;

    private padding : number = 60;
    private fontSize : number = 30;
    private background !: pc.Entity;
    private btnAccept !: pc.Entity;


    private tweenIn !: TWEEN.Tween;
    private tweenOut !: TWEEN.Tween;


    private iconImage !: string;
    private txtDes !: string;
    constructor(icon : string ,  text : string)
    {
        super();
        this.iconImage  = icon;
        this.txtDes = text;
        this.setUpBegin();
    }



    private setUpBegin()
    {

        this.setUpResize();
        this.setElement();
        this.setBackground();
        this.setUpGroupBottom();
        this.setUpGroupTop();
        this.setImg();
        this.setTxtGuid();
        this.setBtnAccept();

        this.setUpTweenIn();
        this.setUpTweenOut();
    }

    private setElement()
    {
        this.addComponent('element',{
            anchor : [0.5,0.5,0.5,0.5],
            pivot : [0.5,0.5],
            width : this.width,
            height : this.height,
            type : pc.ELEMENTTYPE_GROUP,
        });
    }


    private setUpGroupTop()
    {
        this.groupTop = new pc.Entity("Group Top");
        this.addChild(this.groupTop);
        this.groupTop.addComponent('element',{
            anchor : [0.5,1,0.5,1],
            pivot : [0.5,1],
            width : this.width,
            height : this.height/2,
            type : pc.ELEMENTTYPE_GROUP,
        });
    }


    private setUpGroupBottom()
    {
        this.groupBottom = new pc.Entity("Group Top");
        this.addChild(this.groupBottom);
        this.groupBottom.addComponent('element',{
            type : pc.ELEMENTTYPE_GROUP,
            anchor : [0.5,0,0.5,0],
            pivot : [0.5,0],
            width : this.width,
            height : this.height/2
        });
    }


    private setBackground()
    {
        this.background = new pc.Entity('background');
        this.addChild(this.background);
        this.background.addComponent('element',{
            type : pc.ELEMENTTYPE_IMAGE,
            anchor : [0.5,0.5,0.5,0.5],
            pivot : [0.5,0.5],
            width : this.width,
            height : this.height,
            color : new pc.Color(1,1,1),
            textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGBackGroundPaper),
        });
    }


    private setImg()
    {
        this.imgTur = new pc.Entity("IMG TUR");
        this.groupTop.addChild(this.imgTur);
        this.imgTur.addComponent('element',{
            type : pc.ELEMENTTYPE_IMAGE,
            anchor : [0.5,0.5,0.5,0.5],
            pivot : [0.5,0.5],
            width : this.width-this.padding,
            height : this.width/2-this.padding,
            color : new pc.Color(1,1,1),
            textureAsset: AssetManager.getInstance().getAsset(this.iconImage),
        })
    }

    private setTxtGuid()
    {
        this.txtGuid = new pc.Entity("TXT GUID");
        this.groupBottom.addChild(this.txtGuid);
        this.txtGuid.addComponent('element',{
            type : pc.ELEMENTTYPE_TEXT,
            anchor : [0.5,1,0.5,1],
            pivot : [0.5,1],
            fontSize : this.fontSize,
            width : this.width -this.padding,
            height : this.height/2 -this.padding,
            autoWidth: false,
            autoHeight : false,
            wrapLines : true,
            alignment : new pc.Vec2(0.5,0.8),
            fontAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.FontCreanBeige),
            outlineColor: new pc.Color(0,0,0) ,
            outlineThickness : 0.5,
            color : new pc.Color(1,1,1),
            text : this.txtDes,
        });
    }


    private setBtnAccept()
    {
        this.btnAccept = new pc.Entity("Btn Accept");
        this.addChild(this.btnAccept);
        this.btnAccept.addComponent('button');
        this.btnAccept.addComponent('element',{
            type : pc.ELEMENTTYPE_IMAGE,
            anchor : [0.5,0,0.5,0],
            pivot : [0.5,0],
            width : 50,
            height : 50,
            useInput : true,
            color : new pc.Color(1,1,1),
            textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGButtonOK),
        });


        if(this.btnAccept.button == null) return;
        this.btnAccept.button.on('click', () => {
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
                EventManager.emit(SafeKeyEvent.UnSetPauseBlade);
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


    public Open()
    {
        this.enabled = true;
        this.tweenIn.start();
        EventManager.emit(SafeKeyEvent.SetPauseBlade);
    }

    public Close()
    {
        this.tweenOut.start();
    }



    private setUpResize() {
       
        const minScale = 0.5;
        const maxScale = 1;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const scaleX = screenWidth / 1920;
        const scaleY = screenHeight / 1080;
       
        const scale = Math.min(scaleX, scaleY);
        
        const finalScale = Math.max(minScale, Math.min(maxScale, scale));

        this.width *= finalScale;
        this.height *= finalScale;
        this.padding *= finalScale;
        this.fontSize *= finalScale;

    }

    
}