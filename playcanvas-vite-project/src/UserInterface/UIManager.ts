import * as pc from 'playcanvas'
import { UIMainMenu } from './UIMainMenu/Ui_MainMenu';
export class UiManager extends pc.Entity
{
    private uiMainMenu: UIMainMenu;

    constructor()
    {
        super();
        
        console.log("Init Main scene");
      
        this.addComponent('screen', {
            referenceResolution: new pc.Vec2(1280, 720),
            scaleBlend: 0.5,
            scaleMode: pc.SCALEMODE_BLEND,
            screenSpace: true
        });
    
        this.uiMainMenu = new UIMainMenu();
        this.addChild(this.uiMainMenu);
    }
}