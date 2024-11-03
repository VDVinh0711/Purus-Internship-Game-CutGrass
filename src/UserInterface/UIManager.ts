import * as pc from 'playcanvas'
import { UIMainMenu } from './UIMainMenu/Ui_MainMenu';
import { IUIController } from './IUiController';
import { UIInGame } from './UIInGame/UIInGame';
import { EventManager } from '../Utils/Observer';
import { SafeKeyEvent } from '../Helper/SafeKeyEvent';
import { UILoading } from './UILoading/UiLoading';
import { UiLoseGame } from './UILose/UI_Lose';
import { UISetting } from './UISetting/UISetting';
import { UIPauseGame } from './UIPauseGame/UIPauseGame';
import { ScoreUiManager } from './ScoreUI/UIScoreManager';
import { UINotifyManager } from './UINotifycation/UINotifyManager';
import { UIShop } from './UIShop/UIShop';
import { OverLayUIInput } from './OverLayUI';
import { UICredit } from './Other/UICredit';
import { TurtorialManager } from './Turtorial/TurtorialManager';
export class UiManager extends pc.Entity
{
    private app : pc.Application;
    private uiMainMenu !: UIMainMenu;
    private uiInGame !: UIInGame;
    private uiLoanding !: UILoading;
    private uiLose !: UiLoseGame;
    private currentUI !: IUIController;
    private uiSetting !:UISetting;
    private uiPauseGame !:UIPauseGame;
    private uiShop !: UIShop;
    private uiCredit !: UICredit;
    private uiOverlayInPut !: OverLayUIInput;
    private uiNotifycation !: UINotifyManager;
    private scoreUIManager !: ScoreUiManager;

    private uiTurtorial !: TurtorialManager;
    constructor( app : pc.Application)
    {
        super();
        this.app = app;
        this.setUpBegin();
        this.registerEvent();
    }


    private registerEvent()
    {
        EventManager.on(SafeKeyEvent.OpenUIInGame, this.OpenUIInGame.bind(this));
        EventManager.on(SafeKeyEvent.OpenUIMainMenu, this.OpenUIMainMenu.bind(this));
        EventManager.on(SafeKeyEvent.OpenUILoseGame, this.OpenUILoseGame.bind(this));
        EventManager.on(SafeKeyEvent.OpenUISetting, this.OpenUISetting.bind(this));
        EventManager.on(SafeKeyEvent.OPenUIPauseGame, this.OpenUiPauseGame.bind(this));
        EventManager.on(SafeKeyEvent.OpenUIShop, this.OpenUIShop.bind(this));
        EventManager.on(SafeKeyEvent.OpenUICredit, this.OpenUICredit.bind(this));
    }

    private setUpBegin()
    {
        this.addComponent('screen', {
            referenceResolution: new pc.Vec2(window.innerWidth, window.innerHeight),
            scaleBlend: 0,
            scaleMode: pc.SCALEMODE_NONE,
            screenSpace: true
        });

        this.uiLoanding = new UILoading(this.app);
        this.addChild(this.uiLoanding);

        this.OpenUILoading();
        
        
    }
    public init()
    {


        
        
        //UI Input
        this.uiOverlayInPut = new OverLayUIInput(this.app);
        this.addChild(this.uiOverlayInPut);

        
        //Main Menu
        this.uiMainMenu = new UIMainMenu(this.app);
        this.addChild(this.uiMainMenu);
        this.uiMainMenu.enabled = false;

        //Setting
        this.uiSetting = new UISetting();
        this.addChild(this.uiSetting);
        this.uiSetting.enabled = false;

        //Shop
        this.uiShop = new UIShop(this.app);
        this.addChild(this.uiShop);
        this.uiShop.setLocalPosition(0,0,0);
        this.uiShop.enabled = false;

        //In Game
        this.uiInGame = new UIInGame(this.app);
        this.addChild(this.uiInGame);
        this.uiInGame.enabled = false;

        //Lose
        this.uiLose = new UiLoseGame();
        this.addChild(this.uiLose);
        this.uiLose.enabled = false;

        //Pause Game
        this.uiPauseGame = new UIPauseGame(this.app);
        this.addChild(this.uiPauseGame);
        this.uiPauseGame.enabled = false;

        //Score
        this.scoreUIManager = new ScoreUiManager(this);
        this.addChild(this.scoreUIManager);

        //Notify
        this.uiNotifycation = new UINotifyManager(this.app);
        this.addChild(this.uiNotifycation);


        //UICredit
        this.uiCredit = new UICredit(this.app);
        this.addChild(this.uiCredit);
        this.uiCredit.enabled = false;


        //TURTORIAL
        this.uiTurtorial = new TurtorialManager(this.app);
        this.addChild(this.uiTurtorial);

         //OpenUI MainMenu
        this.OpenUIMainMenu();

       
       
    }


    
    private OpenUIMainMenu()
    {
        this.heplerOpenUI(this.uiMainMenu)
    }
    
    private OpenUILoading()
    {
        this.heplerOpenUI(this.uiLoanding)
    }

    private OpenUIInGame()
    {
        this.heplerOpenUI(this.uiInGame)
    }

    private OpenUILoseGame()
    {
        this.heplerOpenUI(this.uiLose);
    }
    private OpenUISetting()
    {
        this.heplerOpenUI(this.uiSetting);
    }

    private OpenUiPauseGame()
    {
        this.heplerOpenUI(this.uiPauseGame);
    }

    private OpenUIShop()
    {
        this.heplerOpenUI(this.uiShop);
    }



    private OpenUICredit()
    {
        this.heplerOpenUI(this.uiCredit);
    }

    private heplerOpenUI(ui :IUIController )
    {
        if(this.currentUI != null) this.currentUI.Close();
        this.currentUI = ui;
        this.currentUI.Open();
    }


    public upDate()
    {
      this.uiMainMenu.update();
      this.scoreUIManager.update();
      this.uiNotifycation.update();
      this.uiPauseGame.update();
      this.uiInGame.update();
      this.uiSetting.update();
      this.uiLose.update();
      this.uiShop.update();
      this.uiCredit.update();
      this.uiTurtorial.update();
    }
    
    // private CloseUI()
    // {
    //     this.currentUI?.Close();
    // }
}