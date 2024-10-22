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
        // //setup for mouse
        // const mouse = new pc.Mouse(document.body);
        // mouse.on('mousedown', this.OnClick.bind(this));

       
        // const touch = new pc.TouchDevice(document.body);
        // touch.on('touchstart', this.OnClick.bind(this));
        const mouse = new pc.Mouse(document.body);
        mouse.on('mousedown', (event) => {
            // Kiểm tra xem click có phải vào UI element không
            if (event.target && event.target instanceof HTMLElement) {
                const elementComp = event.element;
                if (elementComp && elementComp.useInput) {
                    return; // Không xử lý click nếu là UI element
                }
            }
            this.OnClick();
        });

        const touch = new pc.TouchDevice(document.body);
        touch.on('touchstart', (event) => {
            // Tương tự cho touch
            if (event.target && event.target instanceof HTMLElement) {
                const elementComp = event.element;
                if (elementComp && elementComp.useInput) {
                    return;
                }
            }
            this.OnClick();
        });
    }
     

    OnClick()
    {
        EventManager.emit(SafeKeyEvent.ClickIntoScreen);   
    }
}