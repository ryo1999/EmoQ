import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"
import { QuestionsCollectionData } from "@/utils/types"

const { persistAtom } = recoilPersist()

export const selectedQuestion = atom<QuestionsCollectionData>({
    key: "selectedQuestion",
    default: undefined,
    effects_UNSTABLE: [persistAtom],
})
