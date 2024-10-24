import * as pc from 'playcanvas'
import { EventManager } from '../Utils/Observer';
import { SafeKeyEvent } from '../Helper/SafeKeyEvent';

export class OverLayUIInput extends pc.Entity
{
    private app : pc.Application;
    constructor(app : pc.Application)
    {
        super();
        this.app = app;
        this.setUpElement();
    }


    private setUpElement()
    {
        this.addComponent('element',{
            type: pc.ELEMENTTYPE_IMAGE,
            anchor : [0.5,0.5,0.5,0.5],
            pivot : [0.5,0.5],
            width : this.app.graphicsDevice.width,
            height : this.app.graphicsDevice.height,
            color : new pc.Color(1,1,1),
            opacity : 0,
            useInput : true
        })

        if(this.element == null) return;
        this.element?.on('click', () => {
           // EventManager.emit(SafeKeyEvent.ClickIntoScreen);   
        });
    }

    



}