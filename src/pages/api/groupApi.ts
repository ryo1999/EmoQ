import { db } from "@/firebase"
import { addDoc, collection, doc, getDoc } from "firebase/firestore/lite"

//新しいグループを作成
export const addGroup = async (name: string) => {
    const docRef = await addDoc(collection(db, "groups"), {
        name: name,
    })
    return docRef.id
}

//グループidが存在するかどうか判定
export const getGroupName = async (group_id: string) => {
    const docRef = doc(db, "groups", group_id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        return docSnap.data().name
    } else {
        return false
    }
}
