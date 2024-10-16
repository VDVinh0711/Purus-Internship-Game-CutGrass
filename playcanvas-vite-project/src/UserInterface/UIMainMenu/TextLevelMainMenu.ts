import { LevelManager } from '../../Level/LevelManager';
import { BaseTextUI } from '../BaseTextUI';


export class TextLevelMainMenu extends BaseTextUI {
    constructor() {
        super();
        this.init();
    }

    public init() {
        this.setTextLevel(LevelManager.getInstance().getCurrentLevel());
    }

    private setTextLevel(level: number) {
        this.setText(`Level: ${level + 1}`);
    }
}