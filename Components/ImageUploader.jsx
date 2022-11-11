import { useState } from "react"
import { auth, storage, STATE_CHANGE } from "../lib/firebaseConfig"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

// Uploads images to Firebase Storage
export default function ImageUploader({ downloadURL, setDownloadURL }) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  // Creates a Firebase Upload Task
  const uploadFile = async (e) => {
    // Get file
    const file = Array.from(e.target.files)[0]
    const extension = file.type.split("/")[1]

    console.log("file", file)
    console.log("extension:", extension)

    // Makes reference to the storage bucket location
    const fileRef = ref(
      storage,
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    )
    setUploading(true)

    console.log("fileRef:", fileRef)

    // Starts the upload
    const task = uploadBytesResumable(fileRef, file)

    console.log("task:", task)

    // Listen to updates to upload task
    task.on(STATE_CHANGE, (snapshot) => {
      const pct = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(0)
      setProgress(pct)

      // Get downloadURL AFTER task resolves (Note: this is not native Promise)
      task
        .then((d) => getDownloadURL(fileRef))
        .then((url) => {
          setDownloadURL(url)
          setUploading(false)
        })
    })
  }

  return (
    <div className='flex flex-col justify-between'>
      {uploading && <p>Loading . . .</p>}
      {uploading && <h3>{progress}%</h3>}

      {!uploading && (
        <>
          <label className='w-full p-4 flex items-center justify-center text-center font-bold text-black bg-teal-500 rounded-lg cursor-pointer hover:bg-teal-600'>
            📸 Upload IMG
            <input
              type='file'
              className='hidden'
              onChange={uploadFile}
              accept='image/x-png,image/gif,image/jpeg'
            />
          </label>
        </>
      )}

      {downloadURL && (
        <code className='text-xs'>{`Photo Url: ${downloadURL}`}</code>
      )}
    </div>
  )
}
