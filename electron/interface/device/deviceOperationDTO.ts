import { DeviceOperation } from "./deviceOperation";

export default interface DeviceOperationDTO<DataType> {
    message : string;
    success : boolean;
    data : DataType;
    operation : DeviceOperation
}