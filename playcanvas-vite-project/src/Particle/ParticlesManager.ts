import * as pc from 'playcanvas'
import { ParticleCutGrass } from './particleCutGrass'
import { EventManager } from '../Utils/Observer';
import { SafeKeyEvent } from '../Helper/SafeKeyEvent';
import { ParticelBladeOutGround } from './particleBladeOutGround';
import { ParticleWin } from './particleWin';

export class ParticleSystem extends pc.Entity
{
    private particlesCutGrass : ParticleCutGrass[] = [];
    private particlesCutGrassActive  : ParticleCutGrass[] = [];
    private particlesOutGround !: ParticelBladeOutGround;
    private particleWin !: ParticleWin;

    constructor()
    {
        super();
        this.name = 'particleSystem';
        this.init();
        this.registerEvent();
       
    }

    private registerEvent()
    {
        EventManager.on(SafeKeyEvent.PlayParticle, this.PlayParticlesCutGrass.bind(this));
        EventManager.on(SafeKeyEvent.ClearParticles, this.clearParticles.bind(this));

        EventManager.on(SafeKeyEvent.PlayParticleOutGround, this.PlayparticleOutofGround.bind(this));
        EventManager.on(SafeKeyEvent.PlayParticleWIn, this.PlayparticleWinMap.bind(this));
    }


    private init()
    {
        for(let i = 0 ; i<20 ;i++)
        {
          this.createParticleCutGrass();
        }
        this.particlesOutGround = new ParticelBladeOutGround();
        this.addChild(this.particlesOutGround);
        this.particlesOutGround.enabled = false;


        this.particleWin = new ParticleWin();
        this.addChild(this.particleWin);
        this.particleWin.enabled = false;
    }

    private createParticleCutGrass() : ParticleCutGrass
    {
        const newParticle = new ParticleCutGrass();
        newParticle.on('particles:stop', this.deSpawmParticle, this);
        newParticle.enabled = false;
        this.addChild(newParticle);
        this.particlesCutGrass.push(newParticle);
        return newParticle;
    }


    public PlayParticlesCutGrass(pos : pc.Vec3)
    {
        let particle: ParticleCutGrass | undefined;
        if (this.particlesCutGrass.length > 0) {
            particle = this.particlesCutGrass.pop();
        } else {
            particle = this.createParticleCutGrass();
        }
        if (particle) {
            particle.enabled = true;
            particle.setPosition(pos);
            particle.Play();
            this.particlesCutGrassActive.push(particle);
        }
    }


    private deSpawmParticle(particle : ParticleCutGrass)
    {
        const index = this.particlesCutGrassActive.indexOf(particle);
        if (index == -1)  return;
        particle.enabled = false;
        this.particlesCutGrassActive.splice(index, 1);
        this.particlesCutGrass.push(particle);
    }

    private clearParticles()
    {
        this.particlesCutGrassActive.forEach(particle => {
            particle.enabled = false;
            this.particlesCutGrass.push(particle);
        });
        this.particlesCutGrassActive.length = 0;
    }

    private PlayparticleOutofGround(pos : pc.Vec3)
    {
        this.particlesOutGround.setPosition(pos);
        this.particlesOutGround.enabled =true;
        this.particlesOutGround.Play();
    }

    private PlayparticleWinMap(pos : pc.Vec3)
    {
        this.particleWin.setPosition(pos);
        this.particleWin.enabled =true;
        this.particleWin.Play();
    }

}