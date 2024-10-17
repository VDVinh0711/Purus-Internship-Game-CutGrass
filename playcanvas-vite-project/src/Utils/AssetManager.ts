import * as pc from 'playcanvas'
import { SafeKeyAsset } from '../Helper/SafeKeyAsset';

export class AssetManager {
    private static instance: AssetManager;
    private holderAsset: Map<string, pc.Asset> = new Map<string, pc.Asset>();
    private eventHandler: pc.EventHandler;

    private constructor() {
        this.eventHandler = new pc.EventHandler();
    }

    public static getInstance() {
        if (AssetManager.instance == null) {
            AssetManager.instance = new AssetManager();
        }
        return AssetManager.instance;
    }

    public getAsset(keyAsset: string): pc.Asset | undefined {
        return this.holderAsset.get(keyAsset);
    }

    public LoadAsset(app: pc.Application): void {
        const listAsset = {
            [SafeKeyAsset.FontCreanBeige]: new pc.Asset('font', 'font', { url: '../../Asset/Fonts/Cream Beige.json' }),
            [SafeKeyAsset.ModelBlade]: new pc.Asset("modelBlade", "model", { url: "../../Asset/Models/Sword2.glb" }),
            [SafeKeyAsset.ModelGrass]: new pc.Asset("modelGrass", "model", { url: "../../Asset/Models/Grass Patch 01.glb" }),
            [SafeKeyAsset.ModelFlower]: new pc.Asset("modelFlower", "model", { url: "../../Asset/Models/Flower2.glb" }),
            [SafeKeyAsset.TexureBlade]: new pc.Asset("textureBlade", "texture", { url: "../../Asset/Texure/Albedo Sword 2.png" }),
            [SafeKeyAsset.IMGButtonPlay] : new pc.Asset("srpiteButtonPlay","texture", {url:"../../Asset/ICON/btn/play.png"}),
            [SafeKeyAsset.IMGBUttonSetting] : new pc.Asset("srpiteButtonPlay","texture", {url:"../../Asset/ICON/btn/settings.png"})  ,
            [SafeKeyAsset.IMGBackGroundSetting] : new pc.Asset("BackgroundSetting","texture",{url:"../../Asset/ICON/settings/table.png"}),
            [SafeKeyAsset.IMGButtonCLose] : new pc.Asset("IMGButtonCLose","texture",{url:"../../Asset/ICON/btn/close_2.png"}),
            [SafeKeyAsset.IMGButtonSoundBG] : new pc.Asset("IMGButtonSoundBG","texture",{url:"../../Asset/ICON/btn/sound.png"}),
            [SafeKeyAsset.IMGButtonSoundSFX] : new pc.Asset("IMGButtonSoundSFX","texture",{url:"../../Asset/ICON/btn/misic.png"}),
            [SafeKeyAsset.IMGTitleSetting] : new pc.Asset("IMGButtonSoundSFX","texture",{url:"../../Asset/ICON/settings/92.png"}),
            [SafeKeyAsset.IMGIconWin] : new pc.Asset("IMGButtonSoundSFX","texture",{url:"../../Asset/ICON/you_win/header.png"}),
            [SafeKeyAsset.IMGIConLose] : new pc.Asset("IMGIConLose","texture",{url:"../../Asset/ICON/you_lose/header.png"}),
            [SafeKeyAsset.IMGBtnPlayAgain] : new pc.Asset("IMGBtnPlayAgain","texture",{url:"../../Asset/ICON/btn/restart.png"}),
            [SafeKeyAsset.IMGBackToMenU] : new pc.Asset("IMGBackToMenU","texture",{url:"../../Asset/ICON/btn/leader.png"}),
            [SafeKeyAsset.IMGRevive] : new pc.Asset("IMGRevive","texture",{url:"../../Asset/ICON/btn/faq.png"}),


        };

        const AssetLoader = new pc.AssetListLoader(Object.values(listAsset), app.assets);
        
        AssetLoader.load(() => {
            for (const [key, value] of Object.entries(listAsset)) {
                this.holderAsset.set(key, value);
            }
            this.eventHandler.fire('assetsLoaded');
        });
    }

    public on(eventName: string, callback: (...args: any[]) => void, scope?: any) {
        this.eventHandler.on(eventName, callback, scope);
    }
}