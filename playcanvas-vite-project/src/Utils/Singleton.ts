export class Singleton<T> {
    private static _instance: Map<string, any> = new Map<string, any>();

    constructor() {
        const className = this.constructor.name;
        if (Singleton._instance.has(className)) {
            return Singleton._instance.get(className);
        }
        Singleton._instance.set(className, this);
    }

    public static getInstance<T extends Singleton<T>>(this: new () => T): T {
        const className = this.name;
        if (!Singleton._instance.has(className)) {
            new this();
        }
        return Singleton._instance.get(className);
    }
}