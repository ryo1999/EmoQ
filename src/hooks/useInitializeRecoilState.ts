import { useResetRecoilState } from "recoil"
import { selectedQuestion } from "@/store/selectedQuestion"
import { solvedQuestions } from "@/store/solvedQuestions"
import { unSolvedQuestions } from "@/store/unSolvedQuestions"
import { userInfo } from "@/store/userInfo"

export const useInitializeRecoilState = () => {
    const resetUserState = useResetRecoilState(userInfo)
    const resetUnSolvedQuestions = useResetRecoilState(unSolvedQuestions)
    const resetSolvedQuestions = useResetRecoilState(solvedQuestions)
    const resetSelectedQuestion = useResetRecoilState(selectedQuestion)

    return {
        resetUserState,
        resetUnSolvedQuestions,
        resetSolvedQuestions,
        resetSelectedQuestion,
    }
}
