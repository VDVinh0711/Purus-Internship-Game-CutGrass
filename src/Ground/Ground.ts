import * as pc from 'playcanvas'
export class Ground extends pc.Entity {
    
    private readonly scaleX : number = 2;
    private readonly scaleY : number = 1;
    private readonly scaleZ : number = 2;
    constructor() {
        super();
        this.init();
    }

    public init() {
        this.setLocalScale(this.scaleX,this.scaleY,this.scaleZ);
        this.AddComponent();
        this.setCollision();
        this.setRender();
    }

    private AddComponent() {
        this.addComponent('render');
        this.addComponent('collision'); 
    }

    private setRender() {
        if (this.render == null) return;
        const material = new pc.StandardMaterial();
        material.diffuse = new pc.Color(142/255, 255/255, 97/255); 
        material.metalness = 0.7;
        material.update();
        this.render.type = 'box';
        this.render.material = material;
        this.render.castShadows = false;
    }
    private setCollision() {
        if (this.collision == null) return;
        this.collision.type = 'box';
        this.collision.halfExtents = new pc.Vec3(this.scaleX/2, this.scaleY/2, this.scaleZ/2);
    }
}