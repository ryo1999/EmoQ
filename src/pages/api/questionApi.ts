import { db } from "@/firebase"
import { collection, getDocs, query, addDoc, orderBy, updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore/lite"
import { QuestionsCollectionData } from "@/utils/types"

//質問全部を取ってくる
export const getQuestion = async (sortText:string,groupId:string) => {
    const questionList: QuestionsCollectionData[][] = [[], []]
    let questionId
    if(sortText==="old"){
        questionId = query(collection(db, "groups", groupId, "questions"), orderBy("time"))
    }else if(sortText==="emergency"){
        questionId = query(collection(db, "groups", groupId, "questions"), orderBy("parameter","desc"))
    }else{
        questionId = query(collection(db, "groups", groupId, "questions"), orderBy("time","desc"))
    }
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
    parameter: number | number[],
    solution: boolean,
    group_id:string
) => {
    await addDoc(collection(db, "groups", group_id, "questions"), {
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
export const getMyQuestion = async (uid: string,sortText:string, groupId:string) => {
    const myQuestionList: QuestionsCollectionData[][] = [[], []]
    let questionId
    if(sortText==="old"){
        questionId = query(collection(db, "groups", groupId, "questions"), orderBy("time"))
    }else if(sortText==="emergency"){
        questionId = query(collection(db, "groups", groupId, "questions"), orderBy("parameter","desc"))
    }else{
        questionId = query(collection(db, "groups", groupId, "questions"), orderBy("time","desc"))
    }
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
export const upDateQuestionSolution = async (question_id: string, solution: boolean, groupId:string) => {
    await updateDoc(doc(db, "groups", groupId, "questions", question_id), {
        solution: solution,
    })
}

//ブックマークされた質問のbookmark_user_idにブックマークした人のuidを追加する
export const upDateQuestionBookmark = async (question_id: string, bookmark_user_id: string[], uid: string, groupId:string) => {
    await updateDoc(doc(db, "groups", groupId, "questions", question_id), {
        bookmark_user_id: [...bookmark_user_id, uid],
    })
}

//ブックマークが解除された時に質問のbookmark_user_idからその人のuidを削除
export const deleteQuestionBookmark = async (question_id: string, bookmark_user_id: string[], uid: string, groupId:string) => {
    const users = bookmark_user_id.filter((users) => users.match(uid) == null)
    await updateDoc(doc(db, "groups", groupId, "questions", question_id), {
        bookmark_user_id: users,
    })
}

//質問を削除した時、questionsコレクションから削除
export const deleteQuestion = async (question_id: string, groupId:string) => {
    await deleteDoc(doc(db, "groups", groupId, "questions", question_id))
}

//指定された質問だけとってくる
export const getSelectQuestion = async (question_id: string, groupId:string) => {
    const docRef = doc(db, "groups", groupId, "questions", question_id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        const selectedQuestion = {
            contributor_id: docSnap.data().contributor_id,
            contributor_name: docSnap.data().contributor_name,
            question_id: question_id,
            question: docSnap.data().question,
            tag: docSnap.data().tag,
            time: docSnap.data().time.toDate(),
            emotion: docSnap.data().emotion,
            parameter: docSnap.data().parameter,
            solution: docSnap.data().solution,
            bookmark_user_id: docSnap.data().bookmark_user_id,
            replied_user_id: docSnap.data().replied_user_id,
        }
        return selectedQuestion
    }
}

//コメントされたquestion_idのreplied_user_idにコメントした人を追加
export const upDateRepliedUserId = async (question_id: string, uid: string, replied_user_id: string[], groupId:string) => {
    const newRepliedUserId = new Set(replied_user_id)
    newRepliedUserId.add(uid)
    const repliedUsers = Array.from(newRepliedUserId)
    await updateDoc(doc(db, "groups", groupId, "questions", question_id), {
        replied_user_id: repliedUsers,
    })
}

//コメントを削除した時、削除した人がその質問に対して他にコメントをしていなければreplied_user_idからその人のユーザーidを削除
export const deleteRepliedUserId = async (question_id: string, uid: string, replied_user_id: string[],groupId:string) => {
    const commentSet = new Set()
    const docRef = query(collection(db, "groups", groupId, "questions", question_id, "comments"))
    const docSnap = await getDocs(docRef)
    docSnap.forEach((doc) => {
        commentSet.add(doc.data().commenter_id)
    })
    if (!commentSet.has(uid)) {
        const userSet = new Set(replied_user_id)
        userSet.delete(uid)
        const users = Array.from(userSet)
        await updateDoc(doc(db, "groups", groupId, "questions", question_id), {
            replied_user_id: users,
        })
    }
}