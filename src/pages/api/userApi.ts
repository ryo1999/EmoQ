import { db } from "@/firebase"
import { setDoc, doc, getDoc, collection, orderBy, query, getDocs, updateDoc } from "firebase/firestore/lite"

//登録されたユーザーidドキュメントにフィールド追加
export const signUp = async (user_id: string, name: string) => {
    await setDoc(doc(db, "users", user_id), {
        name: name,
        group_id: "",
        group_name: "",
        group: {},
    })
}

export const registerUserGroup = async (user_id: string, group_id: string, group_name: string) => {
    let groups
    const docRef = doc(db, "users", user_id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        if (group_id in docSnap.data().group) {
            groups = docSnap.data().group
        } else {
            groups = { ...docSnap.data().group, [group_id]: group_name }
        }
    }
    await updateDoc(doc(db, "users", user_id), {
        group_id: group_id,
        group_name: group_name,
        group: groups,
    })
}

//ユーザーの情報を取ってくる
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

//同じグループ内のユーザーの名前を全て取ってくる
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

//ユーザーの所属しているグループを全て取ってくる
export const getAllUserGroup = async (user_id: string) => {
    const docRef = doc(db, "users", user_id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        return docSnap.data().group
    }
}

//アカウントが切り替えられた時にデータベースのgroup_idとgroup_nameを変えにいく
export const changeGroup = async (user_id: string, group_id: string, group_name: string) => {
    await updateDoc(doc(db, "users", user_id), {
        group_id: group_id,
        group_name: group_name,
    })
}

//新しくグループが作られた時、新しくグループに参加した時、mygroupsコレクションにグループIDを作る
export const createMygroups = async (user_id: string, group_id: string, group_name: string) => {
    const docRef = doc(db, "users", user_id, "mygroups", group_id)
    const data = { name: group_name }
    await setDoc(docRef, data)
}

//コメントした時ユーザーのフィールドにnotification追加
export const addNotification = async (
    user_id: string,
    user_name: string,
    group_id: string,
    question_id: string,
    question_user_id: string,
    replied_user_id: string[]
) => {
    let joinUsers: string[] = []
    joinUsers = [...replied_user_id]
    if (joinUsers.indexOf(question_user_id) === -1) {
        joinUsers.push(question_user_id)
    }
    joinUsers.forEach(async (user) => {
        let notifications: { [key: string]: string }[] = []
        if (user_id !== user) {
            const docRef = doc(db, "users", user, "mygroups", group_id)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                if (docSnap.data().notification !== undefined) {
                    notifications = [...docSnap.data().notification]
                    notifications.push({ [question_id]: user_name })
                } else {
                    notifications = [{ [question_id]: user_name }]
                }
            }
            await updateDoc(doc(db, "users", user, "mygroups", group_id), {
                notification: notifications,
            })
        }
    })
}

//自分の現在のアカウントのnotificationのデータを取ってくる
export const getNotification = async (user_id: string, group_id: string) => {
    const userRef = doc(db, "users", user_id, "mygroups", group_id)
    const userSnap = await getDoc(userRef)
    if (userSnap.exists()) {
        if (userSnap.data().notification === undefined) {
            return []
        } else {
            return userSnap.data().notification
        }
    }
}

//自分の全てのアカウントの通知を取得
export const getMygroupsNotification = async (user_id: string) => {
    const groups: { [key: string]: number } = {}
    const groupId = query(collection(db, "users", user_id, "mygroups"))
    const querySnapshot = await getDocs(groupId)
    querySnapshot.forEach((doc) => {
        if (doc.data().notification !== undefined) {
            groups[doc.id] = doc.data().notification.length
        } else {
            groups[doc.id] = 0
        }
    })
    return groups
}

//自分の他のアカウントに通知が来ているかどうかを確かめる
export const confirmNotification = async (user_id: string) => {
    const groupId = query(collection(db, "users", user_id, "mygroups"))
    const querySnapshot = await getDocs(groupId)
    let bool = true
    querySnapshot.forEach((doc) => {
        if (doc.data().notification !== undefined) {
            if (doc.data().notification.length !== 0) {
                return bool = false
            }
        }
    })
    return bool
}

//通知の中のリストをクリックされたらそのquestion_idと同じidを全て消す
export const deleteNotification = async (user_id: string, question_id: string, group_id: string) => {
    const notifications: { [key: string]: string }[] = []
    const docRef = doc(db, "users", user_id, "mygroups", group_id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        if (docSnap.data().notification !== undefined) {
            docSnap.data().notification.forEach((data: { [key: string]: string }) => {
                Object.keys(data).forEach((qid) => {
                    if (question_id !== qid) {
                        notifications.push(data)
                    }
                })
            })
        } else {
            return
        }
    }
    await updateDoc(doc(db, "users", user_id, "mygroups", group_id), {
        notification: notifications,
    })
}
