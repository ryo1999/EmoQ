import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"

const { persistAtom } = recoilPersist()

export const userInfo = atom<{userId:string,userName:string}>({
    key: "userInfo",
    default: { userId: "", userName: "" },
    effects_UNSTABLE: [persistAtom],
})
