import * as pc from 'playcanvas'
import { AssetManager } from '../Utils/AssetManager';
import { SafeKeyAsset } from '../Helper/SafeKeyAsset';
export class ParticelBladeOutGround extends pc.Entity {
    constructor() {
        super();
        this.name = 'particleBladeOutGroudn';
        this.setUpBegin();
    }

    private setUpBegin() {
        const localVelocityCurve = new pc.CurveSet([
            [0, 0, 0.5, 10],
            [0, 0, 0.5, 10],
            [0, 0, 0.5, 10]
        ]);
        const localVelocityCurve2 = new pc.CurveSet([
            [0, 0, 0.5, -8],
            [0, 0, 0.5, -8],
            [0, 0, 0.5, -8]
        ]);

        // increasing gravity
        const worldVelocityCurve = new pc.CurveSet([
            [0, 0],
            [0, 0, 0.2, 12, 1, -2],
            [0, 0]
        ]);

        // color changes throughout lifetime
        const colorCurve = new pc.CurveSet([
            [0, 0 / 255],
            [0, 138 / 255],
            [0, 255 / 255]
        ]);
        this.addComponent('particlesystem', {
            numParticles: 40,
            lifetime: 1,
            rate: 0.01,
            scaleGraph: new pc.Curve([0, 50]),
            velocityGraph: worldVelocityCurve,
            localVelocityGraph: localVelocityCurve,
            localVelocityGraph2: localVelocityCurve2,
            colorGraph: colorCurve,
            emitterShape: pc.EMITTERSHAPE_SPHERE,
            emitterRadius: 0,
            blendType: pc.BLEND_NONE,
            depthWrite: true,
            lighting: true,
            halfLambert: true,
            alignToMotion: true,
            loop: false,
        });
        this.particlesystem!.mesh = AssetManager.getInstance().getAsset(SafeKeyAsset.ModelParticleLose)?.resource.meshInstances[0].mesh;
    }


    public Play() {
        if (this.particlesystem == null) return;
        this.particlesystem.reset();
        this.particlesystem.play();
    }
}