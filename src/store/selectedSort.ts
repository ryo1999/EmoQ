import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"
import { CommentsCollectionData } from "@/utils/types"

const { persistAtom } = recoilPersist()

export const selectedSort = atom<CommentsCollectionData[]>({
    key: "selectedSort",
    default: [],
    effects_UNSTABLE: [persistAtom],
})
