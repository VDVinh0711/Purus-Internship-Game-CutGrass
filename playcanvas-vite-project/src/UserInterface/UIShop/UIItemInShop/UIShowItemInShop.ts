import * as pc from 'playcanvas'
import { UIPriceItem } from './UIpriceItem';
import { ImodelChaiSaw } from '../../../Interface/Imodeltexure';
import { SafeKeyAsset } from '../../../Helper/SafeKeyAsset';
import { EventManager } from '../../../Utils/Observer';
import { SafeKeyEvent } from '../../../Helper/SafeKeyEvent';

export class UiItemInShop extends pc.Entity
{
    private iconLock !: pc.Entity;
    private iconItem !: pc.Entity;
    private uiPrice !: UIPriceItem;

    constructor()
    {
        super();
        this.setUpBegin();
    }

    private setUpBegin()
    {
        this.setUpElement();
        this.setUpIconImage();
        this.setUpIconLock();
        this.uiPrice = new UIPriceItem(100);
        this.addChild(this.uiPrice);
    }


    private setUpElement()
    {
        this.addComponent('element',
            {
                type : pc.ELEMENTTYPE_GROUP,
                anchor : [0.5,0.5,0.5,0.5],
                pivot : [0.5,0.5],
                width : 100,
                height : 100,
                useInput : true,
            }
        )

        if(this.element == null) return;
        this.element?.on('click', () => {
            console.log("click Item shop");
            const myChaiSaw: ImodelChaiSaw = {
                model: SafeKeyAsset.ModelBlade2,
                texure: SafeKeyAsset.TexureBlade,
                colorRope: new pc.Color(1, 0, 0) 
            };


            EventManager.emit(SafeKeyEvent.OnChangeModelBlade, myChaiSaw);
            EventManager.emit(SafeKeyEvent.OpenUIMainMenu);
        });
    }

    private setUpIconLock()
    {
        this.iconLock = new pc.Entity('iconLock');
        this.addChild(this.iconLock);
        this.iconLock.addComponent('element',
            {
                type : pc.ELEMENTTYPE_IMAGE,
                anchor : [0.68,0.68,0.68,0.68],
                pivot : [0.5,0],
                color : new pc.Color(0.5,0.5,0.5),
            }
        )
    }
    
    private setUpIconImage()
    {
        this.iconItem = new pc.Entity('iconItem');
        this.addChild(this.iconItem);
        this.iconItem.addComponent('element',
            {
                type : pc.ELEMENTTYPE_IMAGE,
                anchor : [0.5,0.5,0.5,0.5],
                pivot : [0.5,0.5],
                width: 100,
                height : 100,
                color  : new pc.Color(198/255,55/255,55/255)
            }
        )
    }
}