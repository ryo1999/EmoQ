import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"

const { persistAtom } = recoilPersist({
    key: "recoil-persist",
    storage: typeof window === "undefined" ? undefined : sessionStorage,
})

export const selectedFilter = atom<{filterKind:string, filterList:string[]}>({
    key: "selectedFilter",
    default: {filterKind:"",filterList:[]},
    effects_UNSTABLE: [persistAtom],
})