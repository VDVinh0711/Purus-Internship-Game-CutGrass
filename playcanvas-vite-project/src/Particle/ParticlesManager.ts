import * as pc from 'playcanvas'
import { Particle } from './particle'
import { EventManager } from '../Utils/Observer';
import { SafeKeyEvent } from '../Helper/SafeKeyEvent';

export class ParticleSystem extends pc.Entity
{
    private particles : Particle[] = [];
    private particlesActive  : Particle[] = [];

    constructor()
    {
        super();
        this.name = 'particleSystem';
        this.init();
        this.registerEvent();
       
    }

    private registerEvent()
    {
        EventManager.on(SafeKeyEvent.PlayParticle, this.PlayParticles.bind(this));
        EventManager.on(SafeKeyEvent.ClearParticles, this.clearParticles.bind(this));
    }


    private init()
    {
        for(let i = 0 ; i<20 ;i++)
        {
          this.createParticle();
        }
    }

    private createParticle() : Particle
    {
        const newParticle = new Particle();
        newParticle.on('particles:stop', this.deSpawmParticle, this);
        newParticle.enabled = false;
        this.addChild(newParticle);
        this.particles.push(newParticle);
        return newParticle;
    }


    public PlayParticles(pos : pc.Vec3)
    {
        let particle: Particle | undefined;
        if (this.particles.length > 0) {
            particle = this.particles.pop();
        } else {
            particle = this.createParticle();
        }
        if (particle) {
            particle.enabled = true;
            particle.setPosition(pos);
            particle.Play();
            this.particlesActive.push(particle);
        }
    }


    private deSpawmParticle(particle : Particle)
    {
        const index = this.particlesActive.indexOf(particle);
        if (index == -1)  return;
        particle.enabled = false;
        this.particlesActive.splice(index, 1);
        this.particles.push(particle);
    }

    private clearParticles()
    {
        this.particlesActive.forEach(particle => {
            particle.enabled = false;
            this.particles.push(particle);
        });
        this.particlesActive.length = 0;
    }

}