export interface GeneralSocket {
    emit(eventName:string, data: any);
    on(eventName: string, callback: Function);
}
