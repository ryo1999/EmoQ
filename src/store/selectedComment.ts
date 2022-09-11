import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"
import { CommentsCollectionData } from "@/utils/types"

const { persistAtom } = recoilPersist()

export const selectedComment = atom<CommentsCollectionData[]>({
    key: "selectedComment",
    default: [],
    effects_UNSTABLE: [persistAtom],
})
