import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const adminAuthState = atom({
    key: "adminAuthState",
    default: {
        isAuthenticated: false,
        user:null
    },
    effects_UNSTABLE: [persistAtom],
});