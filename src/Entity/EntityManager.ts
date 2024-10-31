// EntityManager.ts
 export default class EntityManager {
    private static instance: EntityManager;
    private entities: Map<string, pc.Entity> = new Map();

    private constructor() {}

    public static getInstance(): EntityManager {
        if (!EntityManager.instance) {
            EntityManager.instance = new EntityManager();
        }
        return EntityManager.instance;
    }

    public registerEntity(name: string, entity: pc.Entity) {
        this.entities.set(name, entity);
    }

    public getEntity(name: string): pc.Entity | undefined {
        return this.entities.get(name);
    }
}
