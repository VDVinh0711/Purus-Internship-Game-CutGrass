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
      
        if(LevelManager.getInstance().canNextoLevel())
        {
           // this.nextLevel();
           EventManager.emit(SafeKeyEvent.OpenUIWinLevel);
            return;
        }
      
            EventManager.emit(SafeKeyEvent.OpenUIWinMap);
        //this.nextMapInLevel();
        
        //call event when win game
    }
    public onLose() {
        this.isLose = true;
      
        //call event when lose game
    }

    public setUpBegin()
    {
        this.reset();
        EventManager.emit(SafeKeyEvent.SetWaitingBlade);
        EventManager.emit(SafeKeyEvent.SpawmGroundFromCurMap);
        EventManager.emit(SafeKeyEvent.SetPosBladeFromCurMap);
        EventManager.emit(SafeKeyEvent.SpawmGrassFromCurMap);
        EventManager.emit(SafeKeyEvent.SpawmItemHelper);
    }

    
    public onStartGame() {
            EventManager.emit(SafeKeyEvent.UnSetWatingBlade);
    }


    public gameSetUp()
    {
        this.reset();
        EventManager.emit(SafeKeyEvent.SetWaitingBlade);
        EventManager.emit(SafeKeyEvent.SpawmGroundFromCurMap);
        EventManager.emit(SafeKeyEvent.SetPosBladeFromCurMap);
        EventManager.emit(SafeKeyEvent.SpawmGrassFromCurMap);
        EventManager.emit(SafeKeyEvent.SpawmItemHelper);
        setTimeout(() => {
            EventManager.emit(SafeKeyEvent.UnSetWatingBlade);
        }, 1000);
    }

    public nextMapInLevel() {
        LevelManager.getInstance().nextMap();
        this.gameSetUp();
    }
    public nextLevel() {
        // implement logic when get next level
        LevelManager.getInstance().nextLevel();
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

