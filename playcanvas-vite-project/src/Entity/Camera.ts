import * as pc from 'playcanvas'

export class Camera extends pc.Entity
{
    private corlorBackground : pc.Color = new pc.Color(0.5,0.6,0.9);
    private posCamera : pc.Vec3 = new pc.Vec3(0,20,20);
    private targetLook : pc.Vec3 = new pc.Vec3(0,0,0);
    constructor()
    {
        super();
        this.init();
    }
    private init()
    {
        this.name = 'camera';
        this.addComponent('camera', {
            clearColor: this.corlorBackground
        });
        this.setPosition(this.posCamera);
        this.lookAt(this.targetLook);
    }
}