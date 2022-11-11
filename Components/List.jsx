import { useRouter } from "next/router"
import ListItem from "./ListItem"
import { useState, useEffect, useMemo, createRef } from "react"
// import { getPostsWithProvince, db } from "../lib/firebaseConfig"
// import { collection, getDocs } from "firebase/firestore"

// import { matchSorter } from "match-sorter"
// import debounce from "lodash.debounce"
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox"
import "@reach/combobox/styles.css"

export default function List({ setCoordinates, childClicked, posts }) {
  const router = useRouter()
  const [elRefs, setElRefs] = useState([])

  const {
    ready,
    value,
    setValue,
    // suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete()

  const handleSelect = async (val) => {
    setValue(val, false)
    clearSuggestions()

    const results = await getGeocode({ address: val })
    const { lat, lng } = await getLatLng(results[0])
    setCoordinates({ lat, lng })
    router.push(`/main/${val}`)
  }
  const handleChoose = async (e) => {
    e.preventDefault()
    const province = await e.target.value
    setValue(province, false)
    // alert(province)

    const results = await getGeocode({ address: province })
    const { lat, lng } = await getLatLng(results[0])
    setCoordinates({ lat, lng })
    router.push(`/main/${province}`)
  }

  useEffect(() => {
    const refs = Array(posts?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef())

    setElRefs(refs)
  }, [posts])

  return (
    <div className='pt-4 px-4'>
      <div className=''>
        <div className='flex'>
          <h1 className='text-3xl font-bold'>
            {posts && posts.length != 0 ? posts[0].address.province : "Area"}
          </h1>
          <span className='my-auto ml-auto mr-4'>
            - - - {posts?.length || 0} result(s) founded{" "}
          </span>
        </div>

        {/* province-Selector, type-Selector */}
        <div className='grid grid-cols-2 gap-1'>
          <div className='inline-block relative w-64'>
            <label className='font-medium'> province: </label>
            {/* <Combobox onSelect={handleSelect}>
              <ComboboxInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                className='appearance-none block w-full bg-white text-gray-700  border-gray-400  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                placeholder='Search Province'
              />
              <ComboboxPopover>
                <ComboboxList className='max-h-44 overflow-auto'>
                  
                {status === "OK" &&
                    data.map(({ place_id, description }) => (
                      <ComboboxOption key={place_id} value={description} />
                    ))} 
                    
                  <ComboboxOption value='Nong Bua Lamphu'>
                    Nong Bua Lamphu ()
                  </ComboboxOption>
                  <ComboboxOption value='Samut Prakan'>
                    Samut Prakan ()
                  </ComboboxOption>
                  <ComboboxOption value='Suphan Buri'>
                    Suphan Buri(สุพรรณบุรี)
                  </ComboboxOption>
                  <ComboboxOption value='Amnat Charoen'>
                    Amnat Charoen ()
                  </ComboboxOption>

                  <ComboboxOption value='Ang Thong'>
                    Ang Thong ()
                  </ComboboxOption>
                  <ComboboxOption value='Bangkok'>
                    Bangkok (กรุงเทพฯ)
                  </ComboboxOption>
                  <ComboboxOption value='Buri Rum'>Buri Rum ()</ComboboxOption>
                  <ComboboxOption value='Bueng Kan'>
                    Bueng Kan ()
                  </ComboboxOption>
                  <ComboboxOption value='Chachoengsao'>
                    Chachoengsao ()
                  </ComboboxOption>
                  <ComboboxOption value='Chaiyaphum'>
                    Chaiyaphum ()
                  </ComboboxOption>
                  <ComboboxOption value='Chanthaburi'>
                    Chanthaburi ()
                  </ComboboxOption>
                  <ComboboxOption value='Chiang Mai'>
                    Chiang Mai ()
                  </ComboboxOption>
                  <ComboboxOption value='Chiang Rai'>
                    Chiang Rai ()
                  </ComboboxOption>
                  <ComboboxOption value='Chonburi'>Chonburi ()</ComboboxOption>
                  <ComboboxOption value='Kalasin'>Kalasin ()</ComboboxOption>
                  <ComboboxOption value='Kamphaeng Phet'>
                    Kamphaeng Phet ()
                  </ComboboxOption>
                  <ComboboxOption value='Khon Kaen'>
                    Khon Kaen ()
                  </ComboboxOption>
                  <ComboboxOption value='Loei'>Loei ()</ComboboxOption>
                  <ComboboxOption value='Lumpang'>Lumpang ()</ComboboxOption>
                  <ComboboxOption value='Lumphun'>Lumphun ()</ComboboxOption>
                  <ComboboxOption value='Mae Hong Son'>
                    Mae Hong Son ()
                  </ComboboxOption>
                  <ComboboxOption value='Maha Sarakham'>
                    Maha Sarakham ()
                  </ComboboxOption>
                  <ComboboxOption value='Nakhon Nayok'>
                    Nakhon Nayok ()
                  </ComboboxOption>
                  <ComboboxOption value='Mukdahan'>Mukdahan ()</ComboboxOption>
                  <ComboboxOption value='Nakhon Phanom'>
                    Nakhon Phanom ()
                  </ComboboxOption>
                  <ComboboxOption value='Nakhon Ratchasima'>
                    Nakhon Ratchasima ()
                  </ComboboxOption>
                  <ComboboxOption value='Nakhon Sawan'>
                    Nakhon Sawan ()
                  </ComboboxOption>
                  <ComboboxOption value='Nan'>Nan ()</ComboboxOption>
                  <ComboboxOption value='Nong Khai'>Nong Khai()</ComboboxOption>
                  <ComboboxOption value='Pathum Thani'>
                    Pathum Thani ()
                  </ComboboxOption>
                  <ComboboxOption value='Nong Bua Lumphu'>
                    Nong Bua Lumphu ()
                  </ComboboxOption>
                  <ComboboxOption value='Phayao'>Phayao ()</ComboboxOption>
                  <ComboboxOption value='Phetchabun'>
                    Phetchabun ()
                  </ComboboxOption>
                  <ComboboxOption value='Phichit'>Phichit ()</ComboboxOption>
                  <ComboboxOption value='Phitsanulok'>
                    Phitsanulok ()
                  </ComboboxOption>
                  <ComboboxOption value='Phra Nakhon Si Ayutthaya'>
                    Phra Nakhon Si Ayutthaya ()
                  </ComboboxOption>
                  <ComboboxOption value='Phrae'>Phrae ()</ComboboxOption>
                  <ComboboxOption value='Rayong'>Rayong ()</ComboboxOption>
                  <ComboboxOption value='Roi Et'>Roi Et ()</ComboboxOption>
                  <ComboboxOption value='SaKaeo'>SaKaeo ()</ComboboxOption>

                  <ComboboxOption value='Sakhon Nakhon'>
                    Sakhon Nakhon()
                  </ComboboxOption>
                  <ComboboxOption value='Sara Buri'>
                    Sara Buri ()
                  </ComboboxOption>
                  <ComboboxOption value='Sing Buri'>
                    Sing Buri ()
                  </ComboboxOption>
                  <ComboboxOption value='Sisaket'>Sisaket ()</ComboboxOption>
                  <ComboboxOption value='Sukhothai'>
                    Sukhothai ()
                  </ComboboxOption>
                  <ComboboxOption value='Surin'>Surin ()</ComboboxOption>
                  <ComboboxOption value='Tak'>Tak ()</ComboboxOption>
                  <ComboboxOption value='Trat'>Trat ()</ComboboxOption>

                  <ComboboxOption value='Ubon Ratchath'>
                    Ubon Ratchath ()
                  </ComboboxOption>
                  <ComboboxOption value='Udon Thani'>
                    Udon Thani ()
                  </ComboboxOption>
                  <ComboboxOption value='Uthai Thani'>
                    Uthai Thani ()
                  </ComboboxOption>
                  <ComboboxOption value='Uttaradit'>
                    Uttaradit ()
                  </ComboboxOption>
                </ComboboxList>
              </ComboboxPopover>
            </Combobox>  */}
            <select
              onChange={handleChoose}
              className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight cursor-pointer focus:outline-none focus:shadow-outline '
            >
              <option value='Amnat Charoen'>Amnat Charoen (อำนาจเจริญ)</option>
              <option value='Ang Thong'>Ang Thong (อ่างทอง)</option>
              <option value='Bangkok'>Bangkok (กรุงเทพฯ)</option>
              <option value='Buri Rum'>Buri Rum (บุรีรัมย์)</option>
              <option value='Bueng Kan'>Bueng Kan (บึงกาฬ)</option>
              <option value='Chachoengsao'>Chachoengsao (ฉะเชิงเทรา)</option>
              <option value='Chaiyaphum'>Chaiyaphum (ชัยภูมิ)</option>
              <option value='Chanthaburi'>Chanthaburi (จันทบุรี)</option>
              <option value='Chiang Mai'>Chiang Mai (เชียงใหม่)</option>
              <option value='Chiang Rai'>Chiang Rai (เชียงราย)</option>
              <option value='Chonburi'>Chonburi (ชลบุรี)</option>
              <option value='Chumphon'>Chumphon (ชุมพร)</option>
              <option value='Kalasin'>Kalasin (กาฬสินธุ์)</option>
              <option value='Kamphaeng Phet'>Kamphaeng Phet (กำแพงเพชร)</option>
              <option value='Kanchanaburi '>Kanchanaburi (กาญจนบุรี)</option>
              <option value='Khon Kaen'>Khon Kaen (ขอนแก่น)</option>
              <option value='Krabi'>Krabi (กระบี่)</option>
              <option value='Loei'>Loei (เลย)</option>
              <option value='Lumpang'>Lumpang (ลำปาง)</option>
              <option value='Lumphun'>Lumphun (ลำพูน)</option>
              <option value='Mae Hong Son'>Mae Hong Son (แม่ฮ่องสอน)</option>
              <option value='Maha Sarakham'>Maha Sarakham (มหาสารคาม)</option>
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
              <option value='Samut Prakan'>Samut Prakan (สมุทรปราการ)</option>
              <option value='Samut Sakhon'>Samut Sakhon (สมุทรสาคร)</option>
              <option value='Sara Buri'>Sara Buri (สระบุรี)</option>
              <option value='Satun'>Satun (สตูล)</option>
              <option value='Sing Buri'>Sing Buri (สิงห์บุรี)</option>
              <option value='Sisaket'>Sisaket (ศรีสะเกษ)</option>
              <option value='Songkhla'>Songkhla (สงขลา)</option>
              <option value='Sukhothai'>Sukhothai (สุโขทัย)</option>
              <option value='Suphan Buri'>Suphan Buri (สุพรรณบุรี)</option>
              <option value='Surat Thani'>Surat Thani (สุราษฎร์ธานี)</option>
              <option value='Surin'>Surin (สุรินทร์)</option>
              <option value='Tak'>Tak (ตาก)</option>
              <option value='Trat'>Trat (ตราด)</option>
              <option value='Ubon Ratchath'>Ubon Ratchath (อุบลราชธานี)</option>
              <option value='Udon Thani'>Udon Thani (อุดรธานี)</option>
              <option value='Uthai Thani'>Uthai Thani (อุทัยธานี)</option>
              <option value='Uttaradit'>Uttaradit (อุตรดิตถ์)</option>
              <option value='Yala'>Yala (ยะลา)</option>
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pt-6 px-2 text-gray-700'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>
          <div className='inline-block relative w-64'>
            <label className='font-medium'> type of service: </label>
            <select className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight cursor-pointer focus:outline-none focus:shadow-outline '>
              <option>Vacant Land (ที่ดินเปล่า)</option>
              <option>Real Estate (บ้าน)</option>
              <option>Property (สิ่งปลูกสร้างพร้อมที่ดิน)</option>
              <option>Service (บริการ)</option>
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pt-6 px-2 text-gray-700'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>
        </div>
        {/* <div className='inline-block relative w-64'>
          <input
            className='appearance-none block w-full my-2 bg-white text-gray-700  border-gray-400  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='search-box'
            type='text'
            placeholder='Search'
          />
        </div> */}
      </div>

      <div className='grid grid-cols-2 h-[73vh] mt-2 overflow-auto'>
        {posts?.map((post, i) => (
          <div className=' m-2 ' ref={elRefs[i]} key={i}>
            <ListItem
              key={i}
              post={post}
              selected={Number(childClicked) === i}
              refProp={elRefs[i]}
            />
          </div>
        ))}
        {!posts && (
          <div className='col-span-2'>
            <h3 className='text-2xl'>--- Please Choose Province ---</h3>
          </div>
        )}
        {posts?.length == 0 && (
          <div className='col-span-2'>
            <h3 className='text-2xl'>
              --- No place posted on this province yet ---
            </h3>
          </div>
        )}
      </div>
    </div>
  )
}

// TODO: imporve Combobox search suggestion
