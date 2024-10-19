export enum SafeKeyEvent {
    //Call event when restart game
    ResetBladeManager = 'ResetBladeManager',
    //Call event when clear Grasses
    ClearGrasses = 'ClearGrasses',
    //Call event when clear ground
    ClearGround = 'ClearGround',
    //Call event set pos for blade from current map
    SetPosBladeFromCurMap = 'SetPositionFromCurrentMap',
    //Call event set pos to spawm Grass from current map
    SpawmGrassFromCurMap = 'SpawmGrassFromCurMap',
    //Call event set pos to spawm Ground from current map
    SpawmGroundFromCurMap = 'SpawmGroundFromCurMap',
    //Call event set state waiting of blade is true
    SetWaitingBlade = 'SetWaitingBlade',
    //Call event set state waiting of blade is false
    UnSetWatingBlade = 'UnsetWaitintBlade',
    //call event when user click into screen
    ClickIntoScreen = 'ClickIntoScreen',
    //call event when spawm Itemhelper
    SpawmItemHelper = 'SpawmItemHelper',
    //call event to clear itemshelper
    ClearsItemsHelper = 'ClearItemHelper',
    // On Particles
    PlayParticle = 'Playparticles',
    //Clear Particles
    ClearParticles = 'ClearParticles',
    //Call set origin posCamera when back to UI or out of game scene
    UnsetMovingCamera = 'UnsetMovingCamenra',
    //Set camera in game scene
    SetMovingCamera = 'SetCameraMoving',
    //Call when change Level
    OnChangeLevel = 'OnChangeLevel',
    //Call When Change Score
    OnChangeScore = 'OnChangeScore',
    //Call When Change index Map
    OnChangeMap = 'OnChangeMap',
    //Open UI MainMenu
    OpenUIMainMenu = 'OpenUIMainMenu',
    //Open UI Ingame
    OpenUIInGame = 'OpenUIInGame',
    //Open Ui WinLevel
    OpenUIWinLevel = 'OpenUIWinlevel',
    //Close UI WinLevel
    CloseUIWinLevel = 'CloseUiWinLevel',
    //Open UI WIn Map
    OpenUIWinMap = 'OpenUIWinMap',
    //CloseUIWin Map
    CloseUIWinMap = 'CloseUIWinMap',
    //OpenUI LoseGame
    OpenUILoseGame = 'OpenUILoseGame',
    //OpenUI Setting 
    OpenUISetting = 'OpenUISetting',
    //Close UISetting
    CloseUISetting = 'CloseUISetting',
    //On Change TimeExpire Item
    ChangeTimeExpireItem = "ChangeTimeExpireItem",
    //Open UI Stats IN Game
    OpenUIStats = "OpenUiStats",
    //Close UI Stat IN Game
    CloseUIStats = "CloseUIStats",
    //PLayparticle Lose
    PlayParticleOutGround = "PlayParticleOutGround",
    //Playparticle WIn
    PlayParticleWIn = "PlayParticleWIn"
}