export type DataCallback = (data:any) => void;
export type MessageCallback = (event:string, parameters:any[]) => void;
export type EmitOptions = {
    type: string,
    to?: PeerType,
    teamId?: number,
    event: string,
    parameters?: any
};
export type TypelessEmitOptions = {
    to?: PeerType,
    teamId?: number,
    event: string,
    parameters?: any
};
export type EmitMessageOptions = {
    event: string,
    parameters?: any
};