import { db } from "@/firebase"
import { QuestionsCollectionData } from "@/utils/types"
import { collection, addDoc, deleteDoc, doc, query, getDocs } from "firebase/firestore/lite"

//ブックマークされた時ブックマークのデータベースに追加
export const addBookMark = async (
    user_id: string,
    contributor_id: string,
    contributor_name: string,
    question_id:string,
    question: string,
    tag: string[],
    time: Date,
    emotion: string,
    parameter: string | number | number[],
    solution: boolean
) => {
    await addDoc(collection(db, "users", user_id, "bookmarks"), {
        contributor_id: contributor_id,
        contributor_name: contributor_name,
        question_id: question_id,
        question: question,
        tag: tag,
        time: time,
        emotion: emotion,
        parameter: parameter,
        solution: solution,
    })
}

//ブックマークを外された時、bookmarksコレクションのデータベースから削除
export const deleteBookMark = async (user_id:string)=>{
    await deleteDoc(doc(db,"users",user_id,"bookmarks","ここにbookmark_idを指定したい"))
}


//ブックマークした質問を全部取ってくる
export const getBookMark = async (user_id: string) => {
    const bookmarkList: QuestionsCollectionData[] = []
    const bookmarkId = query(collection(db, "users", user_id, "bookmarks"))
    const bookmarkDoc = await getDocs(bookmarkId)
    bookmarkDoc.forEach((doc) => {
        const bookmarkField = {
            contributor_id: doc.data().contributor_id,
                contributor_name: doc.data().contributor_name,
                question_id: doc.id,
                question: doc.data().question,
                tag: doc.data().tag,
                time: doc.data().time.toDate(),
                emotion: doc.data().emotion,
                parameter: doc.data().parameter,
                solution: doc.data().solution,
        }
        bookmarkList.push(bookmarkField)
    })
    return bookmarkList
}

//ブックマークした質問のquestion_idをとってくる
export const getBookMarkQuestionId = async (user_id: string) => {
    const bookmarkIdList: string[] = []
    const bookmarkId = query(collection(db, "users", user_id, "bookmarks"))
    const bookmarkDoc = await getDocs(bookmarkId)
    bookmarkDoc.forEach((doc) => {
        bookmarkIdList.push(doc.data().question_id)
    })
    return bookmarkIdList
}