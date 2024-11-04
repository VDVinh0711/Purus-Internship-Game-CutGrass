import * as pc from 'playcanvas';
import { AssetManager } from '../Utils/AssetManager';
import { SafeKeyAsset } from '../Helper/SafeKeyAsset';
import { ImodelChaiSaw } from '../Interface/Imodeltexure';

export class Blade extends pc.Entity {
    private modelChild!: pc.Entity;
    private dirRotate : number   =1;
    private readonly speedRotate : number = 500
    private readonly scaleModel : pc.Vec3 = new pc.Vec3(1.25,1.25,2);
    private readonly radiusColision : number = 1;
    private readonly heightColision : number = 0.5;

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

    public setDirRotate(value : number)
    {   
        this.dirRotate = value;
    }

    private loadModelChild() {
        this.modelChild = new pc.Entity('model');
        this.modelChild.rotate(90, 0, 0);
        this.addChild(this.modelChild);
        this.setUpModelChild();
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
        this.collision.radius = this.radiusColision;
        this.collision.height = this.heightColision;
        this.collision.on('collisionstart', this.onColisionEnter.bind(this));

    }

    private setUpModelChild() {
        const app = pc.Application.getApplication();
        if (!app) return;

        this.modelChild.addComponent("model", {
            type: "asset",
            asset: AssetManager.getInstance().getAsset(SafeKeyAsset.ModelBladeSimple),
        });
        this.modelChild.setLocalScale(this.scaleModel);

        const material = new pc.StandardMaterial();
        const assetTexure = AssetManager.getInstance().getAsset(SafeKeyAsset.TexureBladeSimple);
        material.diffuseMap = assetTexure?.resource;
        material.update();


        
        const yellowMaterial = new pc.StandardMaterial();
        yellowMaterial.diffuse = new pc.Color(1, 1, 0); 
        yellowMaterial.update();


        
        console.log(this.modelChild.model?.meshInstances);
        const meshInstance = this.modelChild.model?.meshInstances[0];

        if (meshInstance) {
            meshInstance.material = material;
        }
    }


    public setModelBlade(data : ImodelChaiSaw)
    {
        if(this.modelChild.model == null) return;
        this.modelChild.model.asset = AssetManager.getInstance().getAsset(data.model)!;

        const material = new pc.StandardMaterial();
        const assetTexure =AssetManager.getInstance().getAsset(data.texure);
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
        this.rotate(0, this.speedRotate * this.dirRotate * dt, 0);
    }
}