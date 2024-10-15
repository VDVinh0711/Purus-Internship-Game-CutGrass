import * as pc from 'playcanvas'
import { AssetManager } from '../Utils/AssetManager';
export class Grass extends pc.Entity {

    constructor() {
        super();
        this.name = 'grass';
        this.init();
    }

    init() {
        this.AddComponent();
    }

    private createMaterial(): pc.Material {
        const material = new pc.StandardMaterial();
        material.diffuse = new pc.Color(40 / 255, 94 / 255, 11 / 255);
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
        // pc.Application.getApplication()?.assets.loadFromUrl("../../Asset/Models/Grass5.glb", "model", (err, asset: pc.Asset | undefined) => {
        //     if (err) {
        //         console.log("erro");
        //         console.error(err);
        //         return;
        //     }

        //     this.addComponent("model",
        //         {
        //             type: "asset",
        //             asset: asset,
        //         }
        //     )
        //     this.setLocalScale(3,0.5,3);
        //     const material = this.createMaterial();
        //     const meshInstance = this.model?.meshInstances[0];

        //     // set the material
        //     meshInstance!.material = material;
        // })

        this.addComponent("model",
            {
                type: "asset",
                asset: AssetManager.getInstance().getAsset('modelGrass'),
            });
        this.setLocalScale(3, 0.5, 3);
        const material = this.createMaterial();
        const meshInstance = this.model?.meshInstances[0];

        // set the material
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