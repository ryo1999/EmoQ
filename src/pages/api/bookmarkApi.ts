import { db } from "@/firebase"
import { QuestionsCollectionData } from "@/utils/types"
import { collection, deleteDoc, doc, query, getDocs, setDoc, updateDoc, orderBy } from "firebase/firestore/lite"

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
    parameter: number | number[],
    solution: boolean,
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
        bookmark_user_id: [user_id],
        replied_user_id: replied_user_id,
    }
    await setDoc(docRef, data)
}

//ブックマークを外された時、bookmarksコレクションのデータベースから削除
export const deleteBookMark = async (user_id: string, question_id: string) => {
    await deleteDoc(doc(db, "users", user_id, "bookmarks", question_id))
}

//ブックマークした質問を全部取ってくる
export const getBookMark = async (user_id: string, sortText: string) => {
    const bookmarkList: QuestionsCollectionData[][] = [[], []]
    let bookmarkId
    if (sortText === "old") {
        bookmarkId = query(collection(db, "users", user_id, "bookmarks"), orderBy("time"))
    } else if (sortText === "emergency") {
        bookmarkId = query(collection(db, "users", user_id, "bookmarks"), orderBy("parameter", "desc"))
    } else {
        bookmarkId = query(collection(db, "users", user_id, "bookmarks"), orderBy("time", "desc"))
    }
    const bookmarkDoc = await getDocs(bookmarkId)
    bookmarkDoc.forEach((doc) => {
        if (doc.data().solution === false) {
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
            bookmarkList[0].push(bookmarkField)
        } else {
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
            bookmarkList[1].push(bookmarkField)
        }
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

//質問を削除した時全員のブックマークから削除
export const deleteBookMarkQuestion = async (question_id: string, bookmark_user_id: string[]) => {
    bookmark_user_id.forEach((user_id) => {
        deleteDoc(doc(db, "users", user_id, "bookmarks", question_id))
    })
}

//ブックマークしている人の解決された質問idのsolutionをtrueにしたり、未解決に戻された質問をfalseにしたりする
export const upDateBookmarkSolution = async (question_id: string, bookmark_user_id: string[], solution: boolean) => {
    bookmark_user_id.forEach((user_id) => {
        updateDoc(doc(db, "users", user_id, "bookmarks", question_id), {
            solution: solution,
        })
    })
}
