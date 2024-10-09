// export abstract class Singleton<T> {
//     private static _instance: T;
  
//     protected constructor() {}
  
//     public static getInstance<T>(): T {
//       if (!this._instance) {
//         this._instance = new this() as T;
//       }
//       return this._instance;
//     }
//   }