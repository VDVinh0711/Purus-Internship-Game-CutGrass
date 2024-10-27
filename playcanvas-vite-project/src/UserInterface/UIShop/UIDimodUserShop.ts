import * as pc from 'playcanvas'
import { AssetManager } from '../../Utils/AssetManager';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import { DimondManager } from '../../Player/DimondManager';
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';

export class UIDimondUserShop extends pc.Entity
{
    private iconDimond !: pc.Entity;
    private txtDimond !: pc.Entity;
    private background  !: pc.Entity;

    private readonly width : number = 200;
    private readonly height : number = 50;
    constructor()
    {
        super();
        this.reisterEvent();
        this.setUpBegin();
    }



    private reisterEvent()
    {
        EventManager.on(SafeKeyEvent.OnChangeDimond, this.setDimondUser.bind(this));
    }

    private setUpBegin()
    {
        this.setUpElement();
        this.setUpBackground();
        this.setUpIconDimond();
        this.setUpTxtDimond();
    }

    private setUpElement()
    {
        this.addComponent('element',
            {
                type: pc.ELEMENTTYPE_GROUP,
                anchor : [1,0,1,0],
                pivot : [1,0],
                width : this.width,
                height : this.height,
            }
        )
    }

    private setUpIconDimond()
    {
        this.iconDimond = new pc.Entity('icondimond'),
        this.addChild(this.iconDimond);
        this.iconDimond.addComponent('element',
            {
                type : pc.ELEMENTTYPE_IMAGE,
                anchor : [0,0.5,0,0.5],
                pivot : [0,0.5],
                width : this.height,
                height : this.height,
                color : new pc.Color(1,1,1),
                textureAsset : AssetManager.getInstance().getAsset(SafeKeyAsset.IConDimond) 
            }
        )
    }

    private setUpTxtDimond()
    {
        this.txtDimond = new pc.Entity('txtDimond');
        this.addChild(this.txtDimond);
        this.txtDimond.addComponent('element',{
            type: pc.ELEMENTTYPE_TEXT,
            anchor: [1, 0.5, 1 , 0.5],
            pivot: [1, 0],
            width: this.width - this.height,
            color :  new pc.Color(255/255,167/255,38/255),
            autoWidth: false,
            autoFitWidth: false,
            alignment: new pc.Vec2(0.5, 0.5),
            outlineColor: new pc.Color(0,0,0) ,
            outlineThickness : 0.5,
            fontAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.FontCreanBeige),
            fontSize: 40,
            text: '1000',
        });
        this.txtDimond.setLocalPosition(0,-20,0);
    }


    private setUpBackground()
    {
        this.background = new pc.Entity('background');
        this.addChild(this.background);
        this.background.addComponent('element',{
            type : pc.ELEMENTTYPE_IMAGE,
            anchor : [0.5,0.5,0.5,0.5],
            pivot : [0.5,0.5],
            width : this.width,
            height : this.height,
            color : new pc.Color(51/255,51/255,51/255),
            opacity : 0.5,
        })
    }

    public init()
    {
        if(this.txtDimond.element == null) return;
        this.txtDimond.element.text = `${DimondManager.getInstace().getDimond()}`;
    }

    private setDimondUser(dimond : number)
    {
        if(this.txtDimond.element == null) return;
        this.txtDimond.element.text = `${dimond}`;
    }

    
}