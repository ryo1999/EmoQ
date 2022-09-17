import { useResetRecoilState } from "recoil"
import { selectedQuestion } from "@/store/selectedQuestion"
import { solvedQuestions } from "@/store/solvedQuestions"
import { unSolvedQuestions } from "@/store/unSolvedQuestions"
import { userInfo } from "@/store/userInfo"
import { selectedSort } from "@/store/selectedSort"
import { selectedFilter } from "@/store/selectedFilter"

export const useInitializeRecoilState = () => {
    const resetUserState = useResetRecoilState(userInfo)
    const resetUnSolvedQuestions = useResetRecoilState(unSolvedQuestions)
    const resetSolvedQuestions = useResetRecoilState(solvedQuestions)
    const resetSelectedQuestion = useResetRecoilState(selectedQuestion)
    const resetSelectedSort = useResetRecoilState(selectedSort)
    const resetSelectedFilter = useResetRecoilState(selectedFilter)

    return {
        resetUserState,
        resetUnSolvedQuestions,
        resetSolvedQuestions,
        resetSelectedQuestion,
        resetSelectedSort,
        resetSelectedFilter,
    }
}
