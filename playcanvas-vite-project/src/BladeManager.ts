import * as pc from 'playcanvas';

export class BladeManager {
    private blade1: pc.Entity;
    private blade2: pc.Entity;
    private angle: number = 0;
    private radius: number = 3;
    private dir: number = 1;

    constructor(private app: pc.Application) {
        this.blade1 = this.createBlade(new pc.Vec3(0, 2, 0));
        this.blade2 = this.createBlade(new pc.Vec3(2, 2, 0));
        this.setupMouseHandler();
    }

    private createBlade(position: pc.Vec3): pc.Entity {
        const blade = new pc.Entity('blade');
        blade.addComponent('model', { type: 'box' });
        blade.setPosition(position);
        blade.setLocalScale(1.5, 0.3, 0.1);



        

        // blade.addComponent('rigidbody', {
        //     type: 'kinematic',
        //     mass: 1,
        //     restitution: 0.5
        // });
        // blade.addComponent('collision', {
        //     type: 'box',
        //     halfExtents: new pc.Vec3(0.75, 0.15, 0.05)
        // });
        // blade.collision?.on('collisionstart', () => console.log("collision"));
        this.app.root.addChild(blade);
        return blade;
    }

    private setupMouseHandler() {
        const mouse = new pc.Mouse(document.body);
        mouse.on('mousedown', () => {
            console.log("click");
            this.dir *= -1;
            this.angle += Math.PI;
            [this.blade1, this.blade2] = [this.blade2, this.blade1];
        });
    }

    public update(dt: number) {
        this.blade1.rotate(0, 100 * dt, 0);
        this.blade2.rotate(0, 100 * dt, 0);

        this.angle += this.dir * (1 * dt);
        const rootPos = this.blade1.getPosition();
        const x = Math.cos(this.angle) * this.radius;
        const z = Math.sin(this.angle) * this.radius;
        this.blade2.setPosition(rootPos.x + x, rootPos.y, rootPos.z + z);
    }
}