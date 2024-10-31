import * as pc from 'playcanvas'
import { AssetManager } from '../../Utils/AssetManager';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import { DimondManager } from '../../Player/DimondManager';
export class UIShowDimond extends pc.Entity
{
    private iconDimond !: pc.Entity;
    private txtDimond !: pc.Entity;
    private container !: pc.Entity;
    
    private readonly width : number = 200;
    private readonly height : number = 50;
    constructor()
    {
        super();
        this.setElement();
        this.setContainer();
        this.setIconDimond();
        this.setUpTextDimond();
    }

    private setElement()
    {
        this.addComponent('element',{
            type : pc.ELEMENTTYPE_GROUP,
            anchor : [0.5,0.5,0.5,0.5],
            pivot : [0.5,0.5],
            width : this.width,
            height : this.height,
        })
    }

    private setContainer() {
        this.container = new pc.Entity("container");
        this.addChild(this.container);
        this.container.addComponent('element', {
            type: pc.ELEMENTTYPE_GROUP,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: this.width,
            height: this.height,
        });
    }

    private setIconDimond()
    {
        this.iconDimond = new pc.Entity("iconDimond");
        this.container.addChild(this.iconDimond);
        this.iconDimond.addComponent('element',
            {
                type : pc.ELEMENTTYPE_IMAGE,
                anchor : [0.5, 0.5, 0.5, 0.5],
                pivot : [0, 0.5],
                width : this.height,
                height : this.height,
                color : new pc.Color(1,1,1),
                textureAsset : AssetManager.getInstance().getAsset(SafeKeyAsset.IConDimond) 
            }
        );
        this.iconDimond.setLocalPosition(10, 0, 0);
    }

    private setUpTextDimond()
    {
        this.txtDimond = new pc.Entity("txtDimond");
        this.container.addChild(this.txtDimond);
        this.txtDimond.addComponent('element',{
            type: pc.ELEMENTTYPE_TEXT,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [1, 0.5],
            width: this.width - this.height,
            color :  new pc.Color(255/255,167/255,38/255),
            autoWidth: false,
            autoFitWidth: false,
            alignment: new pc.Vec2(1, 0.5),
            outlineColor: new pc.Color(0,0,0) ,
            outlineThickness : 0.5,
            fontAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.FontCreanBeige),
            fontSize: 40,
            text: '0',
        });
        
        this.txtDimond.setLocalPosition(-10, 0, 0);
    }

    
    public init()
    {
        if(this.txtDimond.element == null) return;
        this.txtDimond.element.text = `${DimondManager.getInstace().getDimond()}`;
    }
}