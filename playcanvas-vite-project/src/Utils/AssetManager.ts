import * as pc from 'playcanvas'

export class AssetManager {
    private static instance: AssetManager;
    private holderAsset: Map<string, pc.Asset> = new Map<string, pc.Asset>();
    private eventHandler: pc.EventHandler;

    private constructor() {
        this.eventHandler = new pc.EventHandler();
    }

    public static getInstance() {
        if (AssetManager.instance == null) {
            AssetManager.instance = new AssetManager();
        }
        return AssetManager.instance;
    }

    public getAsset(keyAsset: string): pc.Asset | undefined {
        return this.holderAsset.get(keyAsset);
    }

    public LoadAsset(app: pc.Application): void {
        const listAsset = {
            fontArial: new pc.Asset('font', 'font', { url: '../../Asset/Fonts/arial.json' }),
            modelBlade: new pc.Asset("modelBlade", "model", { url: "../../Asset/Models/Sword2.glb" }),
            modelGrass: new pc.Asset("modelGrass", "model", { url: "../../Asset/Models/Grass5.glb" }),
            modelFlower: new pc.Asset("modelFlower", "model", { url: "../../Asset/Models/Flower2.glb" }),
            textureBlade: new pc.Asset("textureBlade", "texture", { url: "../../Asset/Texure/Albedo Sword 2.png" })
        };

        const AssetLoader = new pc.AssetListLoader(Object.values(listAsset), app.assets);
        
        AssetLoader.load(() => {
            for (const [key, value] of Object.entries(listAsset)) {
                this.holderAsset.set(key, value);
            }
            this.eventHandler.fire('assetsLoaded');
        });
    }

    public on(eventName: string, callback: (...args: any[]) => void, scope?: any) {
        this.eventHandler.on(eventName, callback, scope);
    }
}