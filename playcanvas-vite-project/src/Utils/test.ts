import { Singleton } from "./Singleton";

export class test extends Singleton<test>
{
    public logSomething()
    {
        console.log("Lagger dep trai");
    }
}