import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"
import { QuestionsCollectionData } from "@/utils/types"

const { persistAtom } = recoilPersist()

export const unSolvedQuestions = atom<QuestionsCollectionData[]>({
    key: "unSolvedQuestions",
    default: [],
    effects_UNSTABLE: [persistAtom],
})
