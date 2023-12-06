import firestore from '@react-native-firebase/firestore';
import {store} from '../redux/useRedux';
import {setChatsAction, setMyUserAction} from '../redux/actions';
import {coursemap} from '../redux/dummyData';

const getUserDocumentRef = (userId: string) =>
  firestore().collection('users').doc(userId);

const setMyUserFirebaseRedux = async (id: string, user: User) => {
  let userToSet: User = user;
  const myUserDocumentRef = getUserDocumentRef(id);
  const userDocSnapshot = await myUserDocumentRef.get();
  if (userDocSnapshot.exists) {
    const data = userDocSnapshot.data();
    if (data) userToSet = data as User;
    if (userToSet.chats) {
      const chatPromises: Promise<void>[] = [];
      const chatmapToSet: Chatmap = {};
      userToSet.chats.forEach(id => {
        const add = async () => {
          const snap = await firestore().collection('chats').doc(id).get();
          const data = snap.data() as Chat;
          chatmapToSet[id] = data;
        };
        chatPromises.push(add());
      });
      await Promise.all(chatPromises);
      store.dispatch(setChatsAction({chatmap: chatmapToSet}));
    }
  } else await myUserDocumentRef.set(user);
  store.dispatch(setMyUserAction({id, user: userToSet}));
};

const setMyUserBio = async (id: string, user: User, bio: string) => {
  let UserToSet: User = user;
  const myUserDocumentRef = getUserDocumentRef(id);
  const userDocSnapshot = await myUserDocumentRef.get();
  if (userDocSnapshot.exists) {
    const data = userDocSnapshot.data();
    if (data) UserToSet = data as User;
    UserToSet.bio = bio;
    await myUserDocumentRef.set(UserToSet);
    store.dispatch(setMyUserAction({id, user: UserToSet}));
  }
}

const setMyUserPreferredName = async (id: string, user: User, name: string) => {
  let UserToSet: User = user;
  const myUserDocumentRef = getUserDocumentRef(id);
  const userDocSnapshot = await myUserDocumentRef.get();
  if (userDocSnapshot.exists) {
    const data = userDocSnapshot.data();
    if (data) UserToSet = data as User;
    UserToSet.preferredName = name;
    await myUserDocumentRef.set(UserToSet);
    store.dispatch(setMyUserAction({id, user: UserToSet}));
  }
}

const setMyUserStatus = async (id: string, user: User) => {
  let UserToSet: User = user;
  const myUserDocumentRef = getUserDocumentRef(id);
  const userDocSnapshot = await myUserDocumentRef.get();
  if (userDocSnapshot.exists) {
    const data = userDocSnapshot.data();
    if (data) UserToSet = data as User;
    if (UserToSet.status == null) UserToSet.status = 0; 
    UserToSet.status = (UserToSet.status + 1) % 6;
    await myUserDocumentRef.set(UserToSet);
    store.dispatch(setMyUserAction({id, user: UserToSet}));
  }
}

export default function useUserData() {
  return {};
}

export {getUserDocumentRef, setMyUserFirebaseRedux, setMyUserBio, setMyUserPreferredName, setMyUserStatus};
