import * as pc from 'playcanvas'
import { AssetManager } from '../../Utils/AssetManager';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';
import * as TWEEN from '@tweenjs/tween.js'

export class UIBladeStat extends pc.Entity
{
    private iconItem !: pc.Entity;
    private txt_expired !: pc.Entity;

    private tweenIcon  !: TWEEN.Tween;
    private widthGroup : number = 300;
    private heightGroup : number = 100;
    private widthIcon : number = 100;
    private heightIcon : number = 100;
    private fontSizeText : number = 40;
    constructor()
    {
        super()
        this.registerEvent();
        this.setUpBegin();
    }


    private setUpBegin()
    {
        this.setUpResize();
     
        this.setElemet();
        this.setIconItem();
        this.setTextTimeExpire();
        this.setUpTween();

        this.updateUIResize();
    }

    private registerEvent()
    {
        EventManager.on(SafeKeyEvent.ChangeTimeExpireItem,this.OnChangeTimeExpire.bind(this));
    }

    private setElemet()
    {
        this.addComponent('element',{
            anchor: [0.5, 1, 0.5, 1],  
            pivot: [0.5, 1],       
            width:this.widthGroup,
            height: this.heightGroup,          
            type: pc.ELEMENTTYPE_GROUP
        });
    }

    private setIconItem()  
    {
        this.iconItem = new pc.Entity("ICon");
        this.addChild(this.iconItem);
        this.iconItem.addComponent('element',{
            type : pc.ELEMENTTYPE_IMAGE,
            anchor :[0,0.5,0,0.5],
            pivot : [0,0.5],
            width : this.widthIcon,
            height: this.heightIcon,
            color : new pc.Color(1,1,1),
            textureAsset : AssetManager.getInstance().getAsset(SafeKeyAsset.IMGIconPowerUp),
        })
      
    }

    private setTextTimeExpire()
    {
        this.txt_expired = new pc.Entity("Text");
        this.addChild(this.txt_expired);
        this.txt_expired.addComponent('element',{
            type: pc.ELEMENTTYPE_TEXT,
            anchor: [1,0.5,1,0.5],
            pivot: [1, 0.5],
            fontAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.FontCreanBeige),
            fontSize: this.fontSizeText,
            outlineColor: new pc.Color(0,0,0) ,
            outlineThickness : 0.5,
            alignment : new pc.Vec2(0.5,0.5),
            text: '0',
        });
        this.txt_expired.setLocalPosition(0,-10,0);
       
    }



    private OnChangeTimeExpire(time : number)
    {
        this.SetTextTimeExpire(time);
        if(time > 1.5) return;
        if(this.tweenIcon.isPlaying()) return;
        this.tweenIcon.start();
    }

    private SetTextTimeExpire(time: number)
    {
        if(this.txt_expired.element == null) return;
        this.txt_expired.element.text = time.toFixed(2) +"";
    }

    private setUpTween()
    {
        const opcityIcon = { opacity: 1 };
        this.tweenIcon = new TWEEN.Tween(opcityIcon)
            .to({ opacity: 0 }, 300)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(() => {
                if(this.iconItem.element != null)
                {
                    this.iconItem.element.opacity = opcityIcon.opacity;
                }
              
            })
            .yoyo(true)
            .repeatDelay(0)
            .repeat(Infinity)
    }


    //Update
    public update()
    {
        if(!this.enabled) return;
        if(!this.tweenIcon.isPlaying()) return;
        this.tweenIcon.update();
    }


    //Open
    public Open()
    {
        this.enabled = true;
    }
    public Close()
    {
        this.reset();
        this.enabled = false;
       
    }

    private reset()
    {
        this.tweenIcon.stop();
        if(this.iconItem.element !=null)
        {
            this.iconItem.element.opacity = 1;
        }
    }

    private setUpResize()
    {
        const minScale = 0.6;
        const maxScale = 1;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const scaleX = screenWidth / 1920;
        const scaleY = screenHeight / 1080;
       
        const scale = Math.min(scaleX, scaleY);
        
        const finalScale = Math.max(minScale, Math.min(maxScale, scale));


        this.widthGroup *= finalScale;
        this.heightGroup *= finalScale;
        this.widthIcon *= finalScale;
        this.heightIcon *= finalScale;
        this.fontSizeText *= finalScale;

    }

    
    private updateUIResize() {
       
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        if(screenWidth < screenHeight)
        {
            this.txt_expired.enabled  = false;

            if(this.iconItem.element != null)
            {
                this.iconItem.element.anchor = new pc.Vec4(0.5,0.5,0.5,0.5);
                this.iconItem.element.pivot = new pc.Vec2(0.5,0.5);
            }
        }
        else
        {
            this.txt_expired.enabled  = true;

            if(this.iconItem.element != null)
            {
                this.iconItem.element.anchor = new pc.Vec4(0,0.5,0,0.5);
                this.iconItem.element.pivot = new pc.Vec2(0,0.5);
            }
        }


       

    } 
}