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


    public static readonly SetWaitingBlade : string = 'SetWaitingBlade';
    public static readonly UnSetWatingBlade : string = 'UnsetWaitintBlade';

}