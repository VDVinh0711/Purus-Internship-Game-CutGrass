import * as pc from 'playcanvas'
import { AssetManager } from '../../Utils/AssetManager';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';

export class UIBladeStat extends pc.Entity
{
    private iconItem !: pc.Entity;
    private txt_expired !: pc.Entity;
    constructor()
    {
        super()
        this.registerEvent();
        this.setElemet();
        this.setIconItem();
        this.setTextTimeExpire();

    }

    private registerEvent()
    {
        EventManager.on(SafeKeyEvent.ChangeTimeExpireItem,this.SetTextTimeExpire.bind(this));
    }


    private setElemet()
    {
        this.addComponent('element',{
            anchor: [0.5, 1, 0.5, 1],  
            pivot: [0.5, 1],       
            width:100,
            height: 100,          
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
            pivot : [0.5,0.5],
            width : 50,
            height: 50,
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
            anchor: [1, 0.5, 1, 0.5],
            pivot: [0.5, 0.5],
            fontAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.FontCreanBeige),
            fontSize: 32,
            text: '0',
        });
    }


    private SetTextTimeExpire(time: number)
    {
        if(this.txt_expired.element == null) return;
        this.txt_expired.element.text = time.toFixed(2) +"";
    }
}