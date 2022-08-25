import { db } from "@/firebase"
import { QuestionsCollectionData } from "@/utils/types"
import { collection, addDoc, deleteDoc, doc, query, getDocs, setDoc } from "firebase/firestore/lite"

//ブックマークされた時ブックマークのデータベースに追加
export const addBookMark = async (
    user_id: string,
    contributor_id: string,
    contributor_name: string,
    question_id: string,
    question: string,
    tag: string[],
    time: Date,
    emotion: string,
    parameter: string | number | number[],
    solution: boolean,
    bookmark_user_id: string[],
    replied_user_id: string[]
) => {
    const docRef = doc(db, "users", user_id, "bookmarks", question_id)
    const data = {
        contributor_id: contributor_id,
        contributor_name: contributor_name,
        question: question,
        tag: tag,
        time: time,
        emotion: emotion,
        parameter: parameter,
        solution: solution,
        bookmark_user_id: bookmark_user_id,
        replied_user_id: replied_user_id,
    }
    await setDoc(docRef, data)
}

//ブックマークを外された時、bookmarksコレクションのデータベースから削除
export const deleteBookMark = async (user_id: string, question_id:string) => {
    await deleteDoc(doc(db, "users", user_id, "bookmarks", question_id))
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
            bookmark_user_id: doc.data().bookmark_user_id,
            replied_user_id: doc.data().replied_user_id,
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
