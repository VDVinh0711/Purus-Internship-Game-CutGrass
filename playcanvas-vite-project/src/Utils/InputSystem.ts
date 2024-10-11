import * as pc from 'playcanvas';
import { EventManager } from './Observer';
import { SafeKeyEvent } from '../Helper/SafeKeyEvent';
import { test } from './test';
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
        mouse.on('mousedown', this.OnMouseDown.bind(this));
    }

    OnMouseDown()
    {
        EventManager.emit(SafeKeyEvent.ClickIntoScreen);

        test.getInstance().logSomething();
    }
}