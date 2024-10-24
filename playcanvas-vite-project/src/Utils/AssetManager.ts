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
            [SafeKeyAsset.ModelBlade1]: new pc.Asset("modelBlade", "model", { url: "../../Asset/Models/Sword/Sword3.glb" }),
            [SafeKeyAsset.ModelGrass]: new pc.Asset("modelGrass", "model", { url: "../../Asset/Models/Grass Patch 01.glb" }),
            [SafeKeyAsset.ModelFlower]: new pc.Asset("modelFlower", "model", { url: "../../Asset/Models/Flower.glb" }),
            [SafeKeyAsset.TexureBlade]: new pc.Asset("textureBlade", "texture", { url: "../../Asset/Texure/Albedo Sword 2.png" }),
            [SafeKeyAsset.IMGButtonPlay] : new pc.Asset("srpiteButtonPlay","texture", {url:"../../Asset/ICON/btn/play.png"}),
            [SafeKeyAsset.IMGBUttonSetting] : new pc.Asset("srpiteButtonPlay","texture", {url:"../../Asset/ICON/btn/settings.png"})  ,
            [SafeKeyAsset.IMGBackGroundPaper] : new pc.Asset("BackgroundSetting","texture",{url:"../../Asset/ICON/settings/table.png"}),
            [SafeKeyAsset.IMGButtonCLose] : new pc.Asset("IMGButtonCLose","texture",{url:"../../Asset/ICON/btn/close_2.png"}),
            [SafeKeyAsset.IMGButtonSoundBG] : new pc.Asset("IMGButtonSoundBG","texture",{url:"../../Asset/ICON/btn/sound.png"}),
            [SafeKeyAsset.IMGButtonSoundSFX] : new pc.Asset("IMGButtonSoundSFX","texture",{url:"../../Asset/ICON/btn/misic.png"}),
            [SafeKeyAsset.IMGTitleSetting] : new pc.Asset("IMGButtonSoundSFX","texture",{url:"../../Asset/ICON/settings/92.png"}),
            [SafeKeyAsset.IMGIconWin] : new pc.Asset("IMGButtonSoundSFX","texture",{url:"../../Asset/ICON/you_win/header.png"}),
            [SafeKeyAsset.IMGIConLose] : new pc.Asset("IMGIConLose","texture",{url:"../../Asset/ICON/you_lose/header.png"}),
            [SafeKeyAsset.IMGBtnPlayAgain] : new pc.Asset("IMGBtnPlayAgain","texture",{url:"../../Asset/ICON/btn/restart.png"}),
            [SafeKeyAsset.IMGBackToMenU] : new pc.Asset("IMGBackToMenU","texture",{url:"../../Asset/ICON/btn/leader.png"}),
            [SafeKeyAsset.IMGRevive] : new pc.Asset("IMGRevive","texture",{url:"../../Asset/ICON/btn/faq.png"}),
            [SafeKeyAsset.IMGBtnCloseSoundBG] : new pc.Asset("IMGBtnCloseSoundBG", "texture",{url:"../../Asset/ICON/btn/sound_off.png"}),
            [SafeKeyAsset.IMGBtnCloseSoundSFX] : new pc.Asset("IMGBtnCloseSoundSFX", "texture",{url:"../../Asset/ICON/btn/music_off.png"}),
            [SafeKeyAsset.ModelStar] : new pc.Asset("ModelStar", "model",{url:"../../Asset/Models/Star.glb"}),
            [SafeKeyAsset.IMGIconPowerUp] : new pc.Asset("IMGIconPowerUp","texture",{url:"../../Asset/ICON/menu/ico1.png"}),
            [SafeKeyAsset.IMGFlowerTexure] : new pc.Asset("IMGFlowerTexure","texture",{url:"../../Asset/Texure/flowerTexure.png"}), 
            [SafeKeyAsset.ModelParticleGrass] : new pc.Asset("ModelParticleGrass", "model", { url: "../../Asset/Models/Stone Block.glb" }),
            [SafeKeyAsset.TextureBackgroundWate] : new pc.Asset("TextureBackgroundWate", "texture", { url: "../../Asset/Texure/bgWater.png" }),
            [SafeKeyAsset.ModelParticleLose] : new pc.Asset("ModelParticleLose", "model",{url:"../../Asset/Models/Skullv3.glb"}),
            [SafeKeyAsset.BackGroundWood] : new pc.Asset("BackgroundLose","texture",{url:"../../Asset/ICON/you_lose/bg.png"}),
            [SafeKeyAsset.ICONScore] : new pc.Asset("ICONScore","texture",{url:"../../Asset/ICON/star_1.png"}),
            [SafeKeyAsset.IMGTilePauseGame] : new pc.Asset("IMGTilePauseGame","texture",{url:"../../Asset/ICON/btn/titlepause.png"}),
            [SafeKeyAsset.IMGIconPause] : new pc.Asset("IMGIconPause","texture",{url:"../../Asset/ICON/btn/pause.png"}),
            [SafeKeyAsset.ModelBlade2] :new pc.Asset("modelBlade", "model", { url: "../../Asset/Models/Sword/Sword2.glb" }),
            [SafeKeyAsset.ModelChest] : new pc.Asset('ModelChest' , 'model' , {url : "../../Asset/Models/Chest.glb"}),
            [SafeKeyAsset.IMGButtonOK] : new pc.Asset('IMGButtonOK' , 'texture' , {url : "../../Asset/ICON/btn/ok.png"}),
            [SafeKeyAsset.IMGTitleNotification] : new pc.Asset('IMGTitleNotification' , 'texture' , {url : "../../Asset/ICON/titleNotification.png"}),
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