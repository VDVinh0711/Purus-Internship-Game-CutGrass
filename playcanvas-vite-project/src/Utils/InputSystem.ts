import * as pc from 'playcanvas';
import { EventManager } from './Observer';
import { SafeKeyEvent } from '../Helper/SafeKeyEvent';
export class InputSystem
{
    constructor()
    {
        this.setUpBegin();
    }

    private setUpBegin()
    {
        //setup for mouse
        const mouse = new pc.Mouse(document.body);
        mouse.on('mousedown', this.OnClick.bind(this));

        const touch = new pc.TouchDevice(document.body);
        touch.on('touchstart', this.OnClick.bind(this));
       
    }
     

    OnClick()
    {
        console.log("mouse click");
        EventManager.emit(SafeKeyEvent.ClickIntoScreen);   
    }
}