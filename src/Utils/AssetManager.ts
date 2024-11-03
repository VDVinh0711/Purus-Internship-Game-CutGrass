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
            //============================== ========================FONT ==========================================================
            [SafeKeyAsset.FontCreanBeige]: new pc.Asset('font', 'font', { url: 'Fonts/Cream Beige.json' }),


           
            //====================================================== MODEL ========================================================
            [SafeKeyAsset.ModelBladeSimple]: new pc.Asset("ModelBladeSimple", "model", { url: "Models/Sword/ModelBaldeSimple.glb" }),
            [SafeKeyAsset.ModelBladeNormal]: new pc.Asset("ModelBladeNormal", "model", { url: "Models/Sword/BladeNormal.glb" }),
            [SafeKeyAsset.ModelBladeMonster]: new pc.Asset("ModelBladeMonster", "model", { url: "Models/Sword/ModedlBladeMonster.glb" }),
            [SafeKeyAsset.ModelGrass]: new pc.Asset("modelGrass", "model", { url: "Models/Grass Patch 01.glb" }),
            [SafeKeyAsset.ModelFlower]: new pc.Asset("modelFlower", "model", { url: "Models/Flower.glb" }),
            [SafeKeyAsset.ModelParticleLose] : new pc.Asset("ModelParticleLose", "model",{url:"Models/Skullv3.glb"}),
            [SafeKeyAsset.ModelChest] : new pc.Asset('ModelChest' , 'model' , {url : "Models/Chest.glb"}),
            [SafeKeyAsset.ModelParticleGrass] : new pc.Asset("ModelParticleGrass", "model", { url: "Models/Stone Block.glb" }),
            [SafeKeyAsset.ModelStar] : new pc.Asset("ModelStar", "model",{url:"Models/Star.glb"}),


            //====================================================== TEXURE =======================================================
           
           
            [SafeKeyAsset.TexureBladeSimple]: new pc.Asset("textureBlade", "texture", { url: "Texure/Sword/BladeSimple.png" }),
            [SafeKeyAsset.TexureBladeNormal]: new pc.Asset("TexureBladeNormal", "texture", { url: "Texure/Sword/BladeNormal.png" }),
            [SafeKeyAsset.TexureBladeMonster]: new pc.Asset("TexureBladeMonster", "texture", { url: "Texure/Sword/BladeMonster.png" }),
            [SafeKeyAsset.TextureBackgroundWater] : new pc.Asset("TextureBackgroundWate", "texture", { url: "Texure/bgWater.png" }),


           
           
            //===================================================== IMAGE ==========================================================
            [SafeKeyAsset.IMGButtonPlay] : new pc.Asset("srpiteButtonPlay","texture", {url:"ICON/btn/play.png"}),
            [SafeKeyAsset.IMGBUttonSetting] : new pc.Asset("srpiteButtonPlay","texture", {url:"ICON/btn/settings.png"})  ,
            [SafeKeyAsset.IMGBackGroundPaper] : new pc.Asset("BackgroundSetting","texture",{url:"ICON/settings/table.png"}),
            [SafeKeyAsset.IMGButtonCLoseCircle] : new pc.Asset("IMGButtonCLose","texture",{url:"ICON/btn/close_2.png"}),
            [SafeKeyAsset.IMGButtonCLoseSquare] : new pc.Asset("IMGButtonCLoseSquare","texture",{url:"ICON/btn/close.png"}),
            [SafeKeyAsset.IMGButtonSoundBG] : new pc.Asset("IMGButtonSoundBG","texture",{url:"ICON/btn/sound.png"}),
            [SafeKeyAsset.IMGButtonSoundSFX] : new pc.Asset("IMGButtonSoundSFX","texture",{url:"ICON/btn/misic.png"}),
            [SafeKeyAsset.IMGTitleSetting] : new pc.Asset("IMGButtonSoundSFX","texture",{url:"ICON/settings/92.png"}),
            [SafeKeyAsset.IMGIconWin] : new pc.Asset("IMGButtonSoundSFX","texture",{url:"ICON/you_win/header.png"}),
            [SafeKeyAsset.IMGIConLose] : new pc.Asset("IMGIConLose","texture",{url:"ICON/you_lose/header.png"}),
            [SafeKeyAsset.IMGBtnPlayAgain] : new pc.Asset("IMGBtnPlayAgain","texture",{url:"ICON/btn/restart.png"}),
            [SafeKeyAsset.IMGBackToMenU] : new pc.Asset("IMGBackToMenU","texture",{url:"ICON/btn/leader.png"}),
            [SafeKeyAsset.IMGRevive] : new pc.Asset("IMGRevive","texture",{url:"ICON/btn/faq.png"}),
            [SafeKeyAsset.IMGBtnCloseSoundBG] : new pc.Asset("IMGBtnCloseSoundBG", "texture",{url:"ICON/btn/sound_off.png"}),
            [SafeKeyAsset.IMGBtnCloseSoundSFX] : new pc.Asset("IMGBtnCloseSoundSFX", "texture",{url:"ICON/btn/music_off.png"}),
            [SafeKeyAsset.IMGIconPowerUp] : new pc.Asset("IMGIconPowerUp","texture",{url:"ICON/power-up.png"}),
            [SafeKeyAsset.IMGFlowerTexure] : new pc.Asset("IMGFlowerTexure","texture",{url:"Texure/flowerTexure.png"}), 
            [SafeKeyAsset.BackGroundWood] : new pc.Asset("BackgroundLose","texture",{url:"ICON/you_lose/bg.png"}),
            [SafeKeyAsset.IConDimond] : new pc.Asset("ICONScore","texture",{url:"ICON/star_1.png"}),
            [SafeKeyAsset.IMGTilePauseGame] : new pc.Asset("IMGTilePauseGame","texture",{url:"ICON/btn/titlepause.png"}),
            [SafeKeyAsset.IMGIconPause] : new pc.Asset("IMGIconPause","texture",{url:"ICON/btn/pause.png"}),
            [SafeKeyAsset.IMGButtonOK] : new pc.Asset('IMGButtonOK' , 'texture' , {url : "ICON/btn/ok.png"}),
            [SafeKeyAsset.IMGTitleNotification] : new pc.Asset('IMGTitleNotification' , 'texture' , {url : "ICON/titleNotification.png"}),
            [SafeKeyAsset.IMGTitleShop] : new pc.Asset('IMGTitleShop' , 'texture' , {url : "ICON/shop/header.png"}),
            [SafeKeyAsset.IMGIconLock] : new pc.Asset('IMGIconLock' , 'texture' , {url : "ICON/btn/lock.png"}),
            [SafeKeyAsset.IMGBtnShop] : new pc.Asset('IMGBtnShop' , 'texture' , {url : "ICON/btn/shop.png"}),
            [SafeKeyAsset.IMGIconActive] : new pc.Asset('IMGIconActive' , 'texture' , {url : "ICON/shop/dot_a.png"}),
            [SafeKeyAsset.IMGBackgroundShop] : new pc.Asset('IMGBackgroundShop' , 'texture' , {url : "ICON/shop/background.png"}),
            [SafeKeyAsset.IMGTitleCredit] : new pc.Asset('IMGTitleCredit' , 'texture' , {url : "ICON/titleCredit.png"}),
            [SafeKeyAsset.IMGIconCredit] : new pc.Asset('IMGIconCredit' , 'texture' , {url : "ICON/btn/about.png"}),

            //==================================================== IMG TURTORIAL ====================================================
            [SafeKeyAsset.IMGControllBlade] : new pc.Asset('IMGControllBlade' , 'texture' , {url : "Other/IMGTUR/Controll.png"}),
            [SafeKeyAsset.IMGTurPowerUp] : new pc.Asset('IMGTurPowerUp' , 'texture' , {url : "Other/IMGTUR/PowerUp.png"}),
            [SafeKeyAsset.IMGTurChest] : new pc.Asset('IMGTurChest' , 'texture' , {url : "Other/IMGTUR/HitChest.png"}),
            [SafeKeyAsset.IMGIConCLick] : new pc.Asset('IMGIConCLick' , 'texture' , {url : "Other/IMGTUR/clickIcon.png"}),

            //==================================================== OTHER =============================================================
            [SafeKeyAsset.IMGICONCATBOTTOMLEFT] : new pc.Asset('IMGICONCATBOTTOMLEFT' , 'texture' , {url : "Other/cute_cat_water.png"}),
            [SafeKeyAsset.IMGICONCATBOTTOMRIGHT] : new pc.Asset('IMGICONCATBOTTOMRIGHT' , 'texture' , {url : "Other/catthankyou.png"}),

            //==================================================== IMG ICON ==========================================================
            [SafeKeyAsset.IMGIconBladeSimple] : new pc.Asset('IMGIconBladeSimple' , 'texture' , {url : "ImageIcon/BladeSimple.png"}),
            [SafeKeyAsset.IMGIconBladeNormal] : new pc.Asset('IMGIconBladeNormal' , 'texture' , {url : "ImageIcon/Bladenormal.png"}),
            [SafeKeyAsset.IMGIconBladeMonster] : new pc.Asset('IMGIconBladeMonster' , 'texture' , {url : "ImageIcon/BladeMonster.png"}),

            //===================================================== SOUND =======================================================
            [SafeKeyAsset.SoundBackground] : new pc.Asset ('soundBK', 'audio' , {url : 'Music/soudBackground.mp3'}),
            [SafeKeyAsset.SoundTouchClick] : new pc.Asset ('SoundTouchClick', 'audio' , {url : 'Music/touch.mp3'}),
            [SafeKeyAsset.SoundButtonClick] : new pc.Asset ('SoundTouchClick', 'audio' , {url : 'Music/btnClick.mp3'}), 
            [SafeKeyAsset.SoundLoseGame] : new pc.Asset ('SoundLoseGame', 'audio' , {url : 'Music/loseGame.mp3'}),
            [SafeKeyAsset.SoundWinLevel] : new pc.Asset ('SoundWinLevel', 'audio' , {url : 'Music/winlevel.mp3'}),
            [SafeKeyAsset.SoundCutItem] : new pc.Asset ('SoundCutItem', 'audio' , {url : 'Music/cutItem.mp3'}),
            [SafeKeyAsset.SoundWoodBreak] : new pc.Asset ('SoundWoodBreak', 'audio' , {url : 'Music/woodBreak.mp3'}),
            [SafeKeyAsset.SoundWinMap] : new pc.Asset ('SoundWinMap', 'audio' , {url : 'Music/winmap.mp3'}),
            [SafeKeyAsset.SoundCutGrass] : new pc.Asset ('SoundCutGrass', 'audio' , {url : 'Music/cutGrass.mp3'}),
            



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