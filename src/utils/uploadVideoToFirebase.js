import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase-config';

export const uploadVideoToFirebase = async (file) => {
    const fileRef = ref(storage, `videos/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
};
