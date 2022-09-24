import { db } from "@/firebase"
import { setDoc, doc, getDoc, collection, orderBy, query, getDocs, updateDoc } from "firebase/firestore/lite"

//登録されたユーザーidドキュメントにフィールド追加
export const signUp = async (user_id: string, name: string) => {
    await setDoc(doc(db, "users", user_id), {
        name: name,
        group_id:"",
        group_name:"",
        group: {},
    })
}

export const registerUserGroup = async (user_id: string, group_id: string, group_name: string) => {
    await updateDoc(doc(db, "users", user_id), {
        group_id: group_id,
        group_name: group_name,
        group:{[group_id] : group_name}
    })
}

export const getUserInfo = async (uid: string) => {
    const userRef = doc(db, "users", uid)
    const userSnap = await getDoc(userRef)
    if (userSnap.exists()) {
        return {
            userId: userSnap.id,
            userName: userSnap.data().name,
            groupId: userSnap.data().group_id,
            groupName: userSnap.data().group_name,
            group: userSnap.data().group,
        }
    }
}

export const getAllUserName = async (group_id: string) => {
    const userNameList: string[] = []
    const userRef = query(collection(db, "users"), orderBy("name"))
    const userSnap = await getDocs(userRef)
    userSnap.forEach((doc) => {
        if (group_id === doc.data().group_id) {
            userNameList.push(doc.data().name)
        }
    })
    return userNameList
}
