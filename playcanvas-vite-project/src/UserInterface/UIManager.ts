import * as pc from 'playcanvas'
import { UIMainMenu } from './UIMainMenu/Ui_MainMenu';
import { IUIController } from './IUiController';
import { UIInGame } from './UIInGame/UIInGame';
import { EventManager } from '../Utils/Observer';
import { SafeKeyEvent } from '../Helper/SafeKeyEvent';
import { UILoading } from './UILoading/UiLoading';
export class UiManager extends pc.Entity
{
    private app : pc.Application;
    private uiMainMenu !: UIMainMenu;
    private uiInGame !: UIInGame;
    private uiLoanding !: UILoading;
    private currentUI !: IUIController;
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
    }

    private setUpBegin()
    {
        this.addComponent('screen', {
            referenceResolution: new pc.Vec2(this.app.graphicsDevice.width, this.app.graphicsDevice.height),
            scaleBlend: 0,
            scaleMode: pc.SCALEMODE_BLEND,
            screenSpace: true
        });

        this.uiLoanding = new UILoading(this.app);
        this.addChild(this.uiLoanding);

        this.OpenUILoading();
        
        
    }
    public init()
    {
        this.uiMainMenu = new UIMainMenu(this.app);
        this.addChild(this.uiMainMenu);
        this.uiMainMenu.enabled = false;

        this.uiInGame = new UIInGame(this.app);
        this.uiInGame.setLocalPosition(0,0,0);
        this.addChild(this.uiInGame);
        this.uiInGame.enabled = false;

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


    private heplerOpenUI(ui :IUIController )
    {
        if(this.currentUI != null) this.currentUI.Close();
        this.currentUI = ui;
        this.currentUI.Open();
    }
    
    private CloseUI()
    {
        this.currentUI?.Close();
    }
}