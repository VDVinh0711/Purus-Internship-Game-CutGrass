import * as pc from 'playcanvas'
export class Grass  extends pc.Entity
{
    private material!: pc.Material;
    constructor()
    {
        super();
        this.name = 'grass';
        this.init();
    }

    init() 
    {
        this.material = this.createMaterial();
        this.AddComponent();
        this.loadAsset();
        //this.setRender();
        this.setRigidbody();
        this.setCollision();
        return this;
    }

    private createMaterial() : pc.Material
    {
        const material = new pc.StandardMaterial();
        material.diffuse = new pc.Color(0.56, 0.93, 0.56); 
        material.metalness = 0.7;
        material.update();
        return material;
    }


    private loadAsset()
    {
        pc.Application.getApplication()?.assets.loadFromUrl("../../Asset/Models/Grass1.glb","model",(err, asset: pc.Asset | undefined) =>
        {
            if (err) {
                console.log("erro");
                console.error(err);
                return;
            }
            this.addComponent("model",
                {
                    type: "asset",
                    asset: asset,
                }
            )


            this.setLocalScale(9,11,9);

            const meshInstance = this.model?.meshInstances[0];

      // set the material
            meshInstance!.material = this.material;
        })
    }
    private AddComponent()
    {
       // this.addComponent('render');
        this.addComponent('rigidbody');
        this.addComponent('collision');
    }

    private setRigidbody()
    {
        if(this.rigidbody == null) return;
        this.rigidbody.type = pc.BODYTYPE_KINEMATIC;
        this.rigidbody.mass = 1;
        this.rigidbody.restitution = 0.5;
    }
    private setCollision()
    {
        if(this.collision == null) return;
        this.collision.type = 'box';
        this.collision.halfExtents = new pc.Vec3(0.1,1,0.1);
    }
    
}