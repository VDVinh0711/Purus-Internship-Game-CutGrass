import * as pc from 'playcanvas'
import { IUIController } from '../IUiController';
import { UIItemInShop } from './UIItemInShop/ItemInShop';

export class UIShop extends pc.Entity implements IUIController
{
    private app : pc.Application;
    constructor(app : pc.Application)
    {
        super();
        this.app = app;
        this.setUpElement();
        this.setUpBegin();
    }


    private setUpElement()
    {
        this.addComponent('element',{
            type : pc.ELEMENTTYPE_GROUP,
            anchor : [0.5,0.5,0.5,0.5],
            pivot : [0.5,0.5],
            width : this.app.graphicsDevice.width/2,
            height : this.app.graphicsDevice.height/2,
        });

        this.addComponent('layoutgroup',{
            orientation : pc.ORIENTATION_HORIZONTAL,
            spacing : new pc.Vec2(10,10),
            widthFitting : pc.FITTING_BOTH,
            heightFitting : pc.FITTING_BOTH,
            wrap : true,
        });
    }

    private setUpBegin()
    {
        for(let i = 0 ; i <3 ; i++)
        {
            const newitem = new UIItemInShop();
            this.addChild(newitem);
        }
    }



    Open(): void {
        this.enabled = true;
    }
    Close(): void {
        this.enabled = false;
    }
}