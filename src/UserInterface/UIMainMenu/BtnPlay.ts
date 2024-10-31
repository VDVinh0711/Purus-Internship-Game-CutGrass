
import { GameManger } from '../../GameManager';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';
import { EventManager } from '../../Utils/Observer';
import { BaseButtonUI } from '../BaseButtonUI';
import * as TWEEN from '@tweenjs/tween.js'
export class BtnPlay extends BaseButtonUI {

    private scaleTween !: TWEEN.Tween;
    constructor() {
        super({
            width: 150,
            height: 150,
            textureAsset: SafeKeyAsset.IMGButtonPlay,
        });
        this.setButtonOnclick();
        this.setUpTween();
    }
    private setButtonOnclick() {
        if (this.button == null) return;
        this.button.on('click', () => {
            EventManager.emit(SafeKeyEvent.PlaySoundSFXBTN);
            GameManger.getInstance().playGame();
        });
    }


    private setUpTween() {
        const scaleState = { scale: 1 };
        this.scaleTween = new TWEEN.Tween(scaleState)
            .to({ scale: 1.1 }, 500)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(() => {
                this.setLocalScale(scaleState.scale, scaleState.scale, 1);
            })
            .yoyo(false)
            .repeatDelay(0.1)
            .repeat(Infinity)
            .start();
    }

    public update() {
        this.scaleTween.update();
    }
}