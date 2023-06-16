/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClientWithAuth, apiEndpoints } from ".."
import { storage } from "../../firebase/firebase"
import { ref, uploadBytes, getDownloadURL, listAll } from "@firebase/storage";


export const updateUserData = async (data: any) => {
    const userData = await apiClientWithAuth.put(apiEndpoints.users, data)
    return userData.data
}

export const createUserData = async (data: any) => {
    const userData = await apiClientWithAuth.post(apiEndpoints.users, data)
    return userData.data
}

export const getUsersFromSearch = async (search: string) => {
    const userData = await apiClientWithAuth.get(apiEndpoints.users + `/search`, {params: {search}})
    return userData.data
}

export const uploadStorageDocument = async (path: string, file: any) => {
    const fileRef = ref(storage, `${path}/${file.name}`);
  
    uploadBytes(fileRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  
    return true;
  }
  
  export const downloadStorageDocument = async (path: string) => {
    //for this to work must use gsutil and set the cors
    alert('for this to work must use gsutil and set the cors')
    return null;
    const fileRef = ref(storage, path);
  
    getDownloadURL(fileRef)
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'
  
      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
    })
    .catch((error) => {
      // Handle any errors
      console.log('Error: ', error)
    });
  }

export const allFilesForUser = async (path: string) => {
    const listRef = ref(storage, path);

    const allItems: string[] = []
    
    await listAll(listRef).then((res) => {
            res.items.forEach((itemRef) => {
            // console.log('itemRef: ', itemRef)
            const name = itemRef.name
            allItems.push(name)
        })});

    return allItems
}