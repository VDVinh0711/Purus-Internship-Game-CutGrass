import * as pc from 'playcanvas';
import { AssetManager } from '../../../Utils/AssetManager';
import { SafeKeyAsset } from '../../../Helper/SafeKeyAsset';

export class UIBaseSubUI extends pc.Entity {
    protected app: pc.Application;
    protected txt_title!: pc.Entity;
    protected txt_direction!: pc.Entity;
    protected fontSizeText: number = 40;

    constructor(app: pc.Application) {
        super();
        this.app = app;
        this.setUpBegin();
    }
    

    private setUpBegin()
    {
        this.setUpResize();
        this.setElement();
        this.setText();
        this.setTextDirection();
    }

    protected setElement() {
        this.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: this.app.graphicsDevice.width,
            height: this.app.graphicsDevice.height,
            type: pc.ELEMENTTYPE_GROUP,
            useInput: true,
        });
    }

    protected setText() {
        this.txt_title = new pc.Entity('TextSuccess');
        this.addChild(this.txt_title);
        this.txt_title.addComponent('element', {
            type: pc.ELEMENTTYPE_TEXT,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            outlineColor: new pc.Color(0, 0, 0),
            outlineThickness: 0.5,
            fontAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.FontCreanBeige),
            fontSize: 40,
            text: 'Success Text',
        });
    }

    protected setTextDirection() {
        this.txt_direction = new pc.Entity('TextDirection');
        this.addChild(this.txt_direction);
        this.txt_direction.addComponent('element', {
            type: pc.ELEMENTTYPE_TEXT,
            anchor: [0.5, 0, 0.5, 0],
            pivot: [0.5, 0],
            outlineColor: new pc.Color(0, 0, 0),
            outlineThickness: 0.5,
            fontAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.FontCreanBeige),
            fontSize: 40,
            text: 'Click To Continue'
        });
        this.txt_direction.setLocalPosition(0, 100, 0);
    }


    private setUpResize() {
        const minScale = 0.7;
        const maxScale = 1;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const scaleX = screenWidth / 1920;
        const scaleY = screenHeight / 1080;

        const scale = Math.min(scaleX, scaleY);

        const finalScale = Math.max(minScale, Math.min(maxScale, scale));


        this.fontSizeText *= finalScale;


    }
}