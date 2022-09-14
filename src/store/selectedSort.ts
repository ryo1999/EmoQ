import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"

const { persistAtom } = recoilPersist({
    key: "recoil-persist",
    storage: typeof window === "undefined" ? undefined : sessionStorage,
})

export const selectedSort = atom<string>({
    key: "selectedSort",
    default: undefined,
    effects_UNSTABLE: [persistAtom],
})
