import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"

const { persistAtom } = recoilPersist({
    key: 'recoil-persist',
    storage: typeof window === 'undefined' ? undefined : sessionStorage,
 })

export const userInfo = atom({
    key: "userInfo",
    default: { userId: "", userName: "" },
    effects_UNSTABLE: [persistAtom]
})