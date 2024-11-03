import { SafeKeyAsset } from '../../Helper/SafeKeyAsset';
import { BaseTurtorial } from './BaseTurtorial';
export class TurPowerUp extends BaseTurtorial
{
 
    constructor()
    {
        super(SafeKeyAsset.IMGTurPowerUp,
            "This isn’t just any flower—it’s a turbo-charged herb! Chop it, and you'll score double points, plus your blade gets super-sized and spins like a whirlwind. Go on, give it a slice!"
        )
    }
   
    // private width : number = 600;
    // private height : number = 700; 
    // private groupTop !: pc.Entity;
    // private groupBottom !: pc.Entity;
    // private imgTur !: pc.Entity;
    // private txtGuid !: pc.Entity;

    // private padding : number = 60;
    // private fontSize : number = 30;
    // private background !: pc.Entity;

    // private btnAccept !: pc.Entity;
    // constructor()
    // {
    //     super();
    //     this.setUpBegin();
    // }



    // private setUpBegin()
    // {
    //     this.setUpResize();
    //     this.setElement();
    //     this.setBackground();
    //     this.setUpGroupBottom();
    //     this.setUpGroupTop();
    //     this.setImg();
    //     this.setTxtGuid();
    //     this.setBtnAccept();
    // }

    // private setElement()
    // {
    //     this.addComponent('element',{
    //         anchor : [0.5,0.5,0.5,0.5],
    //         pivot : [0.5,0.5],
    //         width : this.width,
    //         height : this.height,
    //         type : pc.ELEMENTTYPE_GROUP,
    //     });
    // }


    // private setUpGroupTop()
    // {
    //     this.groupTop = new pc.Entity("Group Top");
    //     this.addChild(this.groupTop);
    //     this.groupTop.addComponent('element',{
    //         anchor : [0.5,1,0.5,1],
    //         pivot : [0.5,1],
    //         width : this.width,
    //         height : this.height/2,
    //         type : pc.ELEMENTTYPE_GROUP,
    //     });
    // }


    // private setUpGroupBottom()
    // {
    //     this.groupBottom = new pc.Entity("Group Top");
    //     this.addChild(this.groupBottom);
    //     this.groupBottom.addComponent('element',{
    //         type : pc.ELEMENTTYPE_GROUP,
    //         anchor : [0.5,0,0.5,0],
    //         pivot : [0.5,0],
    //         width : this.width,
    //         height : this.height/2
    //     });
    // }


    // private setBackground()
    // {
    //     this.background = new pc.Entity('background');
    //     this.addChild(this.background);
    //     this.background.addComponent('element',{
    //         type : pc.ELEMENTTYPE_IMAGE,
    //         anchor : [0.5,0.5,0.5,0.5],
    //         pivot : [0.5,0.5],
    //         width : this.width,
    //         height : this.height,
    //         color : new pc.Color(1,1,1),
    //         textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGBackGroundPaper),
    //     });
    // }


    // private setImg()
    // {
    //     this.imgTur = new pc.Entity("IMG TUR");
    //     this.groupTop.addChild(this.imgTur);
    //     this.imgTur.addComponent('element',{
    //         type : pc.ELEMENTTYPE_IMAGE,
    //         anchor : [0.5,0.5,0.5,0.5],
    //         pivot : [0.5,0.5],
    //         width : this.width-this.padding,
    //         height : this.width/2-this.padding,
    //         color : new pc.Color(1,1,1),
    //         textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGTurPowerUp),
    //     })
    // }

    // private setTxtGuid()
    // {
    //     this.txtGuid = new pc.Entity("TXT GUID");
    //     this.groupBottom.addChild(this.txtGuid);
    //     this.txtGuid.addComponent('element',{
    //         type : pc.ELEMENTTYPE_TEXT,
    //         anchor : [0.5,1,0.5,1],
    //         pivot : [0.5,1],
    //         fontSize : this.fontSize,
    //         width : this.width -this.padding,
    //         height : this.height/2 -this.padding,
    //         autoWidth: false,
    //         autoHeight : false,
    //         wrapLines : true,
    //         alignment : new pc.Vec2(0.5,0.8),
    //         fontAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.FontCreanBeige),
    //         outlineColor: new pc.Color(0,0,0) ,
    //         outlineThickness : 0.5,
    //         color : new pc.Color(1,1,1),
    //         text : "This isn’t just any flower—it’s a turbo-charged herb! Chop it, and you'll score double points, plus your blade gets super-sized and spins like a whirlwind. Go on, give it a slice!"
    //     });
    // }


    // private setBtnAccept()
    // {
    //     this.btnAccept = new pc.Entity("Btn Accept");
    //     this.addChild(this.btnAccept);
    //     this.btnAccept.addComponent('button');
    //     this.btnAccept.addComponent('element',{
    //         type : pc.ELEMENTTYPE_IMAGE,
    //         anchor : [0.5,0,0.5,0],
    //         pivot : [0.5,0],
    //         width : 50,
    //         height : 50,
    //         useInput : true,
    //         color : new pc.Color(1,1,1),
    //         textureAsset: AssetManager.getInstance().getAsset(SafeKeyAsset.IMGButtonOK),
    //     });


    //     if(this.btnAccept.button == null) return;
    //     this.btnAccept.button.on('click', () => {
    //         this.Close();
    //     });
    // }


    // public Open()
    // {
    //     this.enabled = true;
    //     EventManager.emit(SafeKeyEvent.SetPauseBlade);
    // }

    // public Close()
    // {
    //   this.enabled = false;
    //   EventManager.emit(SafeKeyEvent.UnSetPauseBlade);
    // }


    // private setUpResize() {
       
    //     const minScale = 0.5;
    //     const maxScale = 1;
    //     const screenWidth = window.innerWidth;
    //     const screenHeight = window.innerHeight;

    //     const scaleX = screenWidth / 1920;
    //     const scaleY = screenHeight / 1080;
       
    //     const scale = Math.min(scaleX, scaleY);
        
    //     const finalScale = Math.max(minScale, Math.min(maxScale, scale));

    //     this.width *= finalScale;
    //     this.height *= finalScale;
    //     this.padding *= finalScale;
    //     this.fontSize *= finalScale;

    // }

    
}