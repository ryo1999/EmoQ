import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"
import { QuestionsCollectionData } from "@/utils/types"

const { persistAtom } = recoilPersist()

export const solvedQuestions = atom<QuestionsCollectionData[]>({
    key: "solvedQuestions",
    default: [],
    effects_UNSTABLE: [persistAtom],
})
