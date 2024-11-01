import * as pc from 'playcanvas';
import { AssetManager } from '../Utils/AssetManager';

export class BaseButtonUI extends pc.Entity {

    protected width !: number;
    protected height !: number;
    

    constructor(options: {
        width: number;
        height: number;
        textureAsset: string;
    }) {

      
        super();
        this.width = options.width;
        this.height = options.height;
        this.setElement(options.textureAsset);
        this.addComponent('button');
      
    }

    protected setElement(texure : string) {
        this.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: this.width,
            height: this.height,
            type: pc.ELEMENTTYPE_IMAGE,
            useInput: true,
            color: new pc.Color(1, 1, 1),
            textureAsset: AssetManager.getInstance().getAsset(texure),
        });
    }


    public setAnchorPivot(anchor : pc.Vec4 , pivot : pc.Vec2)
    {   
        if(this.element == null) return;
        this.element.anchor = anchor;
        this.element.pivot = pivot;
    }


    

    

   
}