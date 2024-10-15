import * as pc from 'playcanvas'
import { GameManger } from '../../GameManager';
import { AssetManager } from '../../Utils/AssetManager';
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';

export class BtnPlay extends pc.Entity
{
    private txtPlay!: pc.Entity;
    

    constructor()
    {
        super();
       
        this.setElement();
        this.setText();
        this.setButtonOnclick();
    }

  

    private setElement()
    {
        this.addComponent('button');
        this.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: 200,
            height: 50,
            type: pc.ELEMENTTYPE_IMAGE,
            useInput: true,
            color: new pc.Color(0.5, 0.5, 0.5)
        });
    }

    private setText()
    {
      
            this.txtPlay = new pc.Entity();
            this.txtPlay.addComponent('element', {
                anchor: [0.5, 0.5, 0.5, 0.5],
                pivot: [0.5, 0.5],
                width: 180,
                height: 40,
                color: new pc.Color(1, 1, 1),
                fontAsset:  AssetManager.getInstance().getAsset('fontArial'),
                fontSize: 24,
                text: 'Play Game',
                type: pc.ELEMENTTYPE_TEXT,
                wrapLines: true
            });
            this.addChild(this.txtPlay);
        
    }

    private setButtonOnclick()
    {
        if (this.button == null) return;
        this.button.on('click', function () {
            EventManager.emit(SafeKeyEvent.OpenUIInGame);
            GameManger.getInstance().onStartGame();
        });
    }
}