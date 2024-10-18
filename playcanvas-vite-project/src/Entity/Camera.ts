import * as pc from 'playcanvas';
import { BladeManager } from '../BladeManger/BladeManager';
import EntityManager from './EntityManager';
import { SafeNameEntity } from '../Helper/SafeNameEntity';
import { EventManager } from '../Utils/Observer';
import { SafeKeyEvent } from '../Helper/SafeKeyEvent';

export class Camera extends pc.Entity {
    private colorBackground: pc.Color = new pc.Color(0.5, 0.6, 0.9);
    private targetPosition: pc.Vec3 = new pc.Vec3();
    private targetLookAt: pc.Vec3 = new pc.Vec3();
    private smoothFactor: number = 0.01;
    private offset: pc.Vec3 = new pc.Vec3(0, 15, 15);
    private isMoving : boolean = true;

    private readonly originPos : pc.Vec3 = new pc.Vec3(0,20,20);

    constructor() {
        super();
        this.init();
        this.registerEvent();
    }

    private init() {
        this.name = 'camera';
        this.addComponent('camera', {
            clearColor: this.colorBackground
        });
        this.setPosition(this.originPos);
    }


    private registerEvent()
    {
        EventManager.on(SafeKeyEvent.SetMovingCamera, this.setMoving.bind(this));
        EventManager.on(SafeKeyEvent.UnsetMovingCamera, this.unSetMoving.bind(this));
    }

    private setMoving()
    {
        this.isMoving = true;
    }
    private unSetMoving()
    {
        this.isMoving = false;
        this.setPosition(this.originPos);
    }

    public update(dt: number) {
        if(!this.isMoving) return;
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