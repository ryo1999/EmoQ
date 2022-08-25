import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"
import { QuestionsCollectionData } from "@/utils/types"

const { persistAtom } = recoilPersist({
    key: "recoil-persist",
    storage: typeof window === "undefined" ? undefined : sessionStorage,
})

export const solvedQuestions = atom<QuestionsCollectionData[]>({
    key: "solvedQuestions",
    default: [
        {
            contributor_id: "",
            contributor_name: "",
            question_id: "",
            question: "",
            tag: [],
            time: new Date(),
            emotion: "焦り",
            parameter: 0,
            solution: true,
            bookmark_user_id: [],
            replied_user_id: [],
        },
    ],
    effects_UNSTABLE: [persistAtom],
})