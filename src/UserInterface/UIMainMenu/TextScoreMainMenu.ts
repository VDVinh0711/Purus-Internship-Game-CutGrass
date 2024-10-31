
import { ScoreManager } from '../../Player/ScoreManager';
import { BaseTextUI } from '../BaseTextUI';
import * as pc from 'playcanvas'
export class TextScoreMainMenu extends BaseTextUI {
    constructor() {
        super(42, '10000000');
        this.setTextColor();
        this.init();
    }

    public init() {
        this.setTextScore(ScoreManager.getInstance().getSCore());
    }

    private setTextColor()
    {
        if(this.element != null)
        {
            this.element.color = new pc.Color(255/255,167/255,38/255)
        }
    }

    private setTextScore(score: number) {
        this.setText(`Score: ${score}`);
    }
}