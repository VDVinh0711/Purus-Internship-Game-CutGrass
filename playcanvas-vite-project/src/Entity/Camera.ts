import * as pc from 'playcanvas';
import { BladeManager } from '../BladeManger/BladeManager';
import EntityManager from './EntityManager';
import { SafeNameEntity } from '../Helper/SafeNameEntity';

export class Camera extends pc.Entity {
    private colorBackground: pc.Color = new pc.Color(0.5, 0.6, 0.9);
    private targetPosition: pc.Vec3 = new pc.Vec3();
    private targetLookAt: pc.Vec3 = new pc.Vec3();
    private smoothFactor: number = 0.1;
    private offset: pc.Vec3 = new pc.Vec3(0, 15, 10);

    constructor() {
        super();
        this.init();
    }

    private init() {
        this.name = 'camera';
        this.addComponent('camera', {
            clearColor: this.colorBackground
        });
        this.setPosition(0, 20, 20);
    }

    public update(dt: number) {
        const bladeManager = EntityManager.getInstance().getEntity(SafeNameEntity.BladeManager) as BladeManager;
        if (!bladeManager) return;

        const bladePosition = bladeManager.getPosRootBlade();
        this.targetPosition.copy(bladePosition).add(this.offset);

        
        const currentPosition = this.getPosition();
        currentPosition.lerp(currentPosition, this.targetPosition, this.smoothFactor);
        this.setPosition(currentPosition);

        this.targetLookAt.lerp(this.targetLookAt, bladePosition, this.smoothFactor);
        this.lookAt(this.targetLookAt);
    }
}