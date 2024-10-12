import * as pc from 'playcanvas'
import { ItemType } from './TypeItem';

export class ItemHelper extends pc.Entity
{
    public type !: ItemType;
    public duration : number = 4;
    constructor(type : ItemType)
    {
      super();  
      this.type = type;
      this.init();
    }


    init() 
    {
        this.name = 'itemhelper';
        this.AddComponent();
    }
   

    private AddComponent()
    {
       
        this.setModel();
        this.setRigidbody();
        this.setCollison();
    }

    private setCollison()
    {
        this.addComponent('collision');
        if(this.collision == null) return;
        this.collision.type = 'box';
        this.collision.halfExtents = new pc.Vec3(0.1,3,0.1);
    }
    private setRigidbody()
    {
        this.addComponent('rigidbody');
        if(this.rigidbody == null) return;
        this.rigidbody.type = pc.BODYTYPE_KINEMATIC;
        this.rigidbody.mass = 1;
        this.rigidbody.restitution = 0.5;
    }
    
    private setModel()
    {
        pc.Application.getApplication()?.assets.loadFromUrl("../../Asset/Models/Flower2.glb","model",(err, asset: pc.Asset | undefined) =>
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
                const material = this.createMaterial();
                const meshInstance = this.model?.meshInstances[0];
    
          // set the material
                meshInstance!.material = material;
            })
    }
    

   
    private createMaterial() : pc.Material
    {
        const material = new pc.StandardMaterial();
        material.diffuse = new pc.Color(0.56, 0.93, 0.56); // Red color
        material.metalness = 0.7;
        material.update();
        return material;
    }


    
}