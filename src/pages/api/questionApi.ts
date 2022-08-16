import { db } from "@/firebase"
import {
    collection,
    doc,
    getDocs,
    setDoc,
    query,
    addDoc,
    updateDoc,
    deleteDoc,
    deleteField,
} from "firebase/firestore/lite"
import { QuestionsCollectionData } from "@/utils/types"

//質問全部を取ってくる
export const getQuestion = async () => {
    const questionList: QuestionsCollectionData[] = []
    const questionId = query(collection(db, "questions"))
    const questionDoc = await getDocs(questionId)
    questionDoc.forEach((doc) => {
        const questionField = {
            contributor_id:doc.data().contributor_id,
            contributor_name:doc.data().contributor_name,
            question_id:doc.id,
            question:doc.data().question,
            tag:doc.data().tag,
            time:doc.data().time,
            emotion:doc.data().emotion,
            parameter:doc.data().parameter
        }
        questionList.push(questionField)
    })
    return questionList
}

//質問を投稿した時
// export const addQuestion = async (id,name,question,tag,time,emotion,parameter) => {
//     await addDoc(collection(db,"questions"),{
//         contributor_id: id,
//         contributor_name: name,
//         question: question,
//         tag: tag,
//         time: time,
//         emotion: emotion,
//         parameter: parameter,
//     })
// }
