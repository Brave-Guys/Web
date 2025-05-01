import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase-config';

export const uploadImageToFirebase = async (file) => {
    const storageRef = ref(storage, `posts/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
};

export const uploadMultipleImages = async (files) => {
    const urls = await Promise.all(
        files.map((file) => uploadImageToFirebase(file))
    );
    return urls;
};
