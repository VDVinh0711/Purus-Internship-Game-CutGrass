import * as pc from 'playcanvas'
import { AssetManager } from '../../Utils/AssetManager';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import * as TWEEN from '@tweenjs/tween.js';
import { GameManger } from '../../GameManager';
// import { EventManager } from '../../Utils/Observer';
// import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';

export class TurtorialGuidControll extends pc.Entity
{

    private app !: pc.Application;


    private width : number = 500;
    private height : number = 200;

    private iconTur !: pc.Entity;
    private txtGuid !: pc.Entity;

    private group !: pc.Entity;
    private overLay !: pc.Entity;

    private fontSize : number = 35;



    private tweenTur !: TWEEN.Tween;

    constructor(app : pc.Application)
    {
        super();
        this.app = app;
        this.setUpBegin();
    }


    private setUpBegin()
    {

        this.setUpResize();
        this.setElement();
        this.setGroup();
        this.setIconTur();
        this.setTextGuid();
        this.setOverLay();
        this.setUpTween();
    }

    private setElement()
    {
        this.addComponent('element',{
            type : pc.ELEMENTTYPE_GROUP,
            anchor: [0.5,0.5,0.5,0.5],
            pivot : [0.5,0.5],
            width : this.app.graphicsDevice.width,
            height : this.app.graphicsDevice.height,
        })
    }



    private setGroup()
    {
        this.group = new pc.Entity('group');
        this.addChild(this.group);
        this.group.addComponent('element',{
            type : pc.ELEMENTTYPE_GROUP,
            anchor: [0.5,0.5,0.5,0.5],
            pivot : [0.5,0.5],
            width : this.width,
            height : this.height,
        });
        this.group.setLocalPosition(0,0,0);
    }
    private setIconTur()
    {
        this.iconTur = new pc.Entity('ICON');
        this.group.addChild(this.iconTur);
        this.iconTur.addComponent('element',{
            type : pc.ELEMENTTYPE_IMAGE,
            anchor : [0.5,1,0.5,1],
            pivot : [0.5,1],
            width : this.height/2,
            height : this.height/2,
            color : new pc.Color(1,1,1),
            textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGIConCLick),
        });
        this.iconTur.setLocalPosition(0,0,0);


    }

    private setTextGuid()
    {
        this.txtGuid = new pc.Entity("TXT GUID");
        this.group.addChild(this.txtGuid);
        this.txtGuid.addComponent('element',{
            type : pc.ELEMENTTYPE_TEXT,
            anchor : [0.5,0,0.5,0],
            pivot : [0.5,0],
            fontSize : this.fontSize,
            width : this.width,
            height : this.height/2 ,
            autoWidth: false,
            autoHeight : false,
            wrapLines : true,
            alignment : new pc.Vec2(0.5,0.8),
            fontAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.FontCreanBeige),
            outlineColor: new pc.Color(0,0,0) ,
            outlineThickness : 0.5,
            color : new pc.Color(255/255,167/255,38/255),
            text : "Click To Move Blade"
        });
    }


    private setOverLay()
    {
        this.overLay = new pc.Entity("overlay");
        this.addChild(this.overLay);
        this.overLay.addComponent('button');
        this.overLay.addComponent('element',{
            type : pc.ELEMENTTYPE_IMAGE,
            anchor : [0.5,0.5,0.5,0.5],
            pivot : [0.5,0.5],
            width : this.app.graphicsDevice.width,
            height : this.app.graphicsDevice.height,
            color : new pc.Color(1,1,1),
            opacity : 0,
            useInput : true,
        });

        if(this.overLay.button == null) return;
        this.overLay.button.on('click',()=>
        {
            this.Close();
            if(GameManger.getInstance().isPlayFirstTime)
            {
                //EventManager.emit(SafeKeyEvent.OpenTurControllBlade);
            }
        })
    }


    public update()
    {
        if(!this.enabled) return;
        if(!this.tweenTur.isPlaying()) return;
        this.tweenTur.update();
    }



    private setUpTween()
    {
        const opacityState = { opacity: 1 };
        this.tweenTur = new TWEEN.Tween(opacityState)
            .to({ opacity: 0 }, 1000)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(() => {
                if(this.iconTur.element != null )
                {
                    this.iconTur.element.opacity = opacityState.opacity;
                }
                if(this.txtGuid.element != null)
                {
                    this.txtGuid.element.opacity = opacityState.opacity;
                }
                
            })
            .yoyo(true)
            .onComplete(()=>
            {
                if(this.iconTur.element != null )
                    {
                        this.iconTur.element.opacity = opacityState.opacity;
                    }
                    if(this.txtGuid.element != null)
                    {
                        this.txtGuid.element.opacity = opacityState.opacity;
                    }
            })
            .repeat(Infinity)
          
    }


    public Open()
    {
        this.enabled = true;
        this.tweenTur.start();
    }

    public Close()
    {
        this.enabled = false;
    }




    private setUpResize() {
       
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


        this.fontSize *- finalScale;

    }


}