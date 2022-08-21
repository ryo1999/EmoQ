import { db } from "@/firebase"
import {
    setDoc,
    doc,
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
