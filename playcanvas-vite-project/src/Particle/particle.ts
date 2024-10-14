import * as pc from 'playcanvas'

export class Particle extends pc.Entity
{
    constructor(){
        super();
        this.name = 'particle';
        this.settUp();
       // this.Stop();
    }



    public settUp()
    {

        if(this.particlesystem != null) this.removeComponent('particlesystem');
        const localVelocityCurve = new pc.CurveSet([
            [0, 0, 0.5,5],
            [0, 0, 0.5, 0.2],
            [0, 0, 0.5, 5]
        ]);
        const localVelocityCurve2 = new pc.CurveSet([
            [0, 0, 0.5, -5],
            [0, 0, 0.5, -0.2],
            [0, 0, 0.5, -5]
        ]);
    
        // increasing gravity
        const worldVelocityCurve = new pc.CurveSet([
            [0, 0],
            [0, 0,1, 1, 1, -1],
            [0, 0]
        ]);
    
        // color changes throughout lifetime
        const colorCurve = new pc.CurveSet([
            [0, 0.56], 
            [0, 0.93], 
            [0, 0.56]
        ]);
    

        this.addComponent('particlesystem', {
            numParticles: 50,
            lifetime: 0.5,
            rate: 0.01,
            scaleGraph: new pc.Curve([0, 0.1, 0.1, 0.1]),
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
        
        
        
    }

    public Play()
    {
        this.settUp();
        if(this.particlesystem == null) return;
        this.particlesystem.play();

        setTimeout(() => {
            this.Stop();
        }, 800);
    }

    public Stop()
    {
        if(this.particlesystem == null) return;
        this.particlesystem.stop();
        this.fire('particles:stop',this);
    }
}