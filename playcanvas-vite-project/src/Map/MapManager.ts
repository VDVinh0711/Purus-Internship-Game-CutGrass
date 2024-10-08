import * as pc from 'playcanvas'


export class MapManager extends pc.Entity
{
    

    private width : number = 10;
    private height :number = 10 ;
    private space  :number = 1;
    private grounds : pc.Entity[] = [];
    constructor(private app : pc.Application)
    {
      super();
    }


    

    private createGridMap()
    {
        for(let i = -10 ;i<= this.width;i+=this.space)
        {
            this.app.drawLine(new pc.Vec3(i,1,-10), new pc.Vec3(i,0,this.height) , new pc.Color(1,1,0) );
        }

        for(let i = -10 ;i< this.height;i+=this.space)
        {
            this.app.drawLine(new pc.Vec3(-10,1,i), new pc.Vec3(this.width,1,i) , new pc.Color(1,0,0) );
        }
    }



    public Spawmmap(listPosSpawm : pc.Vec3[])
    {
         listPosSpawm.forEach(posSpawm => {

            //material 
            const material = new pc.StandardMaterial();

            // Customize the material properties
            material.diffuse = new pc.Color(0.82, 0.71, 0.55); // Red color
            material.metalness = 0.7;
            material.update();
            //create Ground
            const newGround = new pc.Entity('ground');
            newGround.addComponent('render',{
                type:'box',
                material:material,
            })

            newGround.setPosition(posSpawm);

            this.root.addChild(newGround);
         });   

    }

    update(dt:number)
    {
     // this.createGridMap();
    }
}