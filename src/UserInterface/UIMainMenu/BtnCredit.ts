import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';
import { EventManager } from '../../Utils/Observer';
import { BaseButtonUI } from '../BaseButtonUI';

export class BtnCredit extends BaseButtonUI {
    constructor() {
        super({
            width: 100,
            height: 100,
            textureAsset:SafeKeyAsset.IMGIconCredit,
        });
        this.updateButtonSize();
        this.setButtonOnclick();
    }

    private setButtonOnclick() {
        if (this.button == null) return;
        this.button.on('click', function () {
           EventManager.emit(SafeKeyEvent.OpenUICredit);
        });
    }


    protected updateButtonSize() {
       

        const minScale = 0.6;
        const maxScale = 1;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const scaleX = screenWidth / 1920;
        const scaleY = screenHeight / 1080;
       
        const scale = Math.min(scaleX, scaleY);
        
        const finalScale = Math.max(minScale, Math.min(maxScale, scale));

        this.width *= finalScale;
        this.height *= finalScale;


        if(this.element == null) return;
        this.element.width = this.width;
        this.element.height = this.height;

    }
}