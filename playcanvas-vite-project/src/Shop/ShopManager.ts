import { SafeKeyAsset } from "../Helper/SafeKeyAsset";
import { SafeKeyEvent } from "../Helper/SafeKeyEvent";
import { DimondManager } from "../Player/DimondManager";
import { AssetManager } from "../Utils/AssetManager";
import { EventManager } from "../Utils/Observer";
import { ItemDataShop } from "./ItemShopData";
import * as pc from 'playcanvas';
export class ShopManager {
    private static instance: ShopManager;
    private itemsShop: ItemDataShop[] = []

    public static getInstance(): ShopManager {
        if (ShopManager.instance == null) {
            ShopManager.instance = new ShopManager();
        }
        return ShopManager.instance;
    }


    constructor() {
        this.createDataShop();
    }

    private createDataShop() {
        const bladeSimple = new ItemDataShop(
            {
                model: SafeKeyAsset.ModelBladeSimple,
                texure: SafeKeyAsset.TexureBladeSimple,
                colorRope: new pc.Color(1, 1, 1)
            },
            10,
            AssetManager.getInstance().getAsset(SafeKeyAsset.IMGIconBladeSimple)!
        );
        bladeSimple.setAcitve(true);
        bladeSimple.setIsBought(true);
        this.itemsShop.push(bladeSimple);



        const bladeNormal = new ItemDataShop(
            {
                model: SafeKeyAsset.ModelBladeNormal,
                texure: SafeKeyAsset.TexureBladeNormal,
                colorRope: new pc.Color(1, 1, 1)
            },
            10,
            AssetManager.getInstance().getAsset(SafeKeyAsset.IMGIconBladeNormal)!
        );
        this.itemsShop.push(bladeNormal);



        const bladeMonster = new ItemDataShop(
            {
                model: SafeKeyAsset.ModelBladeMonster,
                texure: SafeKeyAsset.TexureBladeMonster,
                colorRope: new pc.Color(1, 1, 1)
            },
            10,
            AssetManager.getInstance().getAsset(SafeKeyAsset.IMGIconBladeMonster)!
        );
        this.itemsShop.push(bladeMonster);
    }

    public getListItem(): ItemDataShop[] {
        return this.itemsShop;
    }


    public boughtItem(item: ItemDataShop) {
        const index = this.itemsShop.indexOf(item);
        if (index == -1) return;
        if (this.itemsShop[index].getPrice() > DimondManager.getInstace().getDimond()) {
            EventManager.emit(SafeKeyEvent.OpenUITextNotifyCation, "You don't have enough Star !");
            return;
        }
        DimondManager.getInstace().reduceDimond(this.itemsShop[index].getPrice());
        this.itemsShop[index].setIsBought(true);
        this.changeActiveItem(this.itemsShop[index]);
    }

    public changeActiveItem(item: ItemDataShop) {
        const index = this.itemsShop.indexOf(item);
        if (index == -1) return;
        this.itemsShop.forEach(item => {
            item.setAcitve(false);
        });

        this.itemsShop[index].setAcitve(true);
        EventManager.emit(SafeKeyEvent.OnChangeModelBlade, this.itemsShop[index].getDataModel());
    }
}