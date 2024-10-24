import { SafeKeyEvent } from "../Helper/SafeKeyEvent";
import { PowerUpItem } from "../ItemHelper/PowerUpItem";
import { ItemType } from "../ItemHelper/TypeItem";
import { EventManager } from "../Utils/Observer";
import { BladeManager } from "./BladeManager";

export class BladeStat {
    private bladeManager: BladeManager;

    private timeCountDown: number = 0;
    private speedScaling: number = 4;
    private radiusOrigin: number;
    private speedOrigin: number;
    private readonly radiusPower: number = 5;
    private readonly speedPower: number = 5;

    private isPowering: boolean = false;
    public isLoadStat: boolean = false;
    public isShrinking: boolean = false;

    constructor(bladeManager: BladeManager) {
        this.bladeManager = bladeManager;
        this.radiusOrigin = this.bladeManager.getOriginRadius();
        this.speedOrigin = this.bladeManager.getSpeed();
    }

    public getIsPowering() {
        return this.isPowering;
    }

    public setIsPowering(value: boolean) {
        this.isPowering = value;
        if (value == false) {
            this.startShrinking();
        }
    }

    private startShrinking() {
        this.isPowering = false;
        this.isShrinking = true;
        this.bladeManager.setSpeedRotate(0);
        EventManager.emit(SafeKeyEvent.CloseUIStats);
    }

    public reciveItemPowerUp(item: PowerUpItem) {
        if (item.getType() != ItemType.powerUp) return;
        this.isPowering = true;
        this.timeCountDown = item.duration;
        this.isLoadStat = true;
        EventManager.emit(SafeKeyEvent.ChangeTimeExpireItem, this.timeCountDown);
        EventManager.emit(SafeKeyEvent.OpenUIStats);

    }

    public update(dt: number) {
        if (this.isLoadStat) {
            this.handlePowerUpLoading(dt);
        }
        else if (this.isShrinking) {
            this.handleShrinking(dt);
        }
        else if (this.isPowering) {
            this.handlePowerDuration(dt);
        }
    }

    private handlePowerUpLoading(dt: number) {
        let currentRadius = this.bladeManager.getRadius();
        if (currentRadius < this.radiusPower) {
            this.bladeManager.setSpeedRotate(0);
            let newRadius = currentRadius + (this.speedScaling * dt);
            this.bladeManager.setRadiusBaldes(Math.min(newRadius, this.radiusPower));
        }
        else {
            this.isLoadStat = false;
            this.bladeManager.setSpeedRotate(this.speedPower);
        }
    }

    private handleShrinking(dt: number) {
        let currentRadius = this.bladeManager.getRadius();
        if (currentRadius > this.radiusOrigin) {
            let newRadius = currentRadius - (this.speedScaling * dt);
            this.bladeManager.setRadiusBaldes(Math.max(newRadius, this.radiusOrigin));
        }
        else {
            this.isShrinking = false;
            this.bladeManager.setSpeedRotate(this.speedOrigin);
        }
    }

    private handlePowerDuration(dt: number) {
        this.timeCountDown -= dt;
        EventManager.emit(SafeKeyEvent.ChangeTimeExpireItem, this.timeCountDown);
        if (this.timeCountDown <= 0) {
            this.startShrinking();
        }
    }

    public reset() {
        this.isPowering = false;
        this.isLoadStat = false;
        this.isShrinking = false;
        this.timeCountDown = 0;
        this.bladeManager.setSpeedRotate(this.speedOrigin);
        this.bladeManager.setRadiusBaldes(this.radiusOrigin);
    }
}