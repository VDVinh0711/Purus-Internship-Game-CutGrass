import * as pc from 'playcanvas'
import { UIPriceItem } from './UIpriceItem';
import { SafeKeyAsset } from '../../../Helper/SafeKeyAsset';
import { AssetManager } from '../../../Utils/AssetManager';
import { ItemDataShop } from '../../../Shop/ItemShopData';
import { ShopManager } from '../../../Shop/ShopManager';
import { EventManager } from '../../../Utils/Observer';
import { SafeKeyEvent } from '../../../Helper/SafeKeyEvent';

export class UiItemInShop extends pc.Entity {
    private iconLock !: pc.Entity;
    private iconItemActive !: pc.Entity;
    private iconItem !: pc.Entity;
    private uiPrice !: UIPriceItem;
    private overlayItem !: pc.Entity;
    private dataItemShop !: ItemDataShop;

    constructor(data: ItemDataShop) {
        super();
        this.dataItemShop = data;
        this.setUpBegin();
        this.upDateData();
        this.dataItemShop.registerUpdateCallback(() => {
            this.upDateData();
        });
    }

    private upDateData() {
        if (this.dataItemShop == null) return;
        this.iconLock.enabled = !this.dataItemShop.getIsBought();
        this.iconItemActive.enabled = this.dataItemShop.getActive();
        this.overlayItem.enabled = !this.dataItemShop.getIsBought();
        this.uiPrice.enabled = !this.dataItemShop.getIsBought();

        this.uiPrice.setPrice(this.dataItemShop.getPrice());
        this.setIconItem(this.dataItemShop.getIcon());
    }
    private setIconItem(asset: pc.Asset) {
        if (this.iconItem.element == null) return;
        this.iconItem.element.textureAsset = asset.id;
    }
    private setUpBegin() {
        this.setUpElement();
        this.setUpIconImage();
        this.setOverLayItem();
        this.setUpIconActive();
        this.setUpIconLock();
        this.uiPrice = new UIPriceItem(100);
        this.addChild(this.uiPrice);
    }
    private setUpElement() {
        this.addComponent('element',
            {
                type: pc.ELEMENTTYPE_GROUP,
                anchor: [0.5, 0.5, 0.5, 0.5],
                pivot: [0.5, 0.5],
                width: 100,
                height: 100,
                useInput: true,
            }
        )

        if (this.element == null) return;
        this.element?.on('click', this.handelClickItemShop.bind(this));
    }

    private setUpIconLock() {
        this.iconLock = new pc.Entity('iconLock');
        this.addChild(this.iconLock);
        this.iconLock.addComponent('element',
            {
                type: pc.ELEMENTTYPE_IMAGE,
                anchor: [0.68, 0.68, 0.68, 0.68],
                pivot: [0.5, 0],
                color: new pc.Color(0.5, 0.5, 0.5),
                textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGIconLock)
            }
        )
    }

    private setUpIconImage() {
        this.iconItem = new pc.Entity('iconItem');
        this.addChild(this.iconItem);
        this.iconItem.addComponent('element',
            {
                type: pc.ELEMENTTYPE_IMAGE,
                anchor: [0.5, 0.5, 0.5, 0.5],
                pivot: [0.5, 0.5],
                width: 100,
                height: 100,
                color: new pc.Color(1, 1, 1)
            }
        )
    }

    private setUpIconActive() {
        this.iconItemActive = new pc.Entity("IconItemActive");
        this.addChild(this.iconItemActive);
        this.iconItemActive.addComponent('element',
            {
                type: pc.ELEMENTTYPE_IMAGE,
                anchor: [0, 1, 0, 1],
                pivot: [0, 1],
                width: 30,
                height: 30,
                color: new pc.Color(1, 1, 1),
                textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGIconActive),
            }
        )
    }

    private setOverLayItem() {
        this.overlayItem = new pc.Entity('overlay');
        this.addChild(this.overlayItem);
        this.overlayItem.addComponent('element',
            {
                type: pc.ELEMENTTYPE_IMAGE,
                anchor: [0.5, 0.5, 0.5, 0.5],
                pivot: [0.5, 0.5],
                width: 100,
                height: 100,
                color: new pc.Color(0.5, 0.5, 0.5),
                opacity: 0.5,
            }
        )
    }

    private handelClickItemShop() {
        
        if (this.dataItemShop.getIsBought()) {
            ShopManager.getInstance().changeActiveItem(this.dataItemShop);
            return;
        }
        ShopManager.getInstance().boughtItem(this.dataItemShop);
    }
}