import * as pc from 'playcanvas';

export class SceneManager {
    private camera!: pc.Entity;
    private light!: pc.Entity;
    private ground!: pc.Entity;

    constructor(private app: pc.Application) {
        this.createCamera();
        this.createLight();
      //  this.createGround();
    }

    private createCamera() {
        this.camera = new pc.Entity('camera');
        this.camera.addComponent('camera', {
            clearColor: new pc.Color(0.5, 0.6, 0.9)
        });
        this.app.root.addChild(this.camera);
        this.camera.setPosition(0, 5, 10);
        this.camera.lookAt(0, 0, 0);
    }

    private createLight() {
        this.light = new pc.Entity('light');
        this.light.addComponent('light', {
            type: 'directional',
            color: new pc.Color(1, 1, 1),
            castShadows: true,
            intensity: 2,
            shadowBias: 0.2,
            shadowDistance: 16,
            normalOffsetBias: 0.05,
            shadowResolution: 2048
        });
        this.light.setEulerAngles(45, 0, 0);
        this.app.root.addChild(this.light);
    }

    private createGround() {
        this.ground = new pc.Entity('ground');
        
        // Add model component first
        this.ground.addComponent('model', { type: 'box' });
        
        // Set scale after adding model component
        this.ground.setLocalScale(10, 0.1, 10);
        
        // Add collision component
        this.ground.addComponent('collision', {
            type: 'box',
            halfExtents: new pc.Vec3(5, 0.05, 5)
        });
        
        // Add rigidbody component last
        this.ground.addComponent('rigidbody', {
            type: 'static',
            restitution: 0.5
        });

        // Add to scene
        this.app.root.addChild(this.ground);
    }
}