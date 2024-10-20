import * as pc from 'playcanvas'
import { AssetManager } from '../../Utils/AssetManager';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import { ScoreManager } from '../../Player/ScoreManager';
export class UITextScore extends pc.Entity
{
    private iconScore !: pc.Entity;
    private txt_Score !: pc.Entity;

    //config
    private textSize : number = 50;
    private width : number = 100;
    private height : number = 50;
    private mariginleftText : number = 10;

    constructor()
    {
        super();
        this.setElement();
        this.setIconScore();
        this.setUpTextScore();

    }

    public init()
    {
        //this.setTextScore(ScoreManager.getInstance().getSCore());
    }
    private setElement()
    {
        this.addComponent('element', {
            anchor: [0.5, 0.5 , 0.5, 0.5],  
            pivot: [0.5, 0.5],       
            width:this.width,
            height: this.height,          
            type: pc.ELEMENTTYPE_GROUP
        });
    }

    private setIconScore()
    {
        this.iconScore = new pc.Entity('iconScore');
        this.addChild(this.iconScore);
        this.iconScore.addComponent('element',{
            type : pc.ELEMENTTYPE_IMAGE,
            anchor : [0, 0.5, 0, 0.5],
            pivot : [0 ,0.5],
            width : this.height,
            height : this.height,
            color : new pc.Color(1,1,1),
            textureAsset : AssetManager.getInstance().getAsset(SafeKeyAsset.ICONScore) 
        })
        this.iconScore.setLocalPosition(0,0,0);
    }

    private setUpTextScore()
    {
        this.txt_Score =  new pc.Entity('textScore');
        this.addChild(this.txt_Score);
        this.txt_Score.addComponent('element', {
            type: pc.ELEMENTTYPE_TEXT,
            anchor: [1, 0.3, 1, 0.5],
            pivot: [1 , 0.5],
            width : this.width - this.height - this.mariginleftText,
            autoWidth: false,
            autoHeight: false,
            autoFitWidth: true,
            autoFitHeight: true,
            minFontSize: this.textSize-5,
            maxFontSize: this.textSize,
            alignment : new pc.Vec2(0,0),
            fontAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.FontCreanBeige),
            fontSize: this.textSize,
            text: '10000',
        });
        this.txt_Score.setLocalPosition(0,0,0);
    }

   public setTextScore(score : number)
   {
        if(this.txt_Score.element == null) return;
        this.txt_Score.element.text = score+"";
   }
}



