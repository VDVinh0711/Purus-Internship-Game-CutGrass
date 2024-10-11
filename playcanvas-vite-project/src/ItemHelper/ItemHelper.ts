import * as pc from 'playcanvas'
import { ItemType } from './TypeItem';

export class ItemHelper extends pc.Entity
{
    public type !: ItemType;
    public duration : number = 4;
    private material!: pc.Material;
    constructor(type : ItemType)
    {
      super();  
      this.type = type;
      this.init();
    }


    // private Init()
    // {
    //     this.AddComponent();
    //     this.setRender();
    //     this.setRigidbody();
    //     this.setCollison();
    // }

    // private AddComponent()
    // {
    //     this.addComponent('render');
    //     this.addComponent('rigidbody');
    //     this.addComponent('collision');
    // }


    // private setRender()
    // {
    //     if(this.render == null) return;
    //     this.render.type  = 'cylinder';
    //     this.setLocalScale(0.1,20,0.1);
    // }
    // private setRigidbody()
    // {
    //     if(this.rigidbody == null) return;
    //     this.rigidbody.type = pc.BODYTYPE_KINEMATIC;
    //     this.rigidbody.mass = 1;
    //     this.rigidbody.restitution = 0.5;
    // }
    // private setCollison()
    // {
    //     if(this.collision == null) return;
    //     this.collision.type = 'cylinder';
    //     this.collision.height = 20;
    //     this.collision.radius = 0.05;
    //     this.collision.axis = 2; 
    // }
    
    // constructor()
    // {
    //     super();
    //     this.name = 'grass';
    //     this.init();
    // }

    init() 
    {
        this.name = 'itemhelper';
        this.material = this.createMaterial();
        this.addComponent('render', { type: 'box' , material: this.material });
        this.setLocalScale(0.2,6, 0.2);
        this.addComponent('rigidbody', {
            type: pc.BODYTYPE_KINEMATIC,
            mass: 1,
            restitution: 0.5
        });
        this.addComponent('collision', {
            type: 'box',
            halfExtents: new pc.Vec3(0.1, 3, 0.1)
        });
        return this;
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