import { useRouter } from "next/router"
import ListItem from "./ListItem"
import { useState, useEffect, useMemo, createRef } from "react"

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"

// import { useLoadScript } from "@react-google-maps/api"

export default function List({
  setCoordinates,
  childClicked,
  posts,
  province,
  type,
}) {
  const router = useRouter()
  // const { query } = useRouter()
  const [elRefs, setElRefs] = useState([])

  const {
    ready,
    value,
    setValue,
    // suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete()

  console.log("province", province)
  console.log("type", type)
  // console.log("router", router.query)
  // console.log("router.asPath", router.asPath)
  // console.log("router.asPath lenght", router.asPath.length)

  function provinceTitle() {
    if (router.asPath.length > 5) {
      return decodeURIComponent(router.asPath.slice(6))
    } else if (router.asPath.length == 5) {
      return "Main"
    }
    // if (router.query.length !== 0) {
    //   return router.query.province
    // } else if (router.query === 0) {
    //   return <p>Main</p>
    // }
  }

  // const handleSelect = async (val) => {
  //   setValue(val, false)
  //   clearSuggestions()

  //   const results = await getGeocode({ address: val })
  //   const { lat, lng } = await getLatLng(results[0])
  //   setCoordinates({ lat, lng })
  //   router.push(`/main/${val}`)
  // }
  const handleProvinceSelect = async (e) => {
    e.preventDefault()
    const _province = await e.target.value
    // setValue(province, false)
    // alert(province)

    const results = await getGeocode({ address: _province })
    const { lat, lng } = await getLatLng(results[0])
    setCoordinates({ lat, lng })
    router.push(`/main/${_province}`)
  }

  const handleTypeSelect = async (e) => {
    // e.preventDefault()
    const _type = await e.target.value
    // setValue(province, false)
    // alert(province)

    router.push(`/main/${province.province}/${_type}`)
  }

  useEffect(() => {
    const refs = Array(posts?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef())

    setElRefs(refs)
  }, [posts])

  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  //   libraries: ["places", "drawing", "geometry"],
  // })

  // if (!isLoaded) return <div>Loading . . . </div>

  return (
    <div className='h-[92vh] pt-4 px-4 bg-slate-100'>
      <div className=''>
        <div className='flex'>
          <h1 className='text-3xl font-bold'>
            {/* {posts && posts.length != 0 ? posts[0].address.province : "Area"} */}
            {/* provinceTitle() */}
            {province ? province?.province + " / " + type : "Main"}
          </h1>
          <span className='my-auto ml-auto mr-4'>
            - - - {posts?.length || 0} result(s) founded{" "}
          </span>
        </div>

        {/* province-Selector, type-Selector */}
        <div className='grid-list-selector'>
          <div className='inline-block relative w-64'>
            <label className='font-medium'> province: </label>

            <select
              onChange={handleProvinceSelect}
              className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight cursor-pointer focus:outline-none focus:shadow-outline'
            >
              <option value='none' selected disabled hidden>
                Province (?????????????????????)
              </option>
              <option value='Amnat Charoen'>Amnat Charoen (??????????????????????????????)</option>
              <option value='Ang Thong'>Ang Thong (?????????????????????)</option>
              <option value='Bangkok'>Bangkok (????????????????????????)</option>
              <option value='Buri Rum'>Buri Rum (???????????????????????????)</option>
              <option value='Bueng Kan'>Bueng Kan (??????????????????)</option>
              <option value='Chachoengsao'>Chachoengsao (??????????????????????????????)</option>
              <option value='Chaiyaphum'>Chaiyaphum (?????????????????????)</option>
              <option value='Chanthaburi'>Chanthaburi (????????????????????????)</option>
              <option value='Chiang Mai'>Chiang Mai (???????????????????????????)</option>
              <option value='Chiang Rai'>Chiang Rai (????????????????????????)</option>
              <option value='Chonburi'>Chonburi (??????????????????)</option>
              <option value='Chumphon'>Chumphon (???????????????)</option>
              <option value='Kalasin'>Kalasin (???????????????????????????)</option>
              <option value='Kamphaeng Phet'>Kamphaeng Phet (???????????????????????????)</option>
              <option value='Kanchanaburi '>Kanchanaburi (???????????????????????????)</option>
              <option value='Khon Kaen'>Khon Kaen (?????????????????????)</option>
              <option value='Krabi'>Krabi (??????????????????)</option>
              <option value='Loei'>Loei (?????????)</option>
              <option value='Lumpang'>Lumpang (???????????????)</option>
              <option value='Lumphun'>Lumphun (???????????????)</option>
              <option value='Mae Hong Son'>Mae Hong Son (??????????????????????????????)</option>
              <option value='Maha Sarakham'>Maha Sarakham (???????????????????????????)</option>
              <option value='Nakhon Nayok'>Nakhon Nayok (?????????????????????)</option>
              <option value='Nakhon Pathom'>Nakhon Pathom (??????????????????)</option>
              <option value='Mukdahan'>Mukdahan (????????????????????????)</option>
              <option value='Nakhon Phanom'>Nakhon Phanom (??????????????????)</option>
              <option value='Nakhon Ratchasima'>
                Nakhon Ratchasima (???????????????????????????????????????)
              </option>
              <option value='Nakhon Sawan'>Nakhon Sawan (???????????????????????????)</option>
              <option value='Nakhon Si Thammarat'>
                Nakhon Si Thammarat (???????????????????????????????????????)
              </option>
              <option value='Nan'>Nan (????????????)</option>
              <option value='Narathiwat'>Narathiwat (????????????????????????)</option>
              <option value='Nong Bua Lumphu'>
                Nong Bua Lumphu (?????????????????????????????????)
              </option>
              <option value='Nong Khai'>Nong Khai (?????????????????????)</option>
              <option value='Pathum Thani'>Pathum Thani (????????????????????????)</option>
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
              <option value='Sakhon Nakhon'>Sakhon Nakhon (??????????????????)</option>
              <option value='Samut Prakan'>Samut Prakan (?????????????????????????????????)</option>
              <option value='Samut Sakhon'>Samut Sakhon (???????????????????????????)</option>
              <option value='Sara Buri'>Sara Buri (?????????????????????)</option>
              <option value='Satun'>Satun (????????????)</option>
              <option value='Sing Buri'>Sing Buri (???????????????????????????)</option>
              <option value='Sisaket'>Sisaket (????????????????????????)</option>
              <option value='Songkhla'>Songkhla (???????????????)</option>
              <option value='Sukhothai'>Sukhothai (?????????????????????)</option>
              <option value='Suphan Buri'>Suphan Buri (??????????????????????????????)</option>
              <option value='Surat Thani'>Surat Thani (????????????????????????????????????)</option>
              <option value='Surin'>Surin (????????????????????????)</option>
              <option value='Tak'>Tak (?????????)</option>
              <option value='Trat'>Trat (????????????)</option>
              <option value='Ubon Ratchath'>Ubon Ratchath (?????????????????????????????????)</option>
              <option value='Udon Thani'>Udon Thani (????????????????????????)</option>
              <option value='Uthai Thani'>Uthai Thani (???????????????????????????)</option>
              <option value='Uttaradit'>Uttaradit (???????????????????????????)</option>
              <option value='Yala'>Yala (????????????)</option>
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
            <select
              onChange={handleTypeSelect}
              className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight cursor-pointer focus:outline-none focus:shadow-outline '
              disabled={!province && posts?.length == 0}
            >
              <option value='none' selected disabled hidden>
                type (??????????????????)
              </option>
              <option value='all'>All (?????????????????????)</option>
              <option value='Vacant Land'>Vacant Land (?????????????????????????????????)</option>
              <option value='Real Estate'>Real Estate (????????????)</option>
              <option value='Property'>
                Property (????????????????????????????????????????????????????????????????????????)
              </option>
              <option value='Service'>Service (??????????????????)</option>
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

      <div className='grid-list-items'>
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
