import * as pc from "playcanvas"

export class UILoading extends pc.Entity
{
    constructor()
    {
        super();
        this.setElement();
    }

    private setElement()
    {
        this.addComponent('element', {
            anchor: [0, 0, 1, 1],
            pivot: [0.5, 0.5],
            width: 1280,
            height: 720,
            type: pc.ELEMENTTYPE_GROUP
        });
    }
}