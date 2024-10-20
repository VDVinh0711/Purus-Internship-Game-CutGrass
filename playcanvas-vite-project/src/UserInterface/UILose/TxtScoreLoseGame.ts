
import { ScoreManager } from '../../Player/ScoreManager';
import { BaseTextUI } from '../BaseTextUI';
import * as pc from 'playcanvas'

export class TxtScoreLoseGame extends BaseTextUI {
    constructor() {
        super(30, '0',new pc.Vec2(0.5,0.5),new pc.Vec4(0.5,0.5,0.5,0.5));
        this.init();
    }

    public init() {
        this.setTextScore(ScoreManager.getInstance().getSCore());
    }

    private setTextScore(score: number) {
        this.setText(`Score: ${score}`);
    }
}