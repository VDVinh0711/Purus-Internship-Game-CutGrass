
import * as pc from 'playcanvas'
export class Blade extends pc.Entity {

    private scaleX : number = 1;
    private scaleY : number = 0.2;
    private scaleZ : number = 1;
    private modelChild !: pc.Entity;
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
        if (this.collision == null) return;
        this.collision.type = 'box';
        this.collision.halfExtents = new pc.Vec3(this.scaleX/2, this.scaleY/2, this.scaleZ/2);

        this.collision.on('collisionstart', this.onColisionEnter.bind(this));
    }

    private setModelChild() {

        pc.Application.getApplication()?.assets.loadFromUrl("../../Asset/Models/Sword2.glb", "model", (err, asset: pc.Asset | undefined) => {
            if (err) {
                console.log("erro");
                console.error(err);
                return;
            }
            this.modelChild.addComponent("model",
                {
                    type: "asset",
                    asset: asset,
                }
            )
            this.modelChild.setLocalScale(1, 1, 1);

            pc.Application.getApplication()?.assets.loadFromUrl("../../Asset/Texure/Albedo Sword 2.png", "texture", (err, asset: pc.Asset | undefined) => {
                if (err) {
                  console.error(err);
                  return;
                }

                const material = new pc.StandardMaterial();
                material.diffuseMap = asset?.resource;
                material.update();
                const meshInstance = this.modelChild.model?.meshInstances[0];
    
                // set the material
                meshInstance!.material = material;
            });
           
        })
    }
    private onColisionEnter(result: any) {
        this.fire('blade:collision', result);
    }


    public update(dt: number) {
        this.rotate(0, 1000 * dt, 0);
    }
}