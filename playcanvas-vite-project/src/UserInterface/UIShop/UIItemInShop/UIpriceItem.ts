import * as pc from 'playcanvas'
import { AssetManager } from '../../../Utils/AssetManager';
import { SafeKeyAsset } from '../../../Helper/SafeKeyAsset';
import { EventManager } from '../../../Utils/Observer';
import { SafeKeyEvent } from '../../../Helper/SafeKeyEvent';

export class UIPriceItem extends pc.Entity
{

    private iconDimond !: pc.Entity;
    private txtPrice !: pc.Entity;
    private width !: number;
    private height : number = 30;
    private background !: pc.Entity;
    constructor(width : number )
    {
        super();
        this.width = width;
        
        this.setUpElement();
        this.setUpBackgrorund();
        this.setUpTxtPrice();
        this.setUpIconDimond();
        
    }
    private setUpElement()
    {
        this.addComponent('element',{
            type : pc.ELEMENTTYPE_GROUP,
            anchor : [0.5,0,0.5,0],
            pivot : [0.5,0],
            width : this.width,
            height : this.height
        })
    }


    private setUpBackgrorund()
    {
        this.background = new pc.Entity("background");
        this.addChild(this.background);
        this.background.addComponent('element',
            {
                type : pc.ELEMENTTYPE_IMAGE,
                anchor: [0.5,0.5,0.5,0.5],
                pivot : [0.5,0.5],
                color : new pc.Color(0.5,0.5,0.5),
                width : this.width,
                height :this.height,
                opacity : 0.5
            }
        )
    }

    private setUpIconDimond()
    {
        this.iconDimond = new pc.Entity("iconDimond");
        this.addChild(this.iconDimond);
        this.iconDimond.addComponent('element',
            {
                type : pc.ELEMENTTYPE_IMAGE,
                anchor : [0,0.5,0,0.5],
                pivot : [0,0.5],
                widht : this.height,
                height : this.height,
                color : new pc.Color(1,1,1),
                textureAsset : AssetManager.getInstance().getAsset(SafeKeyAsset.IConDimond)
            }
        )
      
    }

    private setUpTxtPrice()
    {
        this.txtPrice = new pc.Entity('txtPrice');
        this.addChild(this.txtPrice);
        this.txtPrice.addComponent('element',
            {
                type : pc.ELEMENTTYPE_TEXT,
                anchor : [1,0.5,1,0.5],
                pivot : [1,0.5],
                width : this.width - this.height,
                height : this.height,
                autoWidth: false,
                autoFitWidth: false,
                alignment: new pc.Vec2(0.5, 0.5),
                outlineColor: new pc.Color(0,0,0) ,
                outlineThickness : 0.5,
                fontSize : 25,
                fontAsset : AssetManager.getInstance().getAsset(SafeKeyAsset.FontCreanBeige),
                text : "1000"
            }
        )
       
    }

    public setPrice(price : number)
    {
        if(this.txtPrice.element == null) return;
        this.txtPrice.element.text = `${price}`;
    }
}