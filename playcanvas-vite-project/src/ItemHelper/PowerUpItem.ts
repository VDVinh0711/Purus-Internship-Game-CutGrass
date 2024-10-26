import { ItemType } from './TypeItem';
import * as pc from 'playcanvas'

import { BladeManager } from '../BladeManger/BladeManager';
import { AssetManager } from '../Utils/AssetManager';
import { SafeKeyAsset } from '../Helper/SafeKeyAsset';
import { ItemHelper } from './itemhelper';
import { EventManager } from '../Utils/Observer';
import { SafeKeyEvent } from '../Helper/SafeKeyEvent';

export class PowerUpItem extends ItemHelper {
    public duration: number = 4;
    constructor() {
        super(ItemType.powerUp);
        this.setUpBegin();
    }



    private setUpBegin() {

        this.setModel();
        this.setRigidbody();
        this.setCollison();
        
    }


    protected setCollison() {
        this.addComponent('collision');
        if (this.collision == null) return;
        this.collision.type = 'box';
        this.collision.halfExtents = new pc.Vec3(0.1, 3, 0.1);


        //this.collision.on('collisionstart', this.onColisionEnter.bind(this));
    }
    protected setRigidbody() {
        this.addComponent('rigidbody');
        if (this.rigidbody == null) return;
        this.rigidbody.type = pc.BODYTYPE_KINEMATIC;
        this.rigidbody.mass = 1;
        this.rigidbody.restitution = 0.5;
    }
    protected setModel() {
        this.addComponent("model",
            {
                type: "asset",
                asset: AssetManager.getInstance().getAsset(SafeKeyAsset.ModelFlower),
            })
        this.setLocalScale(2, 2, 2);

        const material = new pc.StandardMaterial();
        const assetTexure = AssetManager.getInstance().getAsset(SafeKeyAsset.IMGFlowerTexure);
        material.diffuseMap = assetTexure?.resource;
        material.update();
        const meshInstance = this.model?.meshInstances[0];
        if (meshInstance) {
            meshInstance.material = material;
        }
    }

    public onCollision(bladeManager: BladeManager): void {
       EventManager.emit(SafeKeyEvent.PlayParticleCutItem, this.getPosition());
       EventManager.emit(SafeKeyEvent.PlaySoundSFXCutItem);
        bladeManager.bladeStat.reciveItemPowerUp(this);
        this.destroy();
    }

   



}