import * as pc from 'playcanvas'
import { TurControll } from './TurControll';
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';
import { TurChest } from './TurChest';
import { TurPowerUp } from './TurPowerUp';
import { TurtorialGuidControll } from './TurControlSimple';

export class TurtorialManager extends pc.Entity
{


    private app : pc.Application;
    private turControll !: TurControll;
    private turChest !: TurChest;
    private turPowerUp !: TurPowerUp;


    private turGuidControll !: TurtorialGuidControll;
    constructor(app : pc.Application)
    {
        super();
        this.app = app;
        this.setUpBegin();
        this.registerEvent();
    }




    private registerEvent()
    {
        EventManager.on(SafeKeyEvent.OpenTurControllBlade, this.OpenTurControllBlade.bind(this));
        EventManager.on(SafeKeyEvent.OpenTurChestInGame, this.OpenTurChest.bind(this));
        EventManager.on(SafeKeyEvent.OpenTurPowerUpItem, this.OpenTurPowerUp.bind(this));
        EventManager.on(SafeKeyEvent.OpenTurGuidControll, this.OpenTurGuidControll.bind(this));
    }

    private setElement()
    {
        this.addComponent('element',{
            type : pc.ELEMENTTYPE_GROUP,
            anchor : [0.5,0.5,0.5,0.5],
            pivot : [0.5,0.5],
            width : window.innerWidth,
            height : window.innerHeight
        })
    }

    private setUpBegin()
    {
        this.setElement();


        this.turControll = new TurControll();
        this.addChild(this.turControll);
        this.turControll.enabled = false;
        this.turControll.setLocalPosition(0,0,0);

        this.turChest = new TurChest();
        this.addChild(this.turChest);
        this.turChest.enabled = false;
        this.turChest.setLocalPosition(0,0,0);

        this.turPowerUp = new TurPowerUp();
        this.addChild(this.turPowerUp);
        this.turPowerUp.enabled = false;
        this.turPowerUp.setLocalPosition(0,0,0);


        this.turGuidControll = new TurtorialGuidControll(this.app);
        this.addChild(this.turGuidControll);
        this.turGuidControll.enabled = false;
        this.turGuidControll.setLocalPosition(0,0,0);
    }




    public update()
    {
        this.turGuidControll.update();
        this.turChest.update();
        this.turPowerUp.update();
    }

    private OpenTurControllBlade()
    {
       this.turGuidControll.Close();
       this.turControll.Open();
    }

    private OpenTurChest()
    {
        this.turGuidControll.Close();
        this.turChest.Open(); 
    }
    private OpenTurPowerUp()
    {
        this.turGuidControll.Close();
        this.turPowerUp.Open();
    }

    private OpenTurGuidControll()
    {
        this.turGuidControll.Open();
    }
   
}