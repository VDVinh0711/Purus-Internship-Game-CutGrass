import * as pc from 'playcanvas'
import { AssetManager } from '../Utils/AssetManager';
import { SafeKeyAsset } from '../Helper/SafeKeyAsset';

export class Background extends pc.Entity
{
    constructor()
    {
        super(); 
        this.setUpBegin();
    }


    private setUpBegin()
    {
        this.setPosition(0,0,0);
        this.setLocalScale(170,1,170);
        this.setRender();
    }

    private setRender()
    {
        this.addComponent('render');
        if(this.render == null) return;
        const material = new pc.StandardMaterial();
        const assetTexure = AssetManager.getInstance().getAsset(SafeKeyAsset.TextureBackgroundWate);
        material.diffuseMap = assetTexure?.resource;
        material.update();
        this.render.type = 'plane';
        this.render.material = material;
        this.render.castShadows = false;
    }
}