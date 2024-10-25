import * as pc from 'playcanvas'
import { AssetManager } from '../../Utils/AssetManager';
import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';

import * as TWEEN from '@tweenjs/tween.js'
import { ScoreManager } from '../../Player/ScoreManager';
export class ScoreUI extends pc.Entity {

    private tweenMove !: TWEEN.Tween;
    private originColor : pc.Color =  new pc.Color(1,1,1);
    private powerUpColor : pc.Color = new pc.Color(230/255,103/255,13/255)
    constructor() {
        super();
        this.setUpBegin();
       
    }
    private setUpBegin() {
        this.addComponent('element',
            {
                type: pc.ELEMENTTYPE_TEXT,
                anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
                pivot: new pc.Vec2(0.5, 0.5),
                fontAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.FontCreanBeige),
                fontSize: 30,
                text: '+30',
                outlineColor: new pc.Color(0,0,0) ,
                outlineThickness : 1,
                useInput: false,
                width: 100,
                height: 30,
            }
        )
    }


    private setTextScore(score: number) {
        if (this.element == null) return;
        this.element.color =  score == 2 ? this.powerUpColor : this.originColor;
        this.element.text = `+ ${score}`;

    }


    public init(score : number)
    {
        this.setTextScore(score);
        this.setUpTween();
        this.tweenMove.start();
    }

    private setUpTween()
    {
        const optionTweenStart = {x : this.getLocalPosition().x , y: this.getLocalPosition().y, z: this.getLocalPosition().z , scale : 0.5};
        const optionTweenEnd = {x : this.getLocalPosition().x  , y: this.getLocalPosition().y + 350, z: this.getLocalPosition().z , scale : 1.5};

        this.tweenMove = new TWEEN.Tween(optionTweenStart)
        .to(optionTweenEnd,1000)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(()=>
        {
            this.setLocalPosition(optionTweenStart.x, optionTweenStart.y, optionTweenStart.z);
            this.setLocalScale(optionTweenStart.scale,optionTweenStart.scale,1);
        })
        .onComplete(() =>
        {
            this.fire('scoreUI:tweenDone', this);
        })
        .yoyo(false)
    }

    public update()
    {
        
        if(this.tweenMove.isPlaying())
        {
            this.tweenMove.update();
        }
    }
}