import { SafeKeyEvent } from "./Helper/SafeKeyEvent";
import { LevelManager } from "./Level/LevelManager";
import { EventManager } from "./Utils/Observer";



export class GameManger {
    private static instance: GameManger;

    public isWin: boolean = false;
    public isLose: boolean = false;


    constructor() { }
    public static getInstance() {
        if (GameManger.instance == null) {
            GameManger.instance = new GameManger();
        }
        return GameManger.instance;
    }


    public onWin() {
        this.isWin = true;
        console.log("win");
        if(LevelManager.getInstance().canNextoLevel())
        {
            this.nextLevel();
            return;
        }
        this.nextMapInLevel();
        
        //call event when win game
    }
    public onLose() {
        this.isLose = true;
        console.log("lose");
        //call event when lose game
    }
    public onStartGame() {
        //implement logic when start game
        this.reset();
        EventManager.emit(SafeKeyEvent.SetWaitingBlade);
        EventManager.emit(SafeKeyEvent.SpawmGroundFromCurMap);
        EventManager.emit(SafeKeyEvent.SetPosBladeFromCurMap);
        EventManager.emit(SafeKeyEvent.SpawmGrassFromCurMap);
        //  EventManager.emit(SafeKeyEvent.UnSetWatingBlade);

        setTimeout(() => {
            EventManager.emit(SafeKeyEvent.UnSetWatingBlade);
        }, 1000);
    }

    public nextMapInLevel() {
        LevelManager.getInstance().nextMap();
        this.onStartGame();
    }
    public nextLevel() {
        // implement logic when get next level
        LevelManager.getInstance().nextLevel();
        this.onStartGame();
        
    }

    public reset() {
        this.isLose = false;
        this.isWin = false;
        EventManager.emit(SafeKeyEvent.ResetBladeManager);
        EventManager.emit(SafeKeyEvent.ClearGround);
        EventManager.emit(SafeKeyEvent.ClearGrasses);
    }

}

