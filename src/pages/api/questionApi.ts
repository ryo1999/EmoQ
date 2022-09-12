import { db } from "@/firebase"
import { collection, getDocs, query, addDoc, orderBy, updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore/lite"
import { QuestionsCollectionData } from "@/utils/types"

//質問全部を取ってくる
export const getQuestion = async () => {
    const questionList: QuestionsCollectionData[][] = [[], []]
    const questionId = query(collection(db, "questions"), orderBy("time", "desc"))
    const questionDoc = await getDocs(questionId)
    questionDoc.forEach((doc) => {
        if (doc.data().solution === false) {
            const questionField = {
                contributor_id: doc.data().contributor_id,
                contributor_name: doc.data().contributor_name,
                question_id: doc.id,
                question: doc.data().question,
                tag: doc.data().tag,
                time: doc.data().time.toDate(),
                emotion: doc.data().emotion,
                parameter: doc.data().parameter,
                solution: doc.data().solution,
                bookmark_user_id: doc.data().bookmark_user_id,
                replied_user_id: doc.data().replied_user_id,
            }
            questionList[0].push(questionField)
        } else {
            const questionField = {
                contributor_id: doc.data().contributor_id,
                contributor_name: doc.data().contributor_name,
                question_id: doc.id,
                question: doc.data().question,
                tag: doc.data().tag,
                time: doc.data().time.toDate(),
                emotion: doc.data().emotion,
                parameter: doc.data().parameter,
                solution: doc.data().solution,
                bookmark_user_id: doc.data().bookmark_user_id,
                replied_user_id: doc.data().replied_user_id,
            }
            questionList[1].push(questionField)
        }
    })
    return questionList
}

//質問を投稿した時
export const addQuestion = async (
    contributor_id: string,
    contributor_name: string,
    question: string,
    tag: string[],
    time: Date,
    emotion: string,
    parameter: string | number | number[],
    solution: boolean
) => {
    await addDoc(collection(db, "questions"), {
        contributor_id: contributor_id,
        contributor_name: contributor_name,
        question: question,
        tag: tag,
        time: time,
        emotion: emotion,
        parameter: parameter,
        solution: solution,
        bookmark_user_id: [],
        replied_user_id: [],
    })
}

//questionコレクションから自分の投稿したものだけを取得する
export const getMyQuestion = async (uid: string) => {
    const myQuestionList: QuestionsCollectionData[][] = [[], []]
    const questionId = query(collection(db, "questions"), orderBy("time", "desc"))
    const questionDoc = await getDocs(questionId)
    questionDoc.forEach((doc) => {
        if (doc.data().contributor_id === uid) {
            if (doc.data().solution === false) {
                const questionField = {
                    contributor_id: doc.data().contributor_id,
                    contributor_name: doc.data().contributor_name,
                    question_id: doc.id,
                    question: doc.data().question,
                    tag: doc.data().tag,
                    time: doc.data().time.toDate(),
                    emotion: doc.data().emotion,
                    parameter: doc.data().parameter,
                    solution: doc.data().solution,
                    bookmark_user_id: doc.data().bookmark_user_id,
                    replied_user_id: doc.data().replied_user_id,
                }
                myQuestionList[0].push(questionField)
            } else {
                const questionField = {
                    contributor_id: doc.data().contributor_id,
                    contributor_name: doc.data().contributor_name,
                    question_id: doc.id,
                    question: doc.data().question,
                    tag: doc.data().tag,
                    time: doc.data().time.toDate(),
                    emotion: doc.data().emotion,
                    parameter: doc.data().parameter,
                    solution: doc.data().solution,
                    bookmark_user_id: doc.data().bookmark_user_id,
                    replied_user_id: doc.data().replied_user_id,
                }
                myQuestionList[1].push(questionField)
            }
        }
    })
    return myQuestionList
}

//解決された質問idのsolutionをtrueにしたり、未解決に戻された質問をfalseにしたりする
export const upDateQuestionSolution = async (question_id: string, solution: boolean) => {
    await updateDoc(doc(db, "questions", question_id), {
        solution: solution,
    })
}

//ブックマークされた質問のbookmark_user_idにブックマークした人のuidを追加する
export const upDateQuestionBookmark = async (question_id: string, bookmark_user_id: string[], uid: string) => {
    await updateDoc(doc(db, "questions", question_id), {
        bookmark_user_id: [...bookmark_user_id, uid],
    })
}

//ブックマークが解除された時に質問のbookmark_user_idからその人のuidを削除
export const deleteQuestionBookmark = async (question_id: string, bookmark_user_id: string[], uid: string) => {
    const users = bookmark_user_id.filter((users) => users.match(uid) == null)
    await updateDoc(doc(db, "questions", question_id), {
        bookmark_user_id: users,
    })
}

//質問を削除した時、questionsコレクションから削除
export const deleteQuestion = async (question_id: string) => {
    await deleteDoc(doc(db, "questions", question_id))
}

//指定された質問だけとってくる
export const getSelectQuestion = async (question_id: string | string[] | undefined) => {
    if (typeof question_id === "string") {
        const docRef = doc(db, "questions", question_id)
        const docSnap = await getDoc(docRef)
        const selectedQuestion = {
            contributor_id: docSnap.data()?.contributor_id,
            contributor_name: docSnap.data()?.contributor_name,
            question_id: question_id,
            question: docSnap.data()?.question,
            tag: docSnap.data()?.tag,
            time: docSnap.data()?.time.toDate(),
            emotion: docSnap.data()?.emotion,
            parameter: docSnap.data()?.parameter,
            solution: docSnap.data()?.solution,
            bookmark_user_id: docSnap.data()?.bookmark_user_id,
            replied_user_id: docSnap.data()?.replied_user_id,
        }
        return selectedQuestion
    }
}
