import { SafeKeyEvent } from "./Helper/SafeKeyEvent";
import { LevelManager } from "./Level/LevelManager";
import { ScoreManager } from "./Player/ScoreManager";
import { EventManager } from "./Utils/Observer";



export class GameManger {
    private static instance: GameManger;
    public isWin: boolean = false;
    public isLose: boolean = false;
    private scoreBegin : number = 0;


    constructor() { }
    public static getInstance() {
        if (GameManger.instance == null) {
            GameManger.instance = new GameManger();
        }
        return GameManger.instance;
    }


    public onWin() {
        this.isWin = true;
        if (LevelManager.getInstance().canNextoLevel()) {
            EventManager.emit(SafeKeyEvent.OpenUIWinLevel);
            return;
        }
        EventManager.emit(SafeKeyEvent.OpenUIWinMap);

    }
    public onLose() {
        this.isLose = true;
        ScoreManager.getInstance().setScore(this.scoreBegin);
        setTimeout(() => {
            EventManager.emit(SafeKeyEvent.OpenUILoseGame);
        }, 1000);
        //call event when lose game
    }

    public setUpBegin() {
        this.reset();
        EventManager.emit(SafeKeyEvent.SetPauseBlade);
        EventManager.emit(SafeKeyEvent.SpawmGroundFromCurMap);
        EventManager.emit(SafeKeyEvent.SetPosBladeFromCurMap);
        EventManager.emit(SafeKeyEvent.SpawmGrassFromCurMap);
        EventManager.emit(SafeKeyEvent.SpawmItemHelper);
    }


    public onStartGame() {
        EventManager.emit(SafeKeyEvent.UnSetPauseBlade);
        EventManager.emit(SafeKeyEvent.OpenUIInGame);
    }


    public gameSetUp() {
        this.reset();
        this.scoreBegin = ScoreManager.getInstance().getSCore();
        EventManager.emit(SafeKeyEvent.SetPauseBlade);
        EventManager.emit(SafeKeyEvent.SpawmGroundFromCurMap);
        EventManager.emit(SafeKeyEvent.SetPosBladeFromCurMap);
        EventManager.emit(SafeKeyEvent.SpawmGrassFromCurMap);
        EventManager.emit(SafeKeyEvent.SpawmItemHelper);
        EventManager.emit(SafeKeyEvent.OpenUIInGame);
        setTimeout(() => {
            EventManager.emit(SafeKeyEvent.UnSetPauseBlade);
        }, 1000);
    }

    public nextMapInLevel() {
        LevelManager.getInstance().nextMap();
        this.gameSetUp();
    }
    public nextLevel() {
        LevelManager.getInstance().nextLevel();
        this.gameSetUp();
    }

    public reload() {
       
        this.gameSetUp();

    }

    public reset() {
        this.isLose = false;
        this.isWin = false;
        EventManager.emit(SafeKeyEvent.ResetBladeManager);
        EventManager.emit(SafeKeyEvent.ClearGround);
        EventManager.emit(SafeKeyEvent.ClearGrasses);
        EventManager.emit(SafeKeyEvent.ClearsItemsHelper);
        EventManager.emit(SafeKeyEvent.ClearParticles);
        EventManager.emit(SafeKeyEvent.CloseUIWinLevel);
        EventManager.emit(SafeKeyEvent.CloseUIWinMap);
    }

}

