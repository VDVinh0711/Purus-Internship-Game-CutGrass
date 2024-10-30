import * as pc from 'playcanvas';
import { AssetManager } from '../Utils/AssetManager';

export class BaseButtonUI extends pc.Entity {

    protected baseWidth !: number;
    protected baseHeight !: number;
    protected minScale: number = 0.8;
    protected maxScale: number = 1;

    constructor(options: {
        width: number;
        height: number;
        textureAsset: string;
    }) {

      
        super();
        this.baseWidth = options.width;
        this.baseHeight = options.height;
        this.updateButtonSize();
        this.setElement(options.textureAsset);
        this.addComponent('button');
      
    }

    protected setElement(texure : string) {
        this.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: this.baseWidth,
            height: this.baseHeight,
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


    protected updateButtonSize() {
       
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

       
        const scaleX = screenWidth / 1920;
        const scaleY = screenHeight / 1080;
        
       
        const scale = Math.min(scaleX, scaleY);
        
        
        const finalScale = Math.max(this.minScale, Math.min(this.maxScale, scale));

        this.baseWidth *= finalScale;
        this.baseHeight *= finalScale;

    }

    

   
}