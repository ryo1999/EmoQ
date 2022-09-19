import { db } from "@/firebase"
import {
    setDoc,
    doc,
    getDoc,
    collection,
    orderBy,
    query,
    getDocs
} from "firebase/firestore/lite"

export const singUp = async (user_id:string, name:string) => {
    //登録されたユーザーidドキュメントにフィールド追加
    await setDoc(doc(db,"users",user_id),{
        name:name,
    })
}

export const getUserName = async(uid:string)=>{
    const userRef = doc(db,"users",uid)
    const userSnap = await getDoc(userRef)
    if(userSnap.exists()){
        return {
            userId:userSnap.id,
            userName:userSnap.data().name,
            groupId:userSnap.data().group_id
        }
    }
}

export const getAllUserName = async()=>{
    const userNameList:string[] = []
    const userRef = query(collection(db,"users"),orderBy("name"))
    const userSnap = await getDocs(userRef)
    userSnap.forEach((doc)=>{
        userNameList.push(doc.data().name)
    })
    return userNameList
}