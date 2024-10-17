import * as pc from 'playcanvas'
import { BtnSFX } from './BtnSfx';
import { BtnSoundBackground } from './BtnSoundBackground';
import { BtnExit } from './BtnExit';

export class UISetting extends pc.Entity
{
    private background !: pc.Entity;
    private btnSFX !: BtnSFX;
    private btnSoundBK !: BtnSoundBackground;
    private btnExit !: BtnExit;
    constructor()
    {
        super();
        this.setElement();
        this.setUpBegin();
    }

    private setElement()
    {
        this.addComponent('element',{
            type : pc.ELEMENTTYPE_GROUP,
            anchor : [0.5,0.5,0.5,0.5],
            pivot : [0.5,0.5],
            width : 300,
            height : 300,
        })
    }

    private setUpBegin()
    {

        this.setBackground();

        this.btnSFX = new BtnSFX();
        this.addChild(this.btnSFX);
        this.btnSFX.setLocalPosition(-50,0,0);

        this.btnSoundBK = new BtnSoundBackground();
        this.addChild(this.btnSoundBK);
        this.btnSoundBK.setLocalPosition(50,0,0);

        this.btnExit = new BtnExit();
        this.addChild(this.btnExit);

    }

    private setBackground()
    {
        this.background = new pc.Entity();
        this.addChild(this.background);
        this.background.addComponent('element',{
            type : pc.ELEMENTTYPE_IMAGE,
            anchor : [0.5,0.5,0.5,0.5],
            pivot :[0.5,0.5],
            width : 300,
            height : 300,
            color : new pc.Color(1,1,1),
        })
    }
    
}