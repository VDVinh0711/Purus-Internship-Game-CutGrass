import * as pc from 'playcanvas';
import { UiItemInShop } from './UIItemInShop/UIItemInShop';
import { IUIController } from '../IUiController';

export class UIShopdsdsd extends pc.Entity implements IUIController {

    private verticleSCrollbar !: pc.Entity;
    private handelScrollbar !: pc.Entity;
    private viewPort !: pc.Entity;
    private contents !: pc.Entity;
    private background !: pc.Entity;

    constructor() {
        super();
        this.setUpBegin();
    }

    private setUpBegin() {
        this.setUpElement();
        //   this.setBackground();
        this.setUpViewPort();
        this.setUpverticleScrollBar();
        this.setUpScrollView();
        this.test();
    }



    private test() {

        for (let i = 0; i < 6; i++) {
            const newItem = new UiItemInShop();
            this.contents.addChild(newItem);
        }

    }

    private setUpElement() {
        this.addComponent('element', {
            type: pc.ELEMENTTYPE_GROUP,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: 400,
            height: 400,
            useInput: true,
            mask: true
        });
    }



    private setBackground() {
        this.background = new pc.Entity("backGround");
        this.addChild(this.background);
        this.background.addComponent('element', {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0, 5],
            width: 400,
            height: 400,
            color: new pc.Color(0.5, 0.5, 0.5),
        });
        this.background.setLocalPosition(0, 0, 0);
    }

    private setUpScrollView() {
        this.addComponent('scrollview', {
            scrollMode: pc.SCROLL_MODE_CLAMP,  // Thay đổi scroll mode
            friction: 0.05,
            useMouseWheel: true,
            mouseWheelSensitivity: [0, 1],  // Chỉ cho phép scroll theo chiều dọc
            viewportEntity: this.viewPort,
            contentEntity: this.contents,
            vertical: true,
            verticalScrollbarEntity: this.verticleSCrollbar,  // Bỏ comment dòng này
            verticalScrollbarVisibility: pc.SCROLLBAR_VISIBILITY_SHOW_ALWAYS  // Luôn hiển thị scrollbar
        });

        if (this.verticleSCrollbar.scrollbar == null) return;
        this.verticleSCrollbar!.scrollbar.on('scroll', (value) => {
            if (this.contents.element != null && this.viewPort.element != null) {
                const scrollHeight = this.contents.element.height - this.viewPort.element.height;
                const scrollPosition = value * scrollHeight;
                this.contents.setLocalPosition(0, -scrollPosition, 0);
            }

        });
    }


    private setUpverticleScrollBar() {
        this.verticleSCrollbar = new pc.Entity("verticleScrollBar");
        this.addChild(this.verticleSCrollbar);
        this.verticleSCrollbar.addComponent('element', {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [1, 1, 1, 1],
            pivot: [1, 1],
            width: 20,
            height: 400,
            color: new pc.Color(1, 1, 1),
            fitMode: pc.FITMODE_STRETCH
        });


        this.handelScrollbar = new pc.Entity('handle');
        this.verticleSCrollbar.addChild(this.handelScrollbar);
        this.handelScrollbar.addComponent('element', {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [0.5, 1, 0.5, 1],
            pivot: [0.5, 1],
            width: 20,
            height: 250,
            color: new pc.Color(0.7, 0.7, 0.7),
            useInput: true,
        })

        this.handelScrollbar.addComponent('button');



        this.verticleSCrollbar.addComponent('scrollbar', {
            orientation: pc.ORIENTATION_VERTICAL,
            value: 0,
            handleEntity: this.handelScrollbar,
            handleSize: 0.5
        })
    }


    private setUpViewPort() {
        this.viewPort = new pc.Entity('viewport');
        this.addChild(this.viewPort);
        this.viewPort.addComponent('element', {
            type: pc.ELEMENTTYPE_GROUP,
            anchor: [0, 0, 1, 1],
            pivot: [0, 1],
            useInput: true,
            margin: new pc.Vec4(0, 0, 20, 0),
            mask: true  // Thêm mask cho viewport
        });

        this.setUpContent();
    }


    private setUpContent() {
        this.contents = new pc.Entity('content');
        this.viewPort.addChild(this.contents);
        this.contents.addComponent('element', {
            type: pc.ELEMENTTYPE_GROUP,
            anchor: [0, 0, 1, 0],  // Thay đổi anchor
            pivot: [0, 1],
            width: 380,
            height: 1000,  // Tăng height để chứa content
            useInput: true
        });

        this.contents.addComponent('layoutgroup', {
            orientation: pc.ORIENTATION_HORIZONTAL,
            reverseY: true,
            alignment: [0.5, 1],
            padding: [10, 10, 10, 10],
            spacing: new pc.Vec2(10, 10),
            wrap: true,
            widthFitting: pc.FITTING_SHRINK,
            heightFitting: pc.FITTING_NONE  // Thay đổi heightFitting
        });
    }
    Open(): void {
        this.enabled = true;
        console.log("Open UI Shop");
    }
    Close(): void {
        this.enabled = false;
    }
}