import SessionData from "./interface/session/sessionData";
import { SessionKeys } from "./interface/session/sessionKeys";

var session : SessionData | null

function startSession() {
    session = { } as SessionData;
}

function getSession() : SessionData {
    if (session == null){
        startSession()
    }

    return session!;
}

export function set<T>(key : SessionKeys, data : T) {
    getSession()[key] = data;
}

export function get<T>(key : SessionKeys) {
    return getSession()[key] as T;
}
    