import { useContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

import MapMarkerer from "../../Components/MapMarkerer"
import ImageUploader from "../../Components/ImageUploader"
import AuthCheck from "../../Components/AuthCheck"

import { UserContext } from "../../lib/context"
import { auth } from "../../lib/firebaseConfig"

import {
  getFirestore,
  writeBatch,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore"

import { useForm } from "react-hook-form"
import kebabCase from "lodash.kebabcase"
import toast from "react-hot-toast"

export default function AdminPostPage() {
  return (
    <AuthCheck>
      <nav className='sticky top-0 z-10 max-w-screen h-[8vh] bg-slate-800 px-[4vw] flex justify-btween items-center drops-shadow-lg'>
        <Link href='/main'>
          <h1 className='text-[66px] font-bold text-white justify-self-start cursor-pointer '>
            Field
          </h1>
        </Link>
      </nav>
      <CreateNewPost />
    </AuthCheck>
  )
}

function CreateNewPost() {
  const router = useRouter()
  const { username } = useContext(UserContext)
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState,
    formState: { errors },
  } = useForm({
    // defaultValues,
    // mode: "onChange",
  })

  const title = watch("title")
  const streetAddress = watch("streetAddress1")
  const streetAddress2 = watch("streetAddress2")
  const district = watch("district")
  const locality = watch("locality")
  const province = watch("province")
  const zipCode = watch("zipCode")
  const country = watch("country")

  // const [title, setTitle] = useState("")
  const [miniMapCoor, setMiniMapCoor] = useState({
    lat: 13.7563,
    lng: 100.5018,
  })
  const [address, setAddress] = useState({})
  const [downloadURL, setDownloadURL] = useState(null)

  useEffect(() => {
    setAddress({
      address:
        streetAddress +
        " " +
        streetAddress2 +
        ", " +
        district +
        ", " +
        locality +
        ", " +
        province +
        ", " +
        zipCode +
        ", " +
        country,
    })
    // console.log(address)
  }, [
    streetAddress,
    streetAddress2,
    district,
    locality,
    province,
    zipCode,
    country,
  ])

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title))

  // Create new post in firestore
  const createPost = async ({
    title,
    phone,
    price,
    content,
    published,
    streetAddress1,
    streetAddress2,
    district,
    locality,
    province,
    country,
    zipCode,
    typeOfService,
  }) => {
    // create ref for both documents
    const uid = auth.currentUser.uid
    const userDoc = doc(getFirestore(), "users", uid, "posts", slug)
    // province
    const provinceDoc = doc(
      getFirestore(),
      "provinces",
      province,
      "posts",
      slug
    )

    // Commit both docs together as a batch write.
    const batch = writeBatch(getFirestore())
    batch.set(userDoc, {
      title,
      slug,
      uid,
      username,
      published,
      address: {
        streetAddress1,
        streetAddress2,
        district,
        locality,
        province,
        country,
        zipCode,
        coordinate: { lat: miniMapCoor?.lat, lng: miniMapCoor?.lng },
      },
      phone,
      price,
      photoUrl: downloadURL,
      typeOfService,
      content,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    batch.set(provinceDoc, {
      title,
      slug,
      uid,
      username,
      published,
      address: {
        streetAddress1,
        streetAddress2,
        district,
        locality,
        province,
        country,
        zipCode,
        coordinate: { lat: miniMapCoor?.lat, lng: miniMapCoor?.lng },
      },
      phone,
      price,
      photoUrl: downloadURL,
      typeOfService,
      content,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    await batch
      .commit()
      .then(() => {
        // toast.success("batch!, Nice name!")
        // router.push("/main")
      })
      .catch((err) => alert("Commit Batch Error:" + err))

    // Tip: give all fields a default value here
    // const data = {
    //   title,
    //   slug,
    //   uid,
    //   username,
    //   published: false,
    //   address: {},
    //   province: "",
    //   typeOfService: "",
    //   content: "#hello girls",
    //   createdAt: serverTimestamp(),
    //   updatedAt: serverTimestamp(),
    // }

    // await setDoc(userDoc, data)

    toast.success("Post Created!")

    // Imperative navigation after doc is set
    router.push(`/main/${province}`)
  }

  return (
    <div className='h-full mt-8 ml-44 pl-44'>
      <h1 className='text-4xl font-semibold my-6'>Create new Post</h1>
      <form
        onSubmit={handleSubmit(createPost)}
        className='w-full max-w-xl mb-8'
      >
        {/* Title */}
        <strong>Title:</strong>
        <input
          // value={title}
          // onChange={(e) => setTitle(e.target.value)}
          placeholder='garden in Chiang Mai'
          className='appearance-none block w-full bg-gray-200 text-2xl text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
          {...register("title", {
            maxLength: { value: 52, message: "content is too long" },
            minLength: { value: 5, message: "content is too short" },
            required: { value: true, message: "content is required" },
          })}
        />
        {errors.title && (
          <p className='font-bold text-red-600'>{errors.title.message}</p>
        )}
        <p>
          <i>Slug:</i> {slug}
        </p>

        <div className='mt-4'>
          <div>
            <h1 className='text-xl mb-5 underline'>
              Post Address (????????????????????????????????????????????????/??????????????????/??????????????????)
            </h1>
            {/* Address line 1 */}
            <div className='flex flex-wrap -mx-3 mb-2'>
              <div className='w-full px-3'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  Address line 1 (??????????????????????????????????????? 1)
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='streetAddress1'
                  type='text'
                  placeholder='420/68 . . .'
                  {...register("streetAddress1", {
                    maxLength: { value: 50, message: "content is too long" },
                    minLength: { value: 6, message: "content is too short" },
                    required: { value: false, message: "content is required" },
                  })}
                />
                {errors.streetAddress1 && (
                  <p className='font-bold text-red-600'>
                    {errors.streetAddress1.message}
                  </p>
                )}
              </div>
            </div>
            {/* Address line 2 */}
            <div className='flex flex-wrap -mx-3 mb-2'>
              <div className='w-full px-3'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  Address line 2 (??????????????????????????????????????? 2)
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='streetAddress2'
                  type='text'
                  placeholder='MindBlowing Street . . . '
                  {...register("streetAddress2", {
                    maxLength: { value: 50, message: "content is too long" },
                    minLength: { value: 10, message: "content is too short" },
                  })}
                />
                {/* {errors.streetAddress2 && (
                  <p className='font-bold text-red-600'>
                    {errors.streetAddress2.message}
                  </p>
                )} */}
              </div>
            </div>

            {/* district/sub-locality, locality, province */}
            <div className='flex flex-wrap -mx-3 mb-2'>
              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  District (????????????/????????????)
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='district'
                  type='text'
                  placeholder='Huay Sai'
                  {...register("district", {
                    maxLength: { value: 30, message: "content is too long" },
                    minLength: { value: 2, message: "content is too short" },
                    required: { value: false, message: "content is required" },
                  })}
                />
                {errors.district && (
                  <p className='font-bold text-red-600'>
                    {errors.district.message}
                  </p>
                )}
              </div>

              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  locality (???????????????/?????????)
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='locality'
                  type='text'
                  placeholder='Maerim'
                  {...register("locality", {
                    maxLength: { value: 30, message: "content is too long" },
                    minLength: { value: 3, message: "content is too short" },
                    required: { value: true, message: "content is required" },
                  })}
                />
                {errors.locality && (
                  <p className='font-bold text-red-600'>
                    {errors.locality.message}
                  </p>
                )}
              </div>
              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  Province (?????????????????????)
                </label>
                <div class='relative'>
                  <select
                    className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    id='province'
                    {...register("province", {
                      required: { value: true, message: "content is required" },
                    })}
                  >
                    <option value='Amnat Charoen'>
                      Amnat Charoen(??????????????????????????????)
                    </option>
                    <option value='Ang Thong'>Ang Thong (?????????????????????)</option>
                    <option value='Bangkok'>Bangkok (????????????????????????)</option>
                    <option value='Buri Rum'>Buri Rum (???????????????????????????)</option>
                    <option value='Bueng Kan'>Bueng Kan (??????????????????)</option>
                    <option value='Chachoengsao'>
                      Chachoengsao (??????????????????????????????)
                    </option>
                    <option value='Chaiyaphum'>Chaiyaphum (?????????????????????)</option>
                    <option value='Chanthaburi'>Chanthaburi (????????????????????????)</option>
                    <option value='Chiang Mai' selected>
                      Chiang Mai (???????????????????????????)
                    </option>
                    <option value='Chiang Rai'>Chiang Rai (????????????????????????)</option>
                    <option value='Chonburi'>Chonburi (??????????????????)</option>
                    <option value='Chumphon'>Chumphon (???????????????)</option>
                    <option value='Kalasin'>Kalasin (???????????????????????????)</option>
                    <option value='Kamphaeng Phet'>
                      Kamphaeng Phet (???????????????????????????)
                    </option>
                    <option value='Kanchanaburi'>
                      Kanchanaburi (???????????????????????????)
                    </option>
                    <option value='Khon Kaen'>Khon Kaen (?????????????????????)</option>
                    <option value='Krabi'>Krabi (??????????????????)</option>
                    <option value='Loei'>Loei (?????????)</option>
                    <option value='Lumpang'>Lumpang (???????????????)</option>
                    <option value='Lumphun'>Lumphun (???????????????)</option>
                    <option value='Mae Hong Son'>
                      Mae Hong Son (??????????????????????????????)
                    </option>
                    <option value='Maha Sarakham'>
                      Maha Sarakham (???????????????????????????)
                    </option>
                    <option value='Nakhon Nayok'>Nakhon Nayok (?????????????????????)</option>
                    <option value='Nakhon Pathom'>
                      Nakhon Pathom (??????????????????)
                    </option>
                    <option value='Mukdahan'>Mukdahan (????????????????????????)</option>
                    <option value='Nakhon Phanom'>
                      Nakhon Phanom (??????????????????)
                    </option>
                    <option value='Nakhon Ratchasima'>
                      Nakhon Ratchasima (???????????????????????????????????????)
                    </option>
                    <option value='Nakhon Sawan'>
                      Nakhon Sawan (???????????????????????????)
                    </option>
                    <option value='Nakhon Si Thammarat'>
                      Nakhon Si Thammarat (???????????????????????????????????????)
                    </option>
                    <option value='Nan'>Nan (????????????)</option>
                    <option value='Narathiwat'>Narathiwat (????????????????????????)</option>
                    <option value='Nong Bua Lumphu'>
                      Nong Bua Lumphu (?????????????????????????????????)
                    </option>
                    <option value='Nong Khai'>Nong Khai (?????????????????????)</option>
                    <option value='Pathum Thani'>
                      Pathum Thani (????????????????????????)
                    </option>
                    <option value='Pattani'>Pattani (?????????????????????)</option>
                    <option value='Phang-nga'>Phang-nga (???????????????)</option>
                    <option value='Phatthalung'>Phatthalung (??????????????????)</option>
                    <option value='Phayao'>Phayao (???????????????)</option>
                    <option value='Phetchabun'>Phetchabun (???????????????????????????)</option>
                    <option value='Phetchaburi'>Phetchaburi (????????????????????????)</option>
                    <option value='Phichit'>Phichit (??????????????????)</option>
                    <option value='Phitsanulok'>Phitsanulok (????????????????????????)</option>
                    <option value='Phra Nakhon Si Ayutthaya'>
                      Phra Nakhon Si Ayutthaya (??????????????????)
                    </option>
                    <option value='Phrae'>Phrae (????????????)</option>
                    <option value='Phuket '>Phuket (??????????????????)</option>
                    <option value='Prachuap Khiri Khan'>
                      Prachuap Khiri Khan (?????????????????????????????????????????????)
                    </option>
                    <option value='Ranong'>Ranong (???????????????)</option>
                    <option value='Ratchaburi'>Ratchaburi (?????????????????????)</option>
                    <option value='Rayong'>Rayong (???????????????)</option>
                    <option value='Roi Et'>Roi Et (????????????????????????)</option>
                    <option value='Sa Kaeo'>Sa Kaeo (?????????????????????)</option>
                    <option value='Sakhon Nakhon'>
                      Sakhon Nakhon (??????????????????)
                    </option>
                    <option value='Samut Prakan'>
                      Samut Prakan (?????????????????????????????????)
                    </option>
                    <option value='Samut Sakhon'>
                      Samut Sakhon (???????????????????????????)
                    </option>
                    <option value='Sara Buri'>Sara Buri (?????????????????????)</option>
                    <option value='Satun'>Satun (????????????)</option>
                    <option value='Sing Buri'>Sing Buri (???????????????????????????)</option>
                    <option value='Sisaket'>Sisaket (????????????????????????)</option>
                    <option value='Songkhla'>Songkhla (???????????????)</option>
                    <option value='Sukhothai'>Sukhothai (?????????????????????)</option>
                    <option value='Suphan Buri'>
                      Suphan Buri (??????????????????????????????)
                    </option>
                    <option value='Surat Thani'>
                      Surat Thani (????????????????????????????????????)
                    </option>
                    <option value='Surin'>Surin (????????????????????????)</option>
                    <option value='Tak'>Tak (?????????)</option>
                    <option value='Trat'>Trat (????????????)</option>

                    <option value='Ubon Ratchath'>
                      Ubon Ratchath (?????????????????????????????????)
                    </option>
                    <option value='Udon Thani'>Udon Thani (????????????????????????)</option>
                    <option value='Uthai Thani'>Uthai Thani (???????????????????????????)</option>
                    <option value='Uttaradit'>Uttaradit (???????????????????????????)</option>
                    <option value='Yala'>Yala (????????????)</option>
                  </select>
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                    <svg
                      className='fill-current h-4 w-4'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                  </div>
                  {errors.province && (
                    <p className='font-bold text-red-600'>
                      {errors.province.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* zip, country */}
            <div className='flex flex-wrap -mx-3 mb-8'>
              <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  Zip (????????????????????????????????????)
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-zip'
                  type='text'
                  placeholder='50180'
                  {...register("zipCode", {
                    required: { value: false },
                  })}
                />
                {errors.zipCode && (
                  <p className='font-bold text-red-600'>
                    {errors.zipCode.message}
                  </p>
                )}
              </div>
              <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  country (??????????????????)
                </label>
                <div className='relative'>
                  <select
                    className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    id='country'
                    {...register("country", {
                      required: { value: true, message: "content is required" },
                    })}
                  >
                    <option>Thailand</option>
                  </select>
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                    <svg
                      className='fill-current h-4 w-4'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                  </div>
                  {errors.country && (
                    <p className='font-bold text-red-600'>
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className='my-6'>
              <MapMarkerer
                address={address}
                miniMapCoor={miniMapCoor}
                setMiniMapCoor={setMiniMapCoor}
              />
            </div>
          </div>

          {/* Type, Price */}
          <div className='flex flex-wrap -mx-3 mb-2'>
            <div className='w-1/2 pt-3 px-3 mb-6 md:mb-0'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Type (?????????????????????????????????????????????)
              </label>
              <div className='relative'>
                <select
                  className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='typeOfService'
                  placeholder='typeOfService'
                  {...register("typeOfService", {
                    required: { value: true, message: "content is required" },
                  })}
                >
                  <option value='Vacant Land' selected>
                    Vacant Land (?????????????????????????????????)
                  </option>
                  <option value='Real Estate'>Real Estate (????????????)</option>
                  <option value='Property'>
                    Property (????????????????????????????????????????????????????????????????????????)
                  </option>
                  <option value='Service'>Service (??????????????????)</option>
                </select>
                {errors.typeOfService && (
                  <p className='font-bold text-red-600'>
                    {errors.typeOfService.message}
                  </p>
                )}
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                  <svg
                    class='fill-current h-4 w-4'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                  </svg>
                </div>
              </div>
            </div>
            <div className='w-1/2 pt-3 px-3 mb-6 md:mb-0'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Price (????????????)
              </label>
              <div className='relative'>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='price'
                  type='text'
                  placeholder='10000 ????????? / ?????????'
                  {...register("price", {
                    required: { value: true, message: "content is required" },
                  })}
                />
                {errors.price && (
                  <p className='font-bold text-red-600'>
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Phone, Photo */}
          <div className='flex flex-wrap -mx-3 mb-2'>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Phone (????????????????????????)
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-first-name'
                type='text'
                placeholder='307-123-7898'
                {...register("phone", {
                  maxLength: { value: 14, message: "content is too long" },
                  minLength: { value: 8, message: "content is too short" },
                  required: { value: true, message: "content is required" },
                })}
              />
              {errors.phone && (
                <p className='font-bold text-red-600'>{errors.phone.message}</p>
              )}
            </div>
            <div className='w-full md:w-1/2 px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Image (??????????????????)
              </label>
              <ImageUploader
                downloadURL={downloadURL}
                setDownloadURL={setDownloadURL}
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
              Info (??????????????????)
            </label>
            <textarea
              {...register("content", {
                maxLength: { value: 20000, message: "content is too long" },
                minLength: { value: 10, message: "content is too short" },
                required: { value: true, message: "content is required" },
              })}
              className='h-[15vh] w-full p-[0.5rem]'
            ></textarea>

            {errors.content && (
              <p className='font-bold text-red-600'>{errors.content.message}</p>
            )}
          </div>
        </div>
        <fieldset className='m-2'>
          <input
            className='inline w-auto mr-1'
            type='checkbox'
            checked
            {...register("published")}
          />
          <label>Published</label>
        </fieldset>

        <button
          type='submit'
          // disabled={}
          className='w-full mt-3 bg-slate-800 text-white hover:bg-slate-600'
        >
          Create New Post
        </button>
      </form>
    </div>
  )
}
