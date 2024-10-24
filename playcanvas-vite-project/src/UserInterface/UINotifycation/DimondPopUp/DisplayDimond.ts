import * as pc from 'playcanvas'
import { AssetManager } from '../../../Utils/AssetManager';
import { SafeKeyAsset } from '../../../Helper/SafeKeyAsset';

export class DisplayDimond extends pc.Entity
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
                textureAsset : AssetManager.getInstance().getAsset(SafeKeyAsset.ICONScore) 
            }
        );
        // Dịch chuyển icon sang phải một nửa chiều rộng của text
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
            autoWidth: false,
            autoFitWidth: false,
            alignment: new pc.Vec2(1, 0.5),
            fontAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.FontCreanBeige),
            fontSize: 40,
            text: '+3',
        });
        // Dịch chuyển text sang trái một chút để tạo khoảng cách với icon
        this.txtDimond.setLocalPosition(-10, 0, 0);
    }

    public setDimondScore(txt : string)
    {
        if(this.txtDimond.element == null) return;
        this.txtDimond.element.text = txt;
    }
}