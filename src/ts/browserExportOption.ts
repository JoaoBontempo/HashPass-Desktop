export enum BrowserExportOption {
    NONE = '',
    SAFARI = 'safari',
    FIREFOX = 'firefox',
    CHROME = 'chrome',
    EDGE = 'edge'
}

export class BrowserPasswordFile {
    constructor(name: string, password: string, username: string){
        this.name = name;
        this.password = password;
        this.username = username;
    }

    name : string;
    password: string;
    username: string;
}