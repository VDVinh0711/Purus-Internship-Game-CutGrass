import * as pc from 'playcanvas'
export class Ground extends pc.Entity {
    
    constructor() {
        super();
        this.init();
    }

    public init() {
        this.setLocalScale(1,1,1);
        this.AddComponent();
        this.setRigidbody();
        this.setCollision();
        this.setRender();
    }

    private AddComponent() {
        this.addComponent('render');
        this.addComponent('rigidbody');
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
    }
    private setRigidbody() {
        if (this.rigidbody == null) return;
        this.rigidbody.type = pc.RIGIDBODY_TYPE_KINEMATIC;
        this.rigidbody.mass = 1;
        this.rigidbody.restitution = 0.5;
    }
    private setCollision() {
        if (this.collision == null) return;
        this.collision.type = 'box';
        this.collision.halfExtents = new pc.Vec3(0.5, 0.5, 0.5);
    }
}