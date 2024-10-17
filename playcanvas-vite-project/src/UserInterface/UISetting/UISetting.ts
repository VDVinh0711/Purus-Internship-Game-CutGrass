import * as pc from 'playcanvas'
import { BtnSFX } from './BtnSfx';
import { BtnSoundBackground } from './BtnSoundBackground';
import { BtnExit } from './BtnExit';
import { AssetManager } from '../../Utils/AssetManager';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import { IUIController } from '../IUiController';
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';

export class UISetting extends pc.Entity implements IUIController
{
    private background !: pc.Entity;
    private titleSetting !: pc.Entity;
    private btnSFX !: BtnSFX;
    private btnSoundBK !: BtnSoundBackground;
    private btnExit !: BtnExit;
    constructor()
    {
        super();
        this.registerEvent();
        this.setElement();
        this.setUpBegin();
    }



    private registerEvent()
    {
        EventManager.on(SafeKeyEvent.CloseUISetting, this.Close.bind(this));
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
        this.setTitle();

        this.btnSFX = new BtnSFX();
        this.addChild(this.btnSFX);
        this.btnSFX.setLocalPosition(-50,0,0);

        this.btnSoundBK = new BtnSoundBackground();
        this.addChild(this.btnSoundBK);
        this.btnSoundBK.setLocalPosition(50,0,0);

        this.btnExit = new BtnExit();
        this.addChild(this.btnExit);

    }


    private setTitle()
    {
        this.titleSetting = new pc.Entity('Title');
        this.addChild(this.titleSetting);
        this.titleSetting.addComponent('element',{
            type : pc.ELEMENTTYPE_IMAGE,
            anchor : [0.5,1,0.5,1],
            pivot :[0.5,0.8],
            width : 250,
            height : 80,
            color : new pc.Color(1,1,1),
            textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGTitleSetting)
        })
    }

    private setBackground()
    {
        this.background = new pc.Entity('Background');
        this.addChild(this.background);
        this.background.addComponent('element',{
            type : pc.ELEMENTTYPE_IMAGE,
            anchor : [0.5,0.5,0.5,0.5],
            pivot :[0.5,0.5],
            width : 300,
            height : 300,
            color : new pc.Color(1,1,1),
            textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGBackGroundSetting)
        })
    }

    Open(): void {
        this.enabled = true;
    }
    Close(): void {
        this.enabled = false;
    }
    
}