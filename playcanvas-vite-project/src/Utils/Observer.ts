class EventManager 
{
   private static instance : EventManager;
   public static getInstance()
   {
        if(this.instance == null)
        {
            this.instance = new EventManager();
        }
        return this.instance;
   }


   


   public RegisterEvent(key:string , event : any)
   {

   }

   public RemoveEventt(key:string)
   {

   }
}