import * as fs from "fs";
import * as Path from "path";

export default class Logger {
    private static _instance: Logger = null;
    private static _messageLog: string = Path.normalize(__dirname+'/../../../log/log.json'); // TODO config
    private static _messageDir: string = Path.normalize(__dirname+'/../../../log'); // TODO config
    //private static _databaseLog: string = '../log/database.json';

    private constructor() {
        if (Logger._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        Logger._instance = this;
    }

    public static getInstance(): Logger {
        if (Logger._instance === null) {
            Logger._instance = new Logger();
        }
        return Logger._instance;
    }

    public logMessage(eventType: string, message: any, destination: PeerType, team: number=-1) {
        this.logToFile(Logger._messageLog,{
            timestamp: Date.now(),
            event: eventType,
            destination: destination,
            team: team,
            message: message
        });
    }

    /*public logDatabase(database: any) {
        return;
        console.log("DB", database);
        this.logToFile(Logger._databaseLog, {
            timestamp: Date.now(),
            data: database
        });
    }*/

    private logToFile(path: string, what: any) {
        if(!fs.existsSync(Logger._messageDir)){
            fs.mkdirSync(Logger._messageDir);
        }
        if(!fs.existsSync(path)) {
            fs.closeSync(fs.openSync(path, 'w'));
            fs.appendFileSync(path, "[\r\n");
        }
        fs.appendFileSync(path, JSON.stringify(what, null, "\t") + ",\r\n");
    }
}
