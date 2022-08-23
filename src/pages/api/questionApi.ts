import { db } from "@/firebase"
import {
    collection,
    getDocs,
    query,
    addDoc,
    orderBy
} from "firebase/firestore/lite"
import { QuestionsCollectionData } from "@/utils/types"

//質問全部を取ってくる
export const getQuestion = async () => {
    const questionList: QuestionsCollectionData[] = []
    const questionId = query(collection(db, "questions"),orderBy("time","desc"))
    const questionDoc = await getDocs(questionId)
    questionDoc.forEach((doc) => {
        const questionField = {
            contributor_id:doc.data().contributor_id,
            contributor_name:doc.data().contributor_name,
            question_id:doc.id,
            question:doc.data().question,
            tag:doc.data().tag,
            time:doc.data().time.toDate(),
            emotion:doc.data().emotion,
            parameter:doc.data().parameter
        }
        questionList.push(questionField)
    })
    return questionList
}

//質問を投稿した時
export const addQuestion = async (contributor_id:string,contributor_name:string,question:string,tag:string[],time:Date,emotion:string,parameter?:string | number | number[]) => {
    await addDoc(collection(db,"questions"),{
        contributor_id: contributor_id,
        contributor_name: contributor_name,
        question: question,
        tag: tag,
        time: time,
        emotion: emotion,
        parameter: parameter,
    })
}
//questionコレクションから自分の投稿したものだけを取得する
export const getMyQuestion = async(uid:string)=>{
    const myQuestionList:QuestionsCollectionData[] = []
    const questionId = query(collection(db, "questions"),orderBy("time","desc"))
    const questionDoc = await getDocs(questionId)
    questionDoc.forEach((doc) => {
        if (doc.data().contributor_id === uid){
        const questionField = {
            contributor_id:doc.data().contributor_id,
            contributor_name:doc.data().contributor_name,
            question_id:doc.id,
            question:doc.data().question,
            tag:doc.data().tag,
            time:doc.data().time.toDate(),
            emotion:doc.data().emotion,
            parameter:doc.data().parameter
        }
        myQuestionList.push(questionField)
    }
    })
    return myQuestionList
}