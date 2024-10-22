import * as pc from 'playcanvas'
import { AssetManager } from '../Utils/AssetManager';
import { SafeKeyAsset } from '../Helper/SafeKeyAsset';
export class ParticleCutGrass extends pc.Entity {
    constructor() {
        super();
        this.name = 'particleCutGrass';
        this.settUp();
    }

    public settUp() {
        const localVelocityCurve = new pc.CurveSet([
            [0, 0, 0, 0],
            [0, 0, 0.5, 1,0.7,-1],
            [0, 0, 0., 0]
        ]);
        const localVelocityCurve2 = new pc.CurveSet([
            [0, 0, 0, 0],
            [0, 0, 0.5, -8,0.7,-1],
            [0, 0, 0, 0]
        ]);

        // increasing gravity
        const worldVelocityCurve = new pc.CurveSet([
            [0, 0],
            [0, 0, 0.2, 2, 0.7, -1],
            [0, 0]
        ]);

        // color changes throughout lifetime
        const colorCurve = new pc.CurveSet([
            [0, 63 / 255],
            [0, 91 / 255],
            [0, 56 / 255]
        ]);

        
        this.addComponent('particlesystem', {
            numParticles: 20,
            lifetime: 1,
            rate: 0.01,
            scaleGraph: new pc.Curve([0, 0.1]),
            velocityGraph: worldVelocityCurve,
            localVelocityGraph: localVelocityCurve,
            localVelocityGraph2: localVelocityCurve2,
            colorGraph: colorCurve,
            emitterShape: pc.EMITTERSHAPE_SPHERE,
            emitterRadius: 1,
            blendType: pc.BLEND_NONE,
            depthWrite: true,
            lighting: true,
            halfLambert: true,
            alignToMotion: true,
            loop: false,
        });
        
        //this.particlesystem!.mesh = AssetManager.getInstance().getAsset(SafeKeyAsset.ModelParticleGrass)?.resource.meshInstances[0].mesh;
    }

    public Play() {
        if (this.particlesystem == null) return;
        this.particlesystem.reset();
        this.particlesystem.play();
        setTimeout(() => {
            this.Stop();
        }, 800);

    }

    public Stop() {
        if (this.particlesystem == null) return;
        this.particlesystem.stop();
        this.fire('particles:stop', this);
    }
}