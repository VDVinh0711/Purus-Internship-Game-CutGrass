
import { GameManger } from '../../GameManager';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import { BaseButtonUI } from '../BaseButtonUI';
import * as pc from 'playcanvas'

export class BtnPlay extends BaseButtonUI {
    constructor() {
        super({
            width: 150,
            height: 150,
            textureAsset: SafeKeyAsset.IMGButtonPlay,
        });
        this.setUpBegin();
        this.setButtonOnclick();
    }


    private setUpBegin()
    {
        this.addComponent('script');
        if(this.script== null) return;
        this.script.create('tween', {
            attributes: {
                tweens: [
                    {
                        autoPlay: true, // Start this tween immediately
                        delay: 0, // No delay on start
                        duration: 1500, // 2 seconds
                        easingFunction: 1,
                        easingType: 2, // InOut type
                        end: new pc.Vec4(4, -1, 0, 0),
                        path: 'localPosition', // Update the entity's local position
                        repeat: -1, // Repeat infinitely
                        repeatDelay: 0, // No delay between repeats
                        start: new pc.Vec4(0, -1, 0, 0),
                        yoyo: true // Ping pong between start and end values
                    }
                ]
            }
        });
    }

    private setButtonOnclick() {
        if (this.button == null) return;
        this.button.on('click', () => {
            GameManger.getInstance().playGame();
        });
    }
}