
import { ScoreManager } from '../../Player/ScoreManager';
import { BaseTextUI } from '../BaseTextUI';


export class TextScoreMainMenu extends BaseTextUI {
    constructor() {
        super(42, '100');
        this.init();
    }

    public init() {
        this.setTextScore(ScoreManager.getInstance().getSCore());
    }

    private setTextScore(score: number) {
        this.setText(`Score: ${score}`);
    }
}