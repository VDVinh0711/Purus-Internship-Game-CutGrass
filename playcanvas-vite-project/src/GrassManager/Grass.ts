import * as pc from 'playcanvas'
import { AssetManager } from '../Utils/AssetManager';
import { SafeKeyAsset } from '../Helper/SafeKeyAsset';
export class Grass extends pc.Entity {

    constructor() {
        super();
        this.name = 'grass';
        this.init();
    }

    public init() {
        this.AddComponent();
    }

    private createMaterial(): pc.Material {
        const material = new pc.StandardMaterial();
        material.diffuse = new pc.Color(255 / 255, 255 / 255, 255 / 255);
        material.metalness = 0.7;
        material.update();
        return material;
    }

    private AddComponent() {
        this.setModel();
        this.setRigidbody();
        this.setCollision();
    }

    private setModel() {
        this.addComponent("model",
            {
                type: "asset",
                asset: AssetManager.getInstance().getAsset(SafeKeyAsset.ModelGrass),
            });
        this.setLocalScale(8, 30,8  );
        const material = this.createMaterial();
        const meshInstance = this.model?.meshInstances[0];
        meshInstance!.material = material;

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
        if (this.collision == null) return;
        this.collision.type = 'box';
        this.collision.halfExtents = new pc.Vec3(0.2, 1, 0.2);
    }

}