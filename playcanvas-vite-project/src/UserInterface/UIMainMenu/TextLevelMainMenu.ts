import * as pc from 'playcanvas'

export class TextLevelMainMenu extends pc.Entity
{

    private font !: pc.Asset;
    constructor()
    {
        super();
        this.init();
        this.setElement();
    }

    private init()
    {
        this.font = new pc.Asset('font', 'font', {url: '../../Asset/Fonts/arial.json'});
        pc.Application.getApplication()?.assets.add(this.font);
        pc.Application.getApplication()?.assets.load(this.font);
    }
    private setElement()
    {
        this.font.ready(() =>
        {
            this.addComponent('element', {
                pivot: new pc.Vec2(0.5, 0.5),
                anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
                fontAsset: this.font.id,
                fontSize: 42,
                text: '8',
                type: pc.ELEMENTTYPE_TEXT
            });

            this.setLocalPosition(100, 100, 0); 
        });

        
    }
}