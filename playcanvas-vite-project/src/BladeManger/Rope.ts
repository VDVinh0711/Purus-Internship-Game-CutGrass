import * as pc from 'playcanvas'
export class Rope extends pc.Entity {

    private readonly scaleX: number = 0.1;
    private readonly scaleY: number = 0.1;
    private scaleZ: number = 3;
    constructor(name: string) {
        super();
        this.name = name;
    }

    public Init(): Rope {
        this.setLocalScale(this.scaleX, this.scaleY, this.scaleZ);
        this.setLocalRotation(0, 0, 0);
        this.AddComponent();
        return this;
    }

    private AddComponent() {
        this.setRender();
        this.setRigidbody();
        this.setcollision();


    }
    private setcollision() {
        this.addComponent('collision');
        if (this.collision == null) return;
        this.collision.type = 'box';
        this.collision.halfExtents = new pc.Vec3(this.scaleX * 4 , this.scaleY/2, this.scaleZ / 2);
        this.collision.on('collisionstart', this.eventColision.bind(this));

    }

    public setWidthRope(scaleZ: number) {
        this.scaleZ = scaleZ;
        this.setLocalScale(this.scaleX, this.scaleY, this.scaleZ);
        if (this.collision == null) return;
        this.collision.halfExtents = new pc.Vec3(this.scaleX , this.scaleY , this.scaleZ);
    }

    private setRigidbody() {
        this.addComponent('rigidbody');
        if (this.rigidbody == null) return;
        this.rigidbody.type = pc.RIGIDBODY_TYPE_KINEMATIC;
        this.rigidbody.mass = 1;
        this.rigidbody.restitution = 0.5;
    }

    private setRender() {
        this.addComponent('render');
        if (this.render == null) return;
        this.render.type = 'box';
        this.render.material = this.createMaterial( new pc.Color(1,1,1  ));
    }


    //call event when coli
    private eventColision(result: any) {
        this.fire('rope:collision', result);
    }

    public updateRope(posRoot: pc.Vec3, posRotating: pc.Vec3) {
        const midPoint = new pc.Vec3((posRoot.x + posRotating.x) / 2, (posRoot.y + posRotating.y) / 2, (posRoot.z + posRotating.z) / 2);
        this.setPosition(midPoint);
        this.lookAt(posRotating);
    }


    private createMaterial(color : pc.Color) : pc.Material
    {
        const material = new pc.StandardMaterial();
        material.diffuse = color;
        material.metalness = 0.7;
        material.update();
        return material;

       
    }

    public changeRopeColor(color : pc.Color)
    {
        if(this.render == null) return;
        const material = this.createMaterial(color);
        this.render.material = material;
    }

}