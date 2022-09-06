import { useResetRecoilState } from "recoil"
import { solvedQuestions } from "@/store/solvedQuestions"
import { unSolvedQuestions } from "@/store/unSolvedQuestions"
import { userInfo } from "@/store/userInfo"

export const useInitializeRecoilState = () => {
    const resetUserState = useResetRecoilState(userInfo)
    const resetUnSolvedQuestions = useResetRecoilState(unSolvedQuestions)
    const resetSolvedQuestions = useResetRecoilState(solvedQuestions)

    return {
        resetUserState,
        resetUnSolvedQuestions,
        resetSolvedQuestions,
    }
}
