import * as pc from 'playcanvas'
import { ItemType } from './TypeItem';
import { AssetManager } from '../Utils/AssetManager';
import { SafeKeyAsset } from '../Helper/SafeKeyAsset';

export class ItemHelper extends pc.Entity {
    public type !: ItemType;
    public duration: number = 4;
    constructor(type: ItemType) {
        super();
        this.type = type;
        this.init();
    }


    init() {
        this.name = 'itemhelper';
        this.AddComponent();
    }


    private AddComponent() {

        this.setModel();
        this.setRigidbody();
        this.setCollison();
    }

    private setCollison() {
        this.addComponent('collision');
        if (this.collision == null) return;
        this.collision.type = 'box';
        this.collision.halfExtents = new pc.Vec3(0.1, 3, 0.1);
    }
    private setRigidbody() {
        this.addComponent('rigidbody');
        if (this.rigidbody == null) return;
        this.rigidbody.type = pc.BODYTYPE_KINEMATIC;
        this.rigidbody.mass = 1;
        this.rigidbody.restitution = 0.5;
    }

    private setModel() {
        this.addComponent("model",
            {
                type: "asset",
                asset: AssetManager.getInstance().getAsset(SafeKeyAsset.ModelFlower),
            })
        this.setLocalScale(12, 20, 12);

        const material = new pc.StandardMaterial();
        const assetTexure = AssetManager.getInstance().getAsset(SafeKeyAsset.IMGFlowerTexure);
        material.diffuseMap = assetTexure?.resource;
        material.update();
        const meshInstance = this.model?.meshInstances[0];
        if (meshInstance) {
            meshInstance.material = material;
        }

    }



  



}