import * as pc from 'playcanvas';
import { AssetManager } from '../../../Utils/AssetManager';
import { SafeKeyAsset } from '../../../Helper/SafeKeyAsset';

export class UIBaseSubUI extends pc.Entity {
    protected app: pc.Application;
    protected txt_title!: pc.Entity;
    protected txt_direction!: pc.Entity;

    constructor(app: pc.Application) {
        super();
        this.app = app;
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
            fontAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.FontCreanBeige),
            fontSize: 40,
            text: 'Click To Continue'
        });
        this.txt_direction.setLocalPosition(0, 100, 0);
    }
}