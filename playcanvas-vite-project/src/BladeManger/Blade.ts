import * as pc from 'playcanvas';
import { AssetManager } from '../Utils/AssetManager';
import { SafeKeyAsset } from '../Helper/SafeKeyAsset';

export class Blade extends pc.Entity {
    private scaleX: number = 1;
    private scaleY: number = 0.5;
    private scaleZ: number = 1;
    private modelChild!: pc.Entity;

    constructor(name: string) {
        super();
        this.name = name;
    }

    public Init(position: pc.Vec3): Blade {
        this.setPosition(position);
        this.AddComponent();
        this.loadModelChild();
        return this;
    }

    private loadModelChild() {
        this.modelChild = new pc.Entity('model');
        this.modelChild.rotate(90, 0, 0);
        this.addChild(this.modelChild);
        this.setModelChild();
    }

    private AddComponent() {
        this.setRigidbody();
        this.setCollision();
    }

    private setRigidbody() {
        this.addComponent('rigidbody');
        if (this.rigidbody == null) return;
        this.rigidbody.type = pc.BODYTYPE_KINEMATIC;
        this.rigidbody.mass = 1;
        this.rigidbody.restitution = 0.5;

    }

    private setCollision() {
        this.addComponent('collision');
        if (this.collision == null) return
        this.collision.type = 'cylinder'
        // this.collision.halfExtents = new pc.Vec3(this.scaleX , this.scaleY , this.scaleZ);
        this.collision.radius = 1;
        this.collision.height = 0.5
        this.collision.on('collisionstart', this.onColisionEnter.bind(this));

    }

    private setModelChild() {
        const app = pc.Application.getApplication();
        if (!app) return;

        this.modelChild.addComponent("model", {
            type: "asset",
            asset: AssetManager.getInstance().getAsset(SafeKeyAsset.ModelBlade),
        });
        this.modelChild.setLocalScale(1, 1, 1);

        const material = new pc.StandardMaterial();
        const assetTexure = AssetManager.getInstance().getAsset(SafeKeyAsset.TexureBlade);
        material.diffuseMap = assetTexure?.resource;
        material.update();
        const meshInstance = this.modelChild.model?.meshInstances[0];
        if (meshInstance) {
            meshInstance.material = material;
        }

    }


    private onColisionEnter(result: any) {
        this.fire('blade:collision', result);
    }

    public update(dt: number) {
        this.rotate(0, 1000 * dt, 0);
    }
}