import * as pc from 'playcanvas'
import { AssetManager } from '../Utils/AssetManager';
import { SafeKeyAsset } from '../Helper/SafeKeyAsset';

export class Plane extends pc.Entity
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
        //this.setRigidbody();
       // this.setCollison();
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


    // private setCollison() {
    //     this.addComponent('collision');
    //     if (this.collision == null) return;
    //     this.collision.type = 'box';
    //     this.collision.halfExtents = new pc.Vec3(170/2, 0.5, 170/2);
    // }
    // private setRigidbody() {
    //     this.addComponent('rigidbody');
    //     if (this.rigidbody == null) return;
    //     this.rigidbody.type = pc.BODYTYPE_KINEMATIC;
    //     this.rigidbody.mass = 1;
    //     this.rigidbody.restitution = 0.5;
    // }
    
}