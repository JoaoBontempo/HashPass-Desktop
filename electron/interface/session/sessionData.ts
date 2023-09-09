import { HashPassSocket } from "../../server/socket";
import DeviceDTO from "../device/deviceDTO";


export default interface SessionData {
    device : DeviceDTO | any,
    websocket : HashPassSocket | any
}