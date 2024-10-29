import * as pc from 'playcanvas';
import { AssetManager } from '../Utils/AssetManager';
import { SafeKeyAsset } from '../Helper/SafeKeyAsset';
import { EventManager } from '../Utils/Observer';
import { SafeKeyEvent } from '../Helper/SafeKeyEvent';
import EntityManager from '../Entity/EntityManager';
import { SafeNameEntity } from '../Helper/SafeNameEntity';

export class SoundManager extends pc.Entity {
    private volumeSoundBG: number = 1;
    private volumeSFX: number = 1;


    private readonly SOUND_SFX = {
        BUTTON: 'btnClick',
        TOUCH: 'touch',
        WOODBREAK : 'woodBreak',
        CUTITEM : 'cutItem',
        LOSEGAME : 'loseGame',
        WINLEVEL : 'Winlevel',
        WINMAP : 'WinMap',
        CUTGRASS : 'CUTGRASS'
    }
    private readonly SOUND_BACKGROUND = {
        BACKGROUND: 'soundBK',
    };

    constructor() {
        super();
        this.initialize();
        this.registerEvent();
        EntityManager.getInstance().registerEntity(SafeNameEntity.SoundManager, this);
    }

    private initialize(): void {
        this.setupSoundComponent();
        this.setupSoundSlots();


    }

    private registerEvent()
    {
        EventManager.on(SafeKeyEvent.PlaySoundSFXTouch, this.playSFXTouch.bind(this));
        EventManager.on(SafeKeyEvent.PlaySoundSFXBTN, this.playSFXBtnClick.bind(this));

        EventManager.on(SafeKeyEvent.OnTogleSoundBG , this.toggleBackgroundVolume.bind(this));
        EventManager.on(SafeKeyEvent.OnTogleSoundSFX , this.toggleSFXVolume.bind(this));

        EventManager.on(SafeKeyEvent.PlaySoundSFXCutItem, this.playSFXCutItem.bind(this));
        EventManager.on(SafeKeyEvent.PlaySoundSFXWoodBreak, this.playSFXWoodBreak.bind(this));
        EventManager.on(SafeKeyEvent.PLaySoundSFXLoseGame, this.playSFXLoseGame.bind(this));
        EventManager.on(SafeKeyEvent.PlaySoundSFXWinLevel, this.playSFXWinLevel.bind(this));
        EventManager.on(SafeKeyEvent.PlaySoundSFXWinMap, this.playSFXWinMap.bind(this));
        EventManager.on(SafeKeyEvent.playSFXCutGrass, this.playSFXCutGrass.bind(this));
    }


    private setupSoundComponent(): void {
        this.addComponent('sound', {
            positional: true,
            volume: 1,
            pitch: 1,
            refDistance: 1,
            maxDistance: 20,
            distanceModel: pc.DISTANCE_LINEAR,
            rollOffFactor: 1
        });
    }

    private setupSoundSlots(): void {
        if (!this.sound) return;

        // Sound Background
        this.sound.addSlot(this.SOUND_BACKGROUND.BACKGROUND, {
            startTime: 0,
            loop: true,
            autoPlay: true,
            volume: this.volumeSoundBG,
            pitch: 1,
            asset: AssetManager.getInstance().getAsset(SafeKeyAsset.SoundBackground)?.id
        });

        // Button Click
        this.sound.addSlot(this.SOUND_SFX.BUTTON, {
            startTime: 0,
            overlap: true,
            volume: this.volumeSFX,
            pitch: 1,
            asset: AssetManager.getInstance().getAsset(SafeKeyAsset.SoundButtonClick)?.id
        });

        // General Click
        this.sound.addSlot(this.SOUND_SFX.TOUCH, {
            startTime: 0,
            overlap: true,
            volume: this.volumeSFX/2,
            pitch: 1,
            asset: AssetManager.getInstance().getAsset(SafeKeyAsset.SoundTouchClick)?.id
        });


         // CUTITEM
         this.sound.addSlot(this.SOUND_SFX.CUTITEM, {
            startTime: 0,
            overlap: true,
            volume: this.volumeSFX,
            pitch: 1,
            asset: AssetManager.getInstance().getAsset(SafeKeyAsset.SoundCutItem)?.id
        });


        // WOODBREAK
        this.sound.addSlot(this.SOUND_SFX.WOODBREAK, {
            startTime: 0,
            overlap: true,
            volume: this.volumeSFX,
            pitch: 1,
            asset: AssetManager.getInstance().getAsset(SafeKeyAsset.SoundWoodBreak)?.id
        });

        
        // LOSEGAME
        this.sound.addSlot(this.SOUND_SFX.LOSEGAME, {
            startTime: 0,
            overlap: true,
            volume: this.volumeSFX,
            pitch: 1,
            asset: AssetManager.getInstance().getAsset(SafeKeyAsset.SoundLoseGame)?.id
        });

        //WINLEVEL
        this.sound.addSlot(this.SOUND_SFX.WINLEVEL, {
            startTime: 0,
            overlap: true,
            volume: this.volumeSFX,
            pitch: 1,
            asset: AssetManager.getInstance().getAsset(SafeKeyAsset.SoundWinLevel)?.id
        });

        //WinMap
        this.sound.addSlot(this.SOUND_SFX.WINMAP, {
            startTime: 0,
            overlap: true,
            volume: this.volumeSFX,
            pitch: 1,
            asset: AssetManager.getInstance().getAsset(SafeKeyAsset.SoundWinMap)?.id
        });


         //CutGrass
         this.sound.addSlot(this.SOUND_SFX.CUTGRASS, {
            startTime: 0,
            overlap: true,
            volume: this.volumeSFX/4,
            pitch: 1,
            asset: AssetManager.getInstance().getAsset(SafeKeyAsset.SoundCutGrass)?.id
        });

        


    }




    private playSFXBtnClick()
    {
        if(this.sound == null) return;
        if(this.sound.slot(this.SOUND_SFX.BUTTON) == null ) return;
        this.sound.slot(this.SOUND_SFX.BUTTON)?.play();
    }


    private playSFXTouch()
    {
        if(this.sound == null) return;
        if(this.sound.slot(this.SOUND_SFX.TOUCH) == null ) return;
        this.sound.slot(this.SOUND_SFX.TOUCH)?.play();
    }

    private playSFXCutItem()
    {
        console.log("play cut item");
        if(this.sound == null) return;
        if(this.sound.slot(this.SOUND_SFX.CUTITEM) == null ) return;
        this.sound.slot(this.SOUND_SFX.CUTITEM)?.play();
    }

    private playSFXWoodBreak()
    {
        if(this.sound == null) return;
        if(this.sound.slot(this.SOUND_SFX.WOODBREAK) == null ) return;
        this.sound.slot(this.SOUND_SFX.WOODBREAK)?.play();
    }

    private playSFXWinLevel()
    {
        if(this.sound == null) return;
        if(this.sound.slot(this.SOUND_SFX.WINLEVEL) == null ) return;
        this.sound.slot(this.SOUND_SFX.WINLEVEL)?.play();
    }

    private playSFXLoseGame()
    {
        if(this.sound == null) return;
        if(this.sound.slot(this.SOUND_SFX.LOSEGAME) == null ) return;
        this.sound.slot(this.SOUND_SFX.LOSEGAME)?.play();
    }

    private playSFXWinMap()
    {
        if(this.sound == null) return;
        if(this.sound.slot(this.SOUND_SFX.WINMAP) == null ) return;
        this.sound.slot(this.SOUND_SFX.WINMAP)?.play();
    }

    private playSFXCutGrass()
    {
        if(this.sound == null) return;
        if(this.sound.slot(this.SOUND_SFX.CUTGRASS) == null ) return;
        this.sound.slot(this.SOUND_SFX.CUTGRASS)?.play();
    }

    




    public toggleBackgroundVolume() {

        this.volumeSoundBG = (this.volumeSoundBG === 1) ? 0 : 1;
        if (this.sound == null) return;
        const slot = this.sound.slot(this.SOUND_BACKGROUND.BACKGROUND);
        if (slot) {
            slot.volume = this.volumeSoundBG;
        }

        EventManager.emit(SafeKeyEvent.OnChangeVolumeSoundBG, this.volumeSoundBG);
    }

    public toggleSFXVolume() {
        this.volumeSFX = this.volumeSFX === 1 ? 0 : 1;
        if (this.sound == null) return;
        Object.values(this.SOUND_SFX).forEach(slotName => {
            const slot = this.sound?.slot(slotName);
            if (slot) {
                slot.volume = this.volumeSFX;
            }
        });

        EventManager.emit(SafeKeyEvent.OnChangeVolumeSoundSFX, this.volumeSFX);
    }


}