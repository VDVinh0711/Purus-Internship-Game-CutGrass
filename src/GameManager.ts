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
        EventManager.emit(SafeKeyEvent.SetCameraOutGame);
        if (LevelManager.getInstance().canNextoLevel()) {
            EventManager.emit(SafeKeyEvent.PlaySoundSFXWinLevel);
            EventManager.emit(SafeKeyEvent.OpenUIWinLevel);
            return;
        }
        EventManager.emit(SafeKeyEvent.PlaySoundSFXWinMap);
        EventManager.emit(SafeKeyEvent.OpenUIWinMap);

    }
    public onLose() {
        this.isLose = true;
        ScoreManager.getInstance().setScore(this.scoreBegin);
        EventManager.emit(SafeKeyEvent.PLaySoundSFXLoseGame);
        setTimeout(() => {
            EventManager.emit(SafeKeyEvent.OpenUILoseGame);
        }, 1000);
    }

    public setUpBegin() {
        this.reset();
        EventManager.emit(SafeKeyEvent.SetPauseBlade);
        EventManager.emit(SafeKeyEvent.SpawmGroundFromCurMap);
        EventManager.emit(SafeKeyEvent.SetPosBladeFromCurMap);
        EventManager.emit(SafeKeyEvent.SpawmGrassFromCurMap);
        EventManager.emit(SafeKeyEvent.SpawmItemHelper);
    }


    public playGame() {
        EventManager.emit(SafeKeyEvent.UnSetPauseBlade);
        EventManager.emit(SafeKeyEvent.OpenUIInGame);
        EventManager.emit(SafeKeyEvent.SetCameraInGame);
    }


    public gameSetUp() {
        this.reset();
        this.scoreBegin = ScoreManager.getInstance().getSCore();
        EventManager.emit(SafeKeyEvent.SetPauseBlade);
        EventManager.emit(SafeKeyEvent.SpawmGroundFromCurMap);
        EventManager.emit(SafeKeyEvent.SetPosBladeFromCurMap);
        EventManager.emit(SafeKeyEvent.SpawmGrassFromCurMap);
        EventManager.emit(SafeKeyEvent.SpawmItemHelper); 
    }

    public nextMapInLevel() {
        LevelManager.getInstance().nextMap();
        this.gameSetUp();
        this.playGame();
    }
    public nextLevel() {
        LevelManager.getInstance().nextLevel();
        this.gameSetUp();
        this.playGame();
    }   

    public reload() {
        ScoreManager.getInstance().setScore(this.scoreBegin);
        this.gameSetUp();
        this.playGame();
    }

    public exitGame()
    {
        this.reset();
        this.gameSetUp();
        ScoreManager.getInstance().setScore(this.scoreBegin);
        EventManager.emit(SafeKeyEvent.SetCameraOutGame);
        EventManager.emit(SafeKeyEvent.OpenUIMainMenu);
       
    }

    private reset() {
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

