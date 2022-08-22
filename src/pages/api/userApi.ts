import { db } from "@/firebase"
import {
    setDoc,
    doc,
    getDoc
} from "firebase/firestore/lite"

export const singUp = async (user_id:string, name:string) => {
    //登録されたユーザーidドキュメントにフィールド追加
    await setDoc(doc(db,"users",user_id),{
        name:name,
    })
    //登録されたユーザーidにサブコレクションbookmarksを追加し、ダミーを作成
    await setDoc(doc(db,"users",user_id,"bookmarks","dummy"),{
    })
}

export const getUserName = async(uid:string)=>{
    const userRef = doc(db,"users",uid)
    const userSnap = await getDoc(userRef)
    if(userSnap.exists()){
        return {
            userId:userSnap.id,
            userName:userSnap.data().name
        }
    }
}