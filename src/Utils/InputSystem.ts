import * as pc from 'playcanvas';
import { EventManager } from './Observer';
import { SafeKeyEvent } from '../Helper/SafeKeyEvent';
export class InputSystem
{
    constructor()
    {
        
    }

    public init()
    {
        const mouse = new pc.Mouse(document.body);
        mouse.on('mousedown', (event) =>
        {
           
            if(event.y <=50 && event.x < window.innerWidth -100) return;
            console.log('onclick');
            this.OnClick();
        });

        const touch = new pc.TouchDevice(document.body);
        touch.on('touchstart',(event) =>
        {
            console.log(event);
            if(event.y <=50 && event.x < window.innerWidth -50) return;
            this.OnClick();
        } );
    }
    OnClick()
    {
        EventManager.emit(SafeKeyEvent.ClickIntoScreen);  
      
    }
}