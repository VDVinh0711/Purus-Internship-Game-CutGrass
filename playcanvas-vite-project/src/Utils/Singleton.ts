export class Singleton<T> {
    private static instances: Map<string, any> = new Map();

    protected constructor() {}

    static getInstance<T>(this: new () => T, context?: pc.Application): T {
        const className = this.name;
        if (!Singleton.instances.has(className)) {
            const instance = new this();
            Singleton.instances.set(className, instance);

            // If context is provided, we can hook into PlayCanvas lifecycle
            if (context) {
                context.on('update', function(dt: number) {
                    if (typeof (instance as any).update === 'function') {
                        (instance as any).update(dt);
                    }
                });
            }
        }
        return Singleton.instances.get(className);
    }

    static clearInstance<T>(this: new () => T): void {
        const className = this.name;
        Singleton.instances.delete(className);
    }
}