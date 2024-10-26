import * as pc from 'playcanvas';
import { IUIController } from '../IUiController';
import { UiItemInShop } from './UIItemInShop/UIShowItemInShop';

export class UIShop extends pc.Entity implements IUIController
{
    private background !: pc.Entity;
    private groupItems !: pc.Entity;
    constructor()
    {
        super();
        this.setUpBegin();
    }



    private testSpawm()
    {
        for (let i = 0; i < 6; i++) {
            const newItem = new UiItemInShop();
            this.groupItems.addChild(newItem);
        }
    }

    private setUpBegin()
    {
        this.setUpElement();
        this.setUpBackground();
        this.setUpGropItems();
        this.testSpawm();
    }

    private setUpElement()
    {
        this.addComponent('element',{
            type : pc.ELEMENTTYPE_GROUP,
            anchor : [0.5,0.5,0.5,0.5],
            pivot : [0.5,0.5],
            width : 500,
            height : 500
        });
    }

    private setUpBackground()
    {
        this.background = new pc.Entity('background');
        this.addChild(this.background);
        this.background.addComponent('element',{
            type : pc.ELEMENTTYPE_IMAGE,
            anchor: [0,0,1,1],
            pivot : [0.5,0.5],
            color : new pc.Color(1,1,1)
        });
    }


    private setUpGropItems()
    {
        this.groupItems = new pc.Entity('gropItem');
        this.addChild(this.groupItems);
        this.groupItems.addComponent('element',{
            type : pc.ELEMENTTYPE_GROUP,
            anchor : [0,0,1,1],
            pivot : [0.5,0.5],  
        });


        this.groupItems.addComponent('layoutgroup',{
            orientation : pc.ORIENTATION_HORIZONTAL,
            reverseY : true,
            alignment : new pc.Vec2(0,1),
            padding : new pc.Vec4(35,10,10,30),
            spacing : new pc.Vec2(20,20),
            widthFitting : pc.FITTING_NONE,
            heightFitting : pc.FITTING_NONE,
            wrap : true
        })
    }
    

    Open(): void {
        this.enabled = true;
        console.log("Open UI Shop");
    }
    Close(): void {
        this.enabled = false;
    }


}