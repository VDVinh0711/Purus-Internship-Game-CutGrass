import * as pc from 'playcanvas'
import { GameManger } from '../../GameManager';

export class BtnPlay extends pc.Entity
{
    private txtPlay!: pc.Entity;
    private font!: pc.Asset;

    constructor()
    {
        super();
        this.init();
        this.setElement();
        this.setText();
        this.setButtonOnclick();
    }

    private init()
    {
        this.font = new pc.Asset('font', 'font', {url: '../../Asset/Fonts/arial.json'});
        pc.Application.getApplication()?.assets.add(this.font);
        pc.Application.getApplication()?.assets.load(this.font);
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
        this.font.ready(() => {
            this.txtPlay = new pc.Entity();
            this.txtPlay.addComponent('element', {
                anchor: [0.5, 0.5, 0.5, 0.5],
                pivot: [0.5, 0.5],
                width: 180,
                height: 40,
                color: new pc.Color(1, 1, 1),
                fontAsset: this.font,
                fontSize: 24,
                text: 'Play Game',
                type: pc.ELEMENTTYPE_TEXT,
                wrapLines: true
            });
            this.addChild(this.txtPlay);
        });
    }

    private setButtonOnclick()
    {
        if (this.button == null) return;
        this.button.on('click', function () {
            console.log("Button clicked");
            GameManger.getInstance().onStartGame();
        });
    }
}