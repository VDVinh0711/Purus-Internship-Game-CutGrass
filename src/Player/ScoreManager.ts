import { SafeKeyEvent } from "../Helper/SafeKeyEvent";
import { EventManager } from "../Utils/Observer";

export class ScoreManager
{
    private score :number = 0;
    private static instance: ScoreManager;
    private constructor() {
       
    }

    public static getInstance(): ScoreManager {
        if (!ScoreManager.instance) {
            ScoreManager.instance = new ScoreManager();
        }
        return ScoreManager.instance;
    }

    public addScore(score : number)
    {
        this.score += score;
        EventManager.emit(SafeKeyEvent.OnChangeScore, this.score);
    }
    public getSCore()
    {
        return this.score;
    }
    public setScore(score :number)
    {
        this.score = score;
    }

}