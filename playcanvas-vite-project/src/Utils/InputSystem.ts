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
        mouse.on('mousedown', (event) =>
        {
            if(event.y <=50) return;
            this.OnClick();
        });

        const touch = new pc.TouchDevice(document.body);
        touch.on('touchstart', this.OnClick.bind(this));
       
    }
     

    OnClick()
    {
        EventManager.emit(SafeKeyEvent.ClickIntoScreen);  
      
    }
}