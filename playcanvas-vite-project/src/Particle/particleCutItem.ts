import * as pc from 'playcanvas'
import { AssetManager } from '../Utils/AssetManager';
import { SafeKeyAsset } from '../Helper/SafeKeyAsset';

export class ParticleCutItem extends pc.Entity
{
    constructor()
    {
        super();
        this.settUp();
    }

    private settUp() {
       
        const velocityCurve1 = new pc.CurveSet([
            [0, -1, 0.15,-5], 
            [0, -1, 0.15, 1], 
            [0, -1,0.15,-5]
        ]);

        const velocityCurve2 = new pc.CurveSet([
            [0, 1,0.15,6],  
            [0, 1, 0.15, 10],  
            [0, 1,0.15,6]
        ]);

        const radialSpeed = new pc.CurveSet([
            [0, 80]  
        ]);

        const colorCurve = new pc.CurveSet([
            [0, 255 / 255],
            [0, 255 / 255],
            [0, 255 / 255]
        ]);

        
        this.addComponent('particlesystem', {
            numParticles :50,
            lifetime :1,
            rate : 0,
            scaleGraph : new pc.Curve([0,0.1]),
            velocityGraph: velocityCurve1,
            velocityGraph2: velocityCurve2,
            colorGraph : colorCurve,
            radialSpeedGraph : radialSpeed,
            emitterShape: pc.EMITTERSHAPE_SPHERE,
            emitterRadius: 0,
            blendType: pc.BLEND_NONE,
            depthWrite: true,
            lighting: true,
            halfLambert: true,
            alignToMotion: true,
            loop: false,

        });
        
        this.particlesystem!.mesh = AssetManager.getInstance().getAsset(SafeKeyAsset.ModelStar)?.resource.meshInstances[0].mesh;
    }

    public Play() {
        if (this.particlesystem == null) return;
        this.particlesystem.reset();
        this.particlesystem.play();
    }

    public Stop() {
        if (this.particlesystem == null) return;
        this.particlesystem.stop();
        this.fire('particles:stop', this);
    }

}