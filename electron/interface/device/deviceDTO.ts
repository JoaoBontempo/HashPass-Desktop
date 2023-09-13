export default class DeviceDTO {
    constructor(
        id : string,
        publicKey : string,
        privateKey:  string,
        ourPublicKey : string
    ) {
        this.id = id;
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.ourPublicKey = ourPublicKey;
    }

    id : string;
    publicKey : string;
    privateKey:  string;
    ourPublicKey : string;
}