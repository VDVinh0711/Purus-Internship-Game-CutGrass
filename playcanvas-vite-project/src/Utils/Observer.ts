type EventListener = (...args: any[]) => void;

interface EventMap {
    [event: string]: EventListener[];
}

export class EventManager {
    private static events: EventMap = {};
    public static on(event: string, listener: EventListener): void {
        if (!EventManager.events[event]) {
            EventManager.events[event] = [];
        }
        EventManager.events[event].push(listener);
    }

   
    public static off(event: string, listener: EventListener): void {
        if (EventManager.events[event]) {
            EventManager.events[event] = EventManager.events[event].filter(l => l !== listener);
        }
    }

    public static emit(event: string, ...args: any[]): void {
        if (EventManager.events[event]) {
            EventManager.events[event].forEach(listener => listener(...args));
        }
    }

   
    public static removeAllListeners(event: string): void {
        delete EventManager.events[event];
    }

    
}