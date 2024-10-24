import * as pc from 'playcanvas'
import { AssetManager } from '../../../Utils/AssetManager';
import { SafeKeyAsset } from '../../../Helper/SafeKeyAsset';
import { DisplayDimond } from './DisplayDimond';
import { EventManager } from '../../../Utils/Observer';
import { SafeKeyEvent } from '../../../Helper/SafeKeyEvent';

export class DimondRewardPopUp extends pc.Entity
{

    private app : pc.Application;
    private title !: pc.Entity;
    private overLay !: pc.Entity;
    private displayDimond !: DisplayDimond;
    private btnClose !:pc.Entity;
    private background !: pc.Entity;
    constructor(app : pc.Application)
    {
        super();
        this.app = app;
        this.setElement();  
        this.setOverlay();      
        this.setBackground();
        this.setTitle();
        this.setDisplayDimond();
        this.setBtnClose();
    }
    private setElement()
    {
        this.addComponent('element',
            {
                type : pc.ELEMENTTYPE_GROUP,
                anchor : [0.5,0.5,0.5,0.5],
                pivot : [0.5,0.5],
                width : 300,
                height : 300,
            });
    }


    private setBackground()
    {
        this.background = new pc.Entity('background');
        this.addChild(this.background);
        this.background.addComponent("element",
            {
                type : pc.ELEMENTTYPE_IMAGE,
                anchor : [0.5,0.5,0.5,0.5],
                pivot :[0.5,0.5],
                width : 300,
                height : 300,
                color : new pc.Color(128/255,228/255,124/255),
                textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGBackGroundPaper)
            });
    }

    private setDisplayDimond()
    {
        this.displayDimond = new DisplayDimond();
        this.addChild(this.displayDimond);
    }

    
    private setBtnClose()
    {
        this.btnClose = new pc.Entity('btn-Close');
        this.addChild(this.btnClose);
        this.btnClose.addComponent('button');
        this.btnClose.addComponent('element',
            {
                type : pc.ELEMENTTYPE_IMAGE,
                anchor : [0.5,0,0.5,0],
                pivot : [0.5,0],
                width : 60,
                height:60,
                useInput : true,
                color : new pc.Color(1,1,1),
                textureAsset : AssetManager.getInstance().getAsset(SafeKeyAsset.IMGButtonOK),
            }
        );


        if(this.btnClose.button == null) return;
        this.btnClose.button.on('click',() =>
        {
            this.CloseUI();
        })
    }


    private setTitle()
    {
        this.title = new pc.Entity('titleNotification');
        this.addChild(this.title);
        this.title.addComponent("element",
            {
                type :pc.ELEMENTTYPE_IMAGE,
                anchor : [0.5,1,0.5,1],
                pivot : [0.5,1],
                width : 300,
                height : 90,
                color : new pc.Color(1,1,1),
                textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGTitleNotification)
            }
        )
    }

    public OpenUI(dimondCount : number)
    {
        this.displayDimond.setDimondScore(` + ${dimondCount}`);
        this.enabled = true;
    }

    private CloseUI()
    {
        EventManager.emit(SafeKeyEvent.UnSetPauseBlade);
        this.enabled = false;
    }


    private setOverlay()
    {
        this.overLay = new pc.Entity('OverLay');
        this.addChild(this.overLay);
        this.overLay.addComponent('element',{
            type : pc.ELEMENTTYPE_IMAGE,
            anchor : [0.5,0.5,0.5,0.5],
            pivot : [0.5,0.5],
            width : this.app.graphicsDevice.width,
            height : this.app.graphicsDevice.height,
            useInput : true,
            color : new pc.Color(1,1,1),
            opacity : 0.1
        });


        if(this.overLay.element == null) return;
        this.overLay.element!.on('click', () => {
            this.CloseUI();
        });
    }


    

}