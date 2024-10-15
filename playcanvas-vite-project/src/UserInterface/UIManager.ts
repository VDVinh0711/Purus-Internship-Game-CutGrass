import * as pc from 'playcanvas'
import { UIMainMenu } from './UIMainMenu/Ui_MainMenu';
import { IUIController } from './IUiController';
import { UiInGame } from './UIInGame/UIInGame';
import { EventManager } from '../Utils/Observer';
import { SafeKeyEvent } from '../Helper/SafeKeyEvent';
export class UiManager extends pc.Entity
{
    private app : pc.Application;
    private uiMainMenu !: UIMainMenu;
    private uiInGame !: UiInGame;
    private currentUi !: IUIController;
    constructor( app : pc.Application)
    {
        super();
        this.app = app;
        this.setUpBegin();
        this.registerEvent();
        this.init();
        this.OpenUIMainMenu();
    }


    private registerEvent()
    {
        EventManager.on(SafeKeyEvent.OpenUIInGame, this.OpenUIInGame.bind(this));
        EventManager.on(SafeKeyEvent.OpenUIMainMenu, this.OpenUIMainMenu.bind(this));
    }

    private setUpBegin()
    {
        this.addComponent('screen', {
            referenceResolution: new pc.Vec2(1280, 720),
            scaleBlend: 0.5,
            scaleMode: pc.SCALEMODE_BLEND,
            screenSpace: true
        });
    }
    private init()
    {
        this.uiMainMenu = new UIMainMenu(this.app);
        this.addChild(this.uiMainMenu);
        this.uiMainMenu.enabled = false;

        this.uiInGame = new UiInGame(this.app);
        this.addChild(this.uiInGame);
        this.uiInGame.enabled = false;
    }


    private OpenUIMainMenu()
    {
        this.CloseUI();
        this.currentUi = this.uiMainMenu;
        this.currentUi.Open();
    }

    private OpenUIInGame()
    {
        this.CloseUI();
        this.currentUi = this.uiInGame;
        this.currentUi.Open();
    }
    private OpenUILose()
    {

    }
    private CloseUI()
    {
        this.currentUi?.Close();
    }
}