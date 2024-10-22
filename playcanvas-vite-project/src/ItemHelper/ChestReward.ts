import * as pc from 'playcanvas'

import { ItemType } from './TypeItem';
import { ItemHelper } from './ItemHelper';
import { BladeManager } from '../BladeManger/BladeManager';
import { AssetManager } from '../Utils/AssetManager';
import { SafeKeyAsset } from '../Helper/SafeKeyAsset';
import { DimondManager } from '../Player/PlayerManager';


export class ChestReward extends ItemHelper {

    private scale : pc.Vec3 = new pc.Vec3(1.5,1.5,1.5);
    private maxHP: number = 4;
    private currentHP: number = 0;

    constructor() {
        super(ItemType.chestReward);
        this.setUpBegin();
    }
    private setUpBegin() {

        this.currentHP = this.maxHP;
        this.setModel();
        this.setRigidbody();
        this.setCollison();

    }




    protected setCollison() {
        this.addComponent('collision');
        if (this.collision == null) return;
        this.collision.type = 'box';
        this.collision.halfExtents = new pc.Vec3(this.scale.x/2, this.scale.y/2, this.scale.z/2);


       
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
                asset: AssetManager.getInstance().getAsset(SafeKeyAsset.ModelChest),
            })
        this.setLocalScale(this.scale);

        const material = new pc.StandardMaterial();
        const assetTexure = AssetManager.getInstance().getAsset(SafeKeyAsset.IMGFlowerTexure);
        material.diffuseMap = assetTexure?.resource;
        material.update();
        const meshInstance = this.model?.meshInstances[0];
        if (meshInstance) {
            meshInstance.material = material;
        }
    }



    private getRewardDimond() : number
    {
        return Math.floor(Math.random() * (6 - 4 + 1)) +4;
    }

    public onColisionEnter(result: any): void {

        if (!(result instanceof BladeManager)) return;
        this.currentHP--;
        result.ChangeRotationDirection();
        if (this.currentHP <= 0) {
            let dimondAdd = this.getRewardDimond();
            DimondManager.getInstace().addDimond(dimondAdd);
            //call UI show UI
            this.destroy();
        }
    }











}