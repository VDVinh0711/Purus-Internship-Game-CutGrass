import * as pc from 'playcanvas'

export class UIItemInShop extends pc.Entity
{
    //image item
    //price

    private imageItem !: pc.Entity;

    private readonly width : number = 200;
    private  readonly height : number = 300;
    constructor()
    {
        super();
        this.setElement();
        this.setUpImageItem();
    }

    private setElement()
    {
        this.addComponent('element',{
            type : pc.ELEMENTTYPE_GROUP,
            anchor : [0.5,0.5,0.5,0.5],
            pivot : [0.5,0.5],
            width : this.width,
            height : this.height
        })
    }


    private setUpImageItem()
    {
        this.imageItem = new pc.Entity("imageItem");
        this.addChild(this.imageItem);
        this.imageItem.addComponent('element',{
            type : pc.ELEMENTTYPE_IMAGE,
            anchor : [0.5,0.5,0.5,0.5],
            pivot : [0.5,0.5],
            width : this.width,
            height : this.height,
            color : new pc.Color(1,1,1),
        })
    }
}