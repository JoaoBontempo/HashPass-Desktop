export default class DeviceDTO {
    constructor(
        id : string,
        publicKey : string,
        privateKey:  string,
        ourPublicKey : string,
        guid : string
    ) {
        this.id = id;
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.ourPublicKey = ourPublicKey;
        this.guid = guid;
    }

    id : string;
    publicKey : string;
    privateKey:  string;
    ourPublicKey : string;
    guid : string;

}