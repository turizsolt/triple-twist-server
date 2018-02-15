declare const enum PeerType {
    Server = 0,
    Master = 1,
    Team = 2,
    Screen = 3,
    All = 4
}

declare const enum State {
    Initialisation = 0,
    Welcome = 1,
    CountingBack = 2,
    Category = 3,
    MainTitle = 10,
    MainTeam = 11,
    MainMaster = 12,
    MainRules = 13,
    GameName = 20,
    GameRules = 21,
    GameStatistics = 22,
    GamePicker = 25,
    GamePicked = 26,
    Game = 30,
    GameResults = 40,
    GameFeedback = 41,
    Idle = 50,
    CoffeeBreak = 51,
    JustAClock = 52,
    Screw = 60,
    Challenge = 65,
    Information = 70
}

declare const enum CardType{
    Joker = 0,
    HalfPoint = 1,
    ExtraTime = 2,
    DoubleChance = 3,
    SkipIt = 4,
    Advance = 5,
    Assist = 6,
    Freezer = 7,
    RoleCast = 8,
    CocoaSnail = 9,
    SwapBug = 10,
    IamRight = 11,
    Boooring = 12
}

declare const enum CardUsed{
    Avaiable = 0,
    Picked = 1,
    Used = 2
}

declare const enum CardProcessResult{
    NotDetermined = -1,
    Accepted = 0,
    FreezerHasBeenPlayed = 11,
    ThereWereAFasterFreezer = 12,
    OnlyOneJokerAndHalfPoint = 21,
    OnlyOneOfTheSameType = 31,
    OnlyOneAtAllTeams = 41,
    OnlyThreePerTeam = 51,
    UseOnlyInGame = 61
}



/* [TODO] how?
declare class MessageType {
    InState: 'inState',
    MoveState: 'moveState',
    Login: 'login',
    Loggedin: 'loggedin',
    Ping: 'ping',
    Command: 'command',
    State: 'state'
}*/

