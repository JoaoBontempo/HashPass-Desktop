export default class DeviceDTO {
    constructor(
        id : string,
        publicKey : string | Buffer,
        privateKey:  string | Buffer,
        ourPublicKey : string | Buffer
    ) {
        this.id = id;
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.ourPublicKey = ourPublicKey;
    }

    id : string;
    publicKey : string | Buffer;
    privateKey:  string | Buffer;
    ourPublicKey : string | Buffer;
}