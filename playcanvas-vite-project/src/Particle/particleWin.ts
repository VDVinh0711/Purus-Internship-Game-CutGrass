import { SafeKeyAsset } from "../Helper/SafeKeyAsset";
import { AssetManager } from "../Utils/AssetManager";
import * as pc from "playcanvas";


export class ParticleWin extends pc.Entity
{
    constructor() {
        super();
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
            [0, 255 / 255],
            [0, 255 / 255],
            [0, 27 / 255]
        ]);
        this.addComponent('particlesystem', {
            numParticles: 40,
            lifetime: 1,
            rate: 0.01,
            scaleGraph: new pc.Curve([0, 0.5]),
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

        this.particlesystem!.mesh = AssetManager.getInstance().getAsset(SafeKeyAsset.ModelStar)?.resource.meshInstances[0].mesh;
    }

    public Play() {
        if (this.particlesystem == null) return;
        this.particlesystem.reset();
        this.particlesystem.play();
    }
}