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

    public AddScore(score : number)
    {
        this.score += score;
    }

}