import * as pc from 'playcanvas'
import { ScoreUI } from './ScoreUI'
import { Camera } from '../../Entity/Camera';
import EntityManager from '../../Entity/EntityManager';
import { SafeNameEntity } from '../../Helper/SafeNameEntity';
import { UiManager } from '../UIManager';
import { EventManager } from '../../Utils/Observer';
import { SafeKeyEvent } from '../../Helper/SafeKeyEvent';

export class ScoreUiManager extends pc.Entity {

   
    private poolScoreUIs: ScoreUI[] = [];
    private scoreUIActive: ScoreUI[] = [];
    private uiManger: UiManager;
    private mainCamera !: Camera;



    constructor( uiManager: UiManager) {
        super();
        this.uiManger = uiManager;
        this.mainCamera = EntityManager.getInstance().getEntity(SafeNameEntity.Camera) as Camera;
        this.registerEvent();
       

    }

    private registerEvent() {
        EventManager.on(SafeKeyEvent.SpawmScoreUI, this.spawmScoreUI.bind(this));
    }



    private createScoreUI() : ScoreUI
    {
        const scoreUI = new ScoreUI();
        this.addChild(scoreUI);
        scoreUI.on('scoreUI:tweenDone', this.deSpawScoreUI, this);
        return scoreUI;
    }

    public spawmScoreUI(pos: pc.Vec3, score : number) {
        
        if (this.mainCamera.camera == null) return;
        if (this.uiManger.screen == null) return;
        let scoreSpawm : ScoreUI | undefined;
        if(this.poolScoreUIs.length >0)
        {
            scoreSpawm = this.poolScoreUIs.pop();
        }
        else
        {
            scoreSpawm = this.createScoreUI();
        }

        if(scoreSpawm)
        {
            const screenPos = this.wordToScreenSpace(pos, this.mainCamera.camera, this.uiManger.screen);
            scoreSpawm.enabled = true
            this.scoreUIActive.push(scoreSpawm);
            scoreSpawm.setLocalPosition(screenPos);
            
            scoreSpawm.init(score);

            // setTimeout(() => {
            //     this.deSpawScoreUI(scoreSpawm);
            // }, 1000);
        }
    } 


    public update(dt : number)
    {
        if(!this.enabled) return;
        this.scoreUIActive.forEach(scoreUI => {
            if(scoreUI.enabled)
            {
                scoreUI.update();
            }
        });
    }


    private deSpawScoreUI(scoreUI : ScoreUI)
    {
        const index = this.scoreUIActive.indexOf(scoreUI);
        if(index == -1) return;
        scoreUI.enabled = false;
        this.scoreUIActive.splice(index,1);
        this.poolScoreUIs.push(scoreUI);
    }


    private wordToScreenSpace(worldPosition: pc.Vec3, camera: pc.CameraComponent, screen: pc.ScreenComponent): pc.Vec3 {
        const screenPos = camera.worldToScreen(worldPosition);
        const screenX = screenPos.x - (screen.resolution.x * 0.5);
        const screenY = (screen.resolution.y * 0.5) - screenPos.y;

        return new pc.Vec3(screenX, screenY, 0);
    }

    private clearScoreUI()
    {
        this.scoreUIActive.forEach(scoreUI => {
            if(scoreUI.enabled)
            {
                this.deSpawScoreUI(scoreUI);
            }
        });
    }


}