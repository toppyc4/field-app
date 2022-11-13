import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import MapMarkerer from "./MapMarkerer"

import { auth, db, getUserWithUsername } from "../lib/firebaseConfig"
import {
  query,
  getFirestore,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"

import { useForm } from "react-hook-form"
import {
  useDocumentDataOnce,
  useDocumentData,
} from "react-firebase-hooks/firestore"
import toast from "react-hot-toast"

export default function UserForm({ user, setEditing }) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState,
    formState: { errors },
  } = useForm({
    defaultValues: {
      streetAddress1: user?.address?.streetAddress1,
      streetAddress2: user?.address?.streetAddress2,
      district: user?.address?.district,
      locality: user?.address?.locality,
      province: user?.address?.province,
      zipCode: user?.address?.zipCode,
      country: user?.address?.country,
      email: user?.email,
      // phone: user?.phone,
      price: user?.price,
      Fname: user?.Fname,
      Lname: user?.Lname,
      username: user?.username,
    },
    mode: "onChange",
  })

  const _streetAddress = watch("streetAddress1")
  const _streetAddress2 = watch("streetAddress2")
  const _district = watch("district")
  const _locality = watch("locality")
  const _province = watch("province")
  const _zipCode = watch("zipCode")
  const _country = watch("country")

  const [miniMapCoor, setMiniMapCoor] = useState(
    user?.address?.coordinate || {
      lat: 13.7563,
      lng: 100.5018,
    }
  )
  const [address, setAddress] = useState({})

  useEffect(() => {
    setAddress({
      address:
        _streetAddress +
        " " +
        _streetAddress2 +
        ", " +
        _district +
        ", " +
        _locality +
        ", " +
        _province +
        ", " +
        _zipCode +
        ", " +
        _country,
    })
    console.log(address)
  }, [
    _streetAddress,
    _streetAddress2,
    _district,
    _locality,
    _province,
    _zipCode,
    _country,
  ])

  const { isDirty, isValid } = formState

  async function updateUser({
    username,
    Fname,
    Lname,
    email,
    // password,
    streetAddress1,
    streetAddress2,
    district,
    locality,
    province,
    country,
    zipCode,
  }) {
    const uid = auth?.currentUser?.uid
    const userRef = doc(db, "users", uid)
    // console.log("userDoc: ", userDoc)
    await updateDoc(userRef, {
      username,
      Fname,
      Lname,
      email,
      // password,
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
      updatedAt: serverTimestamp(),
    }).then(() => {
      toast.success("successfully updated infomation!")
      // router.refresh()
      setEditing(false)
      router.push(`/${username}`)
    })
  }

  return (
    <div className='flex flex-col mt-4 pb-10'>
      <h1 className='my-6 mx-auto font-bold text-2xl underline'>User's Form</h1>
      <form
        onSubmit={handleSubmit(updateUser)}
        className='mx-auto w-full max-w-lg'
      >
        {/* <button onClick={() => {}} className='w-50 h-12 mb-6 mx-auto'>
          Upload Profile Picture
        </button> */}
        <div>
          {/* Username */}
          <div className='flex flex-wrap -mx-3 mb-2'>
            <div className='w-full px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Username (ชื่อผู้ใช้)
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='streetAddress1'
                type='text'
                placeholder='magnus'
                {...register("username", {
                  maxLength: { value: 33, message: "content is too long" },
                  minLength: { value: 3, message: "content is too short" },
                  required: { value: true, message: "content is required" },
                })}
              />
              {errors.streetAddress1 && (
                <p className='font-bold text-red-600'>
                  {errors.streetAddress1.message}
                </p>
              )}
            </div>
          </div>
          {/* First and Last Name */}
          <div className='flex flex-wrap -mx-3 mb-2'>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                First Name (ชื่อจริง)
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-first-name'
                type='text'
                placeholder='Jane'
                {...register("Fname", {
                  maxLength: { value: 21, message: "content is too long" },
                  minLength: { value: 3, message: "content is too short" },
                  required: { value: true, message: "content is required" },
                })}
              />
              {errors.Fname && (
                <p className='font-bold text-red-600'>{errors.Fname.message}</p>
              )}
            </div>
            <div className='w-full md:w-1/2 px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Last Name (นามสกุล)
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='Lname'
                type='text'
                placeholder='Doe'
                {...register("Lname", {
                  maxLength: { value: 21, message: "content is too long" },
                  minLength: { value: 2, message: "content is too short" },
                  required: { value: true, message: "content is required" },
                })}
              />
              {errors.Lname && (
                <p className='font-bold text-red-600'>{errors.Lname.message}</p>
              )}
            </div>
          </div>
          {/* Email and Password */}
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Email (อีเมล)
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='email'
                type='text'
                placeholder='Email'
                {...register("email", {
                  required: { value: true, message: "content is required" },
                })}
              />
              {errors.email && (
                <p className='font-bold text-red-600'>{errors.email.message}</p>
              )}
            </div>
            <div className='w-full md:w-1/2 px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Password (รหัสผ่าน)
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='password'
                type='password'
                placeholder='Password'
                disabled={true}
                {...register("password", {
                  required: { value: false, message: "content is required" },
                })}
              />
              <p> not available yet </p>
            </div>
          </div>
        </div>

        <div className=''>
          <h1 className='text-xl mb-5 underline'>
            Your Address (ที่อยู่ของคุณ)
          </h1>

          {/* Address line 1 */}
          <div className='flex flex-wrap -mx-3 mb-2'>
            <div className='w-full px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Address line 1 (ที่อยู่บรรทัด 1)
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='streetAddress1'
                type='text'
                placeholder='420/69 . . . '
                {...register("streetAddress1", {
                  maxLength: { value: 50, message: "content is too long" },
                  minLength: { value: 10, message: "content is too short" },
                  required: { value: true, message: "content is required" },
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
            <div class='w-full px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Address line 2 (ที่อยู่บรรทัด 2)
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='streetAddress2'
                type='text'
                placeholder='MindBlowing Street . . .'
                {...register("streetAddress2")}
              />
              {errors.streetAddress2 && (
                <p className='font-bold text-red-600'>
                  {errors.streetAddress2.message}
                </p>
              )}
            </div>
          </div>

          {/* district/sub-locality, locality, provinve */}
          <div className='flex flex-wrap -mx-3 mb-2'>
            <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                District (ตำบล/แขวง)
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='district'
                type='text'
                placeholder='Khu Khot'
                {...register("district", {
                  maxLength: { value: 30, message: "content is too long" },
                  minLength: { value: 3, message: "content is too short" },
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
                Locality (อำเภอ/เขต)
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='locality'
                type='text'
                placeholder='Albuquerque'
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
                Province (จังหวัด)
              </label>
              <div className='relative'>
                <select
                  className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='province'
                  {...register("province", {
                    required: { value: true, message: "content is required" },
                  })}
                >
                  <option value='Amnat Charoen'>
                    Amnat Charoen (อำนาจเจริญ)
                  </option>
                  <option value='Ang Thong'>Ang Thong (อ่างทอง)</option>
                  <option value='Bangkok' selected>
                    Bangkok (กรุงเทพฯ)
                  </option>
                  <option value='Buri Rum'>Buri Rum (บุรีรัมย์)</option>
                  <option value='Bueng Kan'>Bueng Kan (บึงกาฬ)</option>
                  <option value='Chachoengsao'>
                    Chachoengsao (ฉะเชิงเทรา)
                  </option>
                  <option value='Chaiyaphum'>Chaiyaphum (ชัยภูมิ)</option>
                  <option value='Chanthaburi'>Chanthaburi (จันทบุรี)</option>
                  <option value='Chiang Mai'>Chiang Mai (เชียงใหม่)</option>
                  <option value='Chiang Rai'>Chiang Rai (เชียงราย)</option>
                  <option value='Chonburi'>Chonburi (ชลบุรี)</option>
                  <option value='Chumphon'>Chumphon (ชุมพร)</option>
                  <option value='Kalasin'>Kalasin (กาฬสินธุ์)</option>
                  <option value='Kamphaeng Phet'>
                    Kamphaeng Phet (กำแพงเพชร)
                  </option>
                  <option value='Kanchanaburi '>
                    Kanchanaburi (กาญจนบุรี)
                  </option>
                  <option value='Khon Kaen'>Khon Kaen (ขอนแก่น)</option>
                  <option value='Krabi'>Krabi (กระบี่)</option>
                  <option value='Loei'>Loei (เลย)</option>
                  <option value='Lumpang'>Lumpang (ลำปาง)</option>
                  <option value='Lumphun'>Lumphun (ลำพูน)</option>
                  <option value='Mae Hong Son'>
                    Mae Hong Son (แม่ฮ่องสอน)
                  </option>
                  <option value='Maha Sarakham'>
                    Maha Sarakham (มหาสารคาม)
                  </option>
                  <option value='Nakhon Nayok'>Nakhon Nayok (นครนายก)</option>
                  <option value='Nakhon Pathom'>Nakhon Pathom (นครปฐม)</option>
                  <option value='Mukdahan'>Mukdahan (มุกดาหาร)</option>
                  <option value='Nakhon Phanom'>Nakhon Phanom (นครพนม)</option>
                  <option value='Nakhon Ratchasima'>
                    Nakhon Ratchasima (นครนครราชสีมา)
                  </option>
                  <option value='Nakhon Sawan'>Nakhon Sawan (นครสวรรค์)</option>
                  <option value='Nakhon Si Thammarat'>
                    Nakhon Si Thammarat (นครศรีธรรมราช)
                  </option>
                  <option value='Nan'>Nan (น่าน)</option>
                  <option value='Narathiwat'>Narathiwat (นราธิวาส)</option>
                  <option value='Nong Bua Lumphu'>
                    Nong Bua Lumphu (หนองบัวลำภู)
                  </option>
                  <option value='Nong Khai'>Nong Khai (หนองคาย)</option>
                  <option value='Pathum Thani'>Pathum Thani (ปทุมธานี)</option>
                  <option value='Pattani'>Pattani (ปัตตานี)</option>
                  <option value='Phang-nga'>Phang-nga (พังงา)</option>
                  <option value='Phatthalung'>Phatthalung (พัทลุง)</option>
                  <option value='Phayao'>Phayao (พะเยา)</option>
                  <option value='Phetchabun'>Phetchabun (เพชรบูรณ์)</option>
                  <option value='Phetchaburi'>Phetchaburi (เพชรบุรี)</option>
                  <option value='Phichit'>Phichit (พิจิตร)</option>
                  <option value='Phitsanulok'>Phitsanulok (พิษณุโลก)</option>
                  <option value='Phra Nakhon Si Ayutthaya'>
                    Phra Nakhon Si Ayutthaya (อยุธยา)
                  </option>
                  <option value='Phrae'>Phrae (แพร่)</option>
                  <option value='Phuket '>Phuket (ภูเก็ต)</option>
                  <option value='Prachuap Khiri Khan'>
                    Prachuap Khiri Khan (ประจวบคีรีขันธ์)
                  </option>
                  <option value='Ranong'>Ranong (ระนอง)</option>
                  <option value='Ratchaburi'>Ratchaburi (ราชบุรี)</option>
                  <option value='Rayong'>Rayong (ระยอง)</option>
                  <option value='Roi Et'>Roi Et (ร้อยเอ็ด)</option>
                  <option value='Sa Kaeo'>Sa Kaeo (สระแก้ว)</option>
                  <option value='Sakhon Nakhon'>Sakhon Nakhon (สกลนคร)</option>
                  <option value='Samut Prakan'>
                    Samut Prakan (สมุทรปราการ)
                  </option>
                  <option value='Samut Sakhon'>Samut Sakhon (สมุทรสาคร)</option>
                  <option value='Sara Buri'>Sara Buri (สระบุรี)</option>
                  <option value='Satun'>Satun (สตูล)</option>
                  <option value='Sing Buri'>Sing Buri (สิงห์บุรี)</option>
                  <option value='Sisaket'>Sisaket (ศรีสะเกษ)</option>
                  <option value='Songkhla'>Songkhla (สงขลา)</option>
                  <option value='Sukhothai'>Sukhothai (สุโขทัย)</option>
                  <option value='Suphan Buri'>Suphan Buri (สุพรรณบุรี)</option>
                  <option value='Surat Thani'>
                    Surat Thani (สุราษฎร์ธานี)
                  </option>
                  <option value='Surin'>Surin (สุรินทร์)</option>
                  <option value='Tak'>Tak (ตาก)</option>
                  <option value='Trat'>Trat (ตราด)</option>

                  <option value='Ubon Ratchath'>
                    Ubon Ratchath (อุบลราชธานี)
                  </option>
                  <option value='Udon Thani'>Udon Thani (อุดรธานี)</option>
                  <option value='Uthai Thani'>Uthai Thani (อุทัยธานี)</option>
                  <option value='Uttaradit'>Uttaradit (อุตรดิตถ์)</option>
                  <option value='Yala'>Yala (ยะลา)</option>
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
                Zip (รหัสไปรษณีย์)
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-zip'
                type='text'
                placeholder='90210'
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
                country (ประเทศ)
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
        {/* submit button */}
        <button
          type='submit'
          className='w-full text-white bg-rose-600 rounded-md enabled:hover:bg-rose-800 disabled:opacity-75'
          disabled={!isDirty || !isValid}
        >
          Save Change
        </button>
      </form>
    </div>
  )
}
