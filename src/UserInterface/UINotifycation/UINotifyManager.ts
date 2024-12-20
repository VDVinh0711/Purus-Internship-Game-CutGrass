import * as  pc from 'playcanvas'
import { DimondRewardPopUp } from './DimondPopUp/DiamondRewardPopup';
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';
import { NotifyText } from './NotifyText/NotifyText';
import { NotifySelected } from './NotifySelected/NotifySelected';

export class UINotifyManager extends pc.Entity
{

    private app : pc.Application;
   
    private dimondReward !: DimondRewardPopUp;
    private notifyText !: NotifyText;
    private notifySelected !: NotifySelected;
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
        EventManager.on(SafeKeyEvent.OpenUITextNotifyCation, this.OpenUINotifyText.bind(this));
        EventManager.on(SafeKeyEvent.OpenUINotifiSelect, this.OpenUINotifySelected.bind(this));
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


        this.notifyText =  new NotifyText(this.app);
        this.addChild(this.notifyText);
        this.notifyText.setLocalPosition(0,0,0);
        this.notifyText.enabled = false;


        this.notifySelected =  new NotifySelected(this.app);
        this.addChild(this.notifySelected);
        this.notifySelected.setLocalPosition(0,0,0);
        this.notifySelected.enabled = false;
    }


    private OpenUINotifyDimondReward(dimondCount : number)
    {
        this.dimondReward.OpenUI(dimondCount);
    }

    private OpenUINotifyText (text : string)
    {
        this.notifyText.OpenUI(text);
    }


    private OpenUINotifySelected(txtTitle : string ,  callback: () => void)
    {
        this.notifySelected.OpenUI(txtTitle,callback);
    }

    public update()
    {
        this.dimondReward.update();
        this.notifyText.update();
        this.notifySelected.update();
    }

    


}