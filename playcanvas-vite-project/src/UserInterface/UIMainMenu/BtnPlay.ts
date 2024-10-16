import * as pc from 'playcanvas'
import { GameManger } from '../../GameManager';
import { AssetManager } from '../../Utils/AssetManager';
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';

export class BtnPlay extends pc.Entity {
    private txtPlay!: pc.Entity;


    constructor() {
        super();

        this.setButton();
        this.setElement();
       
       
    }



    private setElement() {
       
        this.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: 150,
            height: 150,
            type: pc.ELEMENTTYPE_IMAGE,
            useInput: true,
            color: new pc.Color(1, 1, 1),
            textureAsset : AssetManager.getInstance().getAsset('srpiteButtonPlay'),
        });
    }


    private setButton()
    {
        this.addComponent('button');
        this.setButtonOnclick();
    }

    private setButtonOnclick() {
        if (this.button == null) return;

        this.button.on('click', function () {
            EventManager.emit(SafeKeyEvent.OpenUIInGame);
            GameManger.getInstance().onStartGame();
        });
    }
}