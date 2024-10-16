export class SafeKeyEvent
{
    //Call event when restart game
    public static readonly ResetBladeManager : string = 'ResetBladeManager';
    //Call event when clear Grasses
    public static readonly ClearGrasses : string = 'ClearGrasses';
    //Call event when clear ground
    public static readonly ClearGround : string = 'ClearGround';
    //Call event set pos for blade from current map
    public static readonly SetPosBladeFromCurMap : string = 'SetPositionFromCurrentMap'
    //Call event set pos to spawm Grass from current map
    public static readonly SpawmGrassFromCurMap : string = 'SpawmGrassFromCurMap';
    //Call event set pos to spawm Ground from current map
    public static readonly SpawmGroundFromCurMap : string = 'SpawmGroundFromCurMap';
    //Call event set state waiting of blade is true
    public static readonly SetWaitingBlade : string = 'SetWaitingBlade';
    //Call event set state waiting of blade is false
    public static readonly UnSetWatingBlade : string = 'UnsetWaitintBlade';
    //call event when user click into screen
    public static readonly ClickIntoScreen : string = 'ClickIntoScreen';
    //call event when spawm Itemhelper
    public static readonly SpawmItemHelper : string  = 'SpawmItemHelper';
    //call event to clear itemshelper
    public static readonly ClearsItemsHelper : string = 'ClearItemHelper';
    // On Particles
    public static readonly PlayParticle : string = 'Playparticles';
    //Clear Particles
    public static readonly ClearParticles : string  = 'ClearParticles';
    //Call set origin posCamera when back to UI or out of game scene
    public static readonly UnsetMovingCamera : string = 'UnsetMovingCamenra';
    //Set camera in game scene
    public static readonly SetMovingCamera : string = 'SetCameraMoving';
    //Call when change Level
    public static readonly OnChangeLevel : string = "OnChangeLevel";
    //Call When Change Score
    public static readonly OnChangeScore : string = "OnChangeScore";
    //Call When Change index Map
    public static readonly OnChangeMap : string = "OnChangeMap";
    //Open UI MainMenu
    public static readonly OpenUIMainMenu : string = "OpenUIMainMenu";
    //Open UI Ingame
    public static readonly OpenUIInGame : string  = "OpenUIInGame";
    //Open Ui WinLevel
    public static readonly OpenUIWinLevel : string = "OpenUIWinlevel";
    //Close UI WinLevel
    public static readonly CloseUIWinLevel : string = "CloseUiWinLevel";
    //Open UI WIn Map
    public static readonly OpenUIWinMap : string = "OpenUIWinMap";
    //CloseUIWin Map
    public static readonly CloseUIWinMap : string = "CloseUIWinMap";
    //OpenUI LoseGame
    public static readonly OpenUILoseGame : string = "OpenUILoseGame";




}