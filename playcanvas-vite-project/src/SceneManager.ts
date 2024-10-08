import * as pc from 'playcanvas';
import { Camera } from './Entity/Camera';
import { Light } from './Entity/Light';
export class SceneManager {
    private camera!: Camera;
    private light!: pc.Entity;
    
    constructor(private app: pc.Application) {
        this.setUpScene();
        
    }

    private setUpScene() {
        //Camera
        this.camera = new Camera();
        this.app.root.addChild(this.camera);

        //Light
        this.light = new Light();
        this.app.root.addChild(this.light);
    }
}