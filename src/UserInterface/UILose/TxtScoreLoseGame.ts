
import { ScoreManager } from '../../Player/ScoreManager';
import { BaseTextUI } from '../BaseTextUI';
import * as pc from 'playcanvas'

export class TxtScoreLoseGame extends BaseTextUI {
    constructor() {
        super(40, '0',new pc.Vec2(0.5,0.5),new pc.Vec4(0.5,0.5,0.5,0.5));
        this.updateResize();
        this.init();
    }

    public init() {
        this.setTextScore(ScoreManager.getInstance().getSCore());
    }

    private setTextScore(score: number) {
        this.setText(`Score: ${score}`);
    }


    private updateResize() {
        const minScale = 0.7;
        const maxScale = 1;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const scaleX = screenWidth / 1920;
        const scaleY = screenHeight / 1080;
       
        const scale = Math.min(scaleX, scaleY);
        
        const finalScale = Math.max(minScale, Math.min(maxScale, scale));

      
        this.fontSize *= finalScale;

        if(this.element == null) return;
       
        this.element.fontSize =this.fontSize;

    }
}