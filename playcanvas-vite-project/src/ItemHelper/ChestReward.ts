import * as pc from 'playcanvas'

import { ItemType } from './TypeItem';
import { ItemHelper } from './itemhelper';
import { BladeManager } from '../BladeManger/BladeManager';
import { AssetManager } from '../Utils/AssetManager';
import { SafeKeyAsset } from '../Helper/SafeKeyAsset';
import { DimondManager } from '../Player/DimondManager';
import { EventManager } from '../Utils/Observer';
import { SafeKeyEvent } from '../Helper/SafeKeyEvent';



export class ChestReward extends ItemHelper {

    private readonly maxDimond : number = 6;
    private readonly minDimond : number = 4;

    private scale: pc.Vec3 = new pc.Vec3(1.5, 1.5, 1.5);
    private maxHP: number = 4;
    private currentHP: number = 0;
    private colorHit: pc.Color = new pc.Color(255 / 255, 51 / 255, 51 / 255);

    private originalMaterials: pc.Material[] = [];

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

    private setCollison() {
        this.addComponent('collision');
        if (this.collision == null) return;
        this.collision.type = 'box';
        this.collision.halfExtents = new pc.Vec3(1,1,1  );

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
                asset: AssetManager.getInstance().getAsset(SafeKeyAsset.ModelChest),
            })
        this.setLocalScale(this.scale);


        if (this.model && this.model.meshInstances) {
            for (let i = 0; i < this.model.meshInstances.length; i++) {
                const meshInstance = this.model.meshInstances[i];
                this.originalMaterials[i] = meshInstance.material;
            }
        }
    }

    private getRewardDimond(): number {
        return Math.floor(Math.random() * (this.maxDimond - this.minDimond + 1)) + this.minDimond;
    }


    private setHitEffect() {
        const material = new pc.StandardMaterial();
        material.diffuse = this.colorHit;
        material.metalness = 0.7;
        material.update();
        if (this.model && this.model.meshInstances) {
            for (let i = 0; i < this.model.meshInstances.length; i++) {
                const meshInstance = this.model.meshInstances[i];
                meshInstance.material = material;
            }
        }

        setTimeout(() => {
            if (this.model && this.model.meshInstances) {
                for (let i = 0; i < this.model.meshInstances.length; i++) {
                    const meshInstance = this.model.meshInstances[i];
                    meshInstance.material = this.originalMaterials[i];
                }
            }
        }, 200);
    }

    public onCollision(bladeManager: BladeManager): void {

        this.currentHP--;
        this.setHitEffect();
        bladeManager.ChangeRotationDirection();
        EventManager.emit(SafeKeyEvent.PlaySoundSFXWoodBreak);


        if (this.currentHP > 0) return;
        EventManager.emit(SafeKeyEvent.PlaySoundSFXCutItem);

        let dimondAdd = this.getRewardDimond();
        DimondManager.getInstace().addDimond(dimondAdd);
        EventManager.emit(SafeKeyEvent.PlayParticleCutItem, this.getPosition());
        //call UI show UI
        
        EventManager.emit(SafeKeyEvent.SetPauseBlade);
        EventManager.emit(SafeKeyEvent.OpenUiDimondReward, dimondAdd);
        this.destroy();

    }
}