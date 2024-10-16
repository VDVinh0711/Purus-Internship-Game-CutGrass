import * as pc from 'playcanvas';
import { AssetManager } from '../Utils/AssetManager';

export class BaseButtonUI extends pc.Entity {
    constructor(options: {
        width: number;
        height: number;
        textureAsset: string;
    }) {
        super();
        this.setElement(options);
        this.addComponent('button');
    }

    protected setElement(options: {
        width: number;
        height: number;
        textureAsset: string; 
    }) {
        this.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: options.width,
            height: options.height,
            type: pc.ELEMENTTYPE_IMAGE,
            useInput: true,
            color: new pc.Color(1, 1, 1),
            textureAsset: AssetManager.getInstance().getAsset(options.textureAsset),
        });
    }
}
