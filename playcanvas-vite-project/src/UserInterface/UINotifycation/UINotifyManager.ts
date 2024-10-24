import * as  pc from 'playcanvas'
import { DimondRewardPopUp } from './DimondPopUp/DiamondRewardPopup';
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';

export class UINotifyManager extends pc.Entity
{

    private app : pc.Application;
   
    private dimondReward !: DimondRewardPopUp;
    constructor(app : pc.Application)
    {
        super();
        this.app = app;
        this.setElement();
        this.setUpBegin();
        this.registerEvent();
    }


    private registerEvent()
    {
        EventManager.on(SafeKeyEvent.OpenUiDimondReward, this.OpenUINotifyDimondReward.bind(this));   
    }

    private setElement()
    {
        this.addComponent('element',{
            type : pc.ELEMENTTYPE_GROUP,
            anchor : [0.5,0.5,0.5,0.5],
            pivot : [0.5,0.5],
            width : this.app.graphicsDevice.width,
            height : this.app.graphicsDevice.height,
        });
    }


    private setUpBegin()
    {
        

        this.dimondReward = new DimondRewardPopUp(this.app);
        this.addChild(this.dimondReward);
        this.dimondReward.setLocalPosition(0,0,0);
        this.dimondReward.enabled = false;
    }


    private OpenUINotifyDimondReward(dimondCount : number)
    {
        this.dimondReward.OpenUI(dimondCount);
    }

    


}