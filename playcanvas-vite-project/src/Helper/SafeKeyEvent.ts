export enum SafeKeyEvent {



    //==========SET UP ====================
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
    SetPauseBlade = 'SetPauseBlade',
    //Call event set state waiting of blade is false
    UnSetPauseBlade = 'UnsetPauseBlade',
    //call event when user click into screen
    ClickIntoScreen = 'ClickIntoScreen',
    //call event when spawm Itemhelper
    SpawmItemHelper = 'SpawmItemHelper',
    //call event to clear itemshelper
    ClearsItemsHelper = 'ClearItemHelper',
    //Set camera in game scene
    SetCameraInGame = 'SetCameraInGame',
    //Call set origin posCamera when back to UI or out of game scene
    SetCameraOutGame = 'SetCameraOutGame',


    //===============Some Event Change Value ======================
    //Call when change Level
    OnChangeLevel = 'OnChangeLevel',
    //Call When Change Score
    OnChangeScore = 'OnChangeScore',
    //On Change TimeExpire Item
    ChangeTimeExpireItem = "ChangeTimeExpireItem",
    //Call When Change index Map
    OnChangeMap = 'OnChangeMap',


    //================UI=======================
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
    //Open UI Stats IN Game
    OpenUIStats = "OpenUiStats",
    //Close UI Stat IN Game
    CloseUIStats = "CloseUIStats",
    //Open UI Dimond Reward
    OpenUiDimondReward = "OpenUiDimondReward",
    //OpenUIPauseGame
    OPenUIPauseGame = "OpenUIPauseGame",

    //================Particle==================
    //PLayparticle Lose
    PlayParticleOutGround = "PlayParticleOutGround",
    //Playparticle WIn
    PlayParticleWIn = "PlayParticleWIn",
   
    //Spawm SCoreUI
    SpawmScoreUI = "SpawmScoreUI",
    //PLayparticle Cute the Item
    PlayParticleCutItem = "PlayParticleCutItem",
     // On Particles
     PlayParticle = 'Playparticles',
     //Clear Particles
     ClearParticles = 'ClearParticles',

    //===============SOUND====================
    //PLaySoundSFX TOUCH
    PlaySoundSFXTouch  = "PlaySoundSFXTouch",
    //PLaySoundSFX BTN
    PlaySoundSFXBTN = "PlaySoundSFXBTN",
    //Togle Sound BG
    OnTogleSoundBG = "OnTogleSoundBG",
    //Togle Sound SFX
    OnTogleSoundSFX = "OnTogleSoundSFX",
    //ChangeVolume Sound BG
    OnChangeVolumeSoundBG = "OnChangeVolumeSoundBG",
    //ChangeVolume SFX
    OnChangeVolumeSoundSFX = "OnChangeVolumeSoundSFX",
    //Play SFX CUt item
    PlaySoundSFXCutItem = "PlaySoundSFXCutItem",
    //Play SFX Wood Break
    PlaySoundSFXWoodBreak = "PlaySoundSFXWoodBreak",
    //Play SFX Win Level
    PlaySoundSFXWinLevel = "PlaySoundSFXWinLevel",
    //Play SFX Lose Game
    PLaySoundSFXLoseGame = "PLaySoundSFXLoseGame",
    //PlaySFX Win Map
    PlaySoundSFXWinMap = "PlaySoundSFXWinMap",

    



}