import * as pc from 'playcanvas'

export class Light extends pc.Entity
{
    private angleProjection : pc.Vec3  = new pc.Vec3(0,0,0);
    constructor()
    {
        super();
        this.init();
    }

    private init()
    {
        this.name = 'light';
        this.addComponent('light', {
            type: 'directional',
            color: new pc.Color(1, 1, 1),
            castShadows: false,
            intensity: 2.1,
            shadowBias: 0.2,
            shadowDistance: 16,
            normalOffsetBias: 0.05,
            shadowResolution: 2048
        });
        this.setEulerAngles(this.angleProjection);
    }
}