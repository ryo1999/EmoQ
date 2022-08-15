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
        questionList.push(doc.data())
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
