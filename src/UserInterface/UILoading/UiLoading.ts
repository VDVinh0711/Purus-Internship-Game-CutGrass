import * as pc from "playcanvas"
import { IUIController } from "../IUiController";

export class UILoading extends pc.Entity implements IUIController
{
    private app : pc.Application;
    private background !: pc.Entity;
    private text_Loading !: pc.Entity;
    constructor(app : pc.Application)
    {
        super();
        this.app = app;
        this.setElement();
        this.setBackground();
        this.setText();
        
    }

    private setElement()
    {
        this.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: this.app.graphicsDevice.width,
            height: this.app.graphicsDevice.height,
            type: pc.ELEMENTTYPE_GROUP
        });
    }

    private setBackground()
    {
        this.background = new pc.Entity('Background');
        this.background.addComponent('element',{
            type: pc.ELEMENTTYPE_IMAGE,
            anchor:[0.5,0.5,0.5,0.5],
            pivot:[0.5,0.5],
            width:this.app.graphicsDevice.width,
            height:this.app.graphicsDevice.height,
            color : new pc.Color(0,0,0),
        });
        this.addChild(this.background);
    }

    private setText()
    {
        this.text_Loading = new pc.Entity('Text');
        this.app.assets.loadFromUrl('Fonts/Cream Beige.json', 'font', (err, asset : pc.Asset | undefined) => {
            if (err) {
                console.error('Error loading font:', err);
            }
            this.text_Loading.addComponent('element',
            {
                type: pc.ELEMENTTYPE_TEXT,
                anchor : [0.5,0.5,0.5,0.5],
                pivot:[0.5,0.5],
                fontAsset : asset,
                fontSize : 42,
                color : new pc.Color(1,1,1),
                text : 'Loading...'
            });
        });
        this.addChild(this.text_Loading);
    }


    Open(): void {
        this.enabled = true;
    }

    Close(): void {
        this.enabled = false;
    }
}