import { PEOPLE_URL } from "@/constants";
import Image from "next/image";

interface CampProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  peopleJoined: string;
}

const CampSite = ({backgroundImage, title, subtitle, peopleJoined}: CampProps) => {
  return (
    <div className={`h-full w-full min-w-[1100px] ${backgroundImage} bg-cover bg-no-repeat rounded-2xl lg:rounded-r-4xl 2xl:rounded-5xl`}>
      <div className="flex h-full flex-col items-start justify-between p-6 lg:px-20 lg:py-10">
        <div className="flexCenter gap-4 pr-4 bg-white rounded-xl">
          <div className=" bg-green-50 p-4 rounded-xl">
          <Image
              src='/folded-map.svg'
              alt='map'
              width={34}
              height={34}
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <h4 className="bold-18 text-gray-90">{title}</h4>
            <p className="regular-14 text-gray-30">{subtitle}</p>
          </div>
        </div>

        <div className="flexCenter gap-6">
          <span className="flex -space-x-3 overflow-hidden">
            {PEOPLE_URL.map((url, idx) => (
              <Image
              className="inline-block h-10 w-10 rounded-full"
              src={url}
              key={url || idx}
              alt='avatars'
              width={52}
              height={52}
              />
            ))}
          </span>
          <p className="bold-16 md:bold-20 text-white">{peopleJoined}</p>
        </div>
      </div>
    </div>
  )
}

const Camp = () => {
  return (
    <section className='2xl:max-container relative flex flex-col py-10 lg:mb-10 lg:py-20 xl:mb-20'>

      <div className='hide-scrollbar flex h-[340px] w-full items-start justify-start gap-8 overflow-x-auto lg:h-[400px] xl:h-[640px]'>

        <CampSite 
        backgroundImage='bg-bg-img-2'
        title='Islang Pantopiko Camp'
        subtitle='Anislag, Daraga'
        peopleJoined='50+ Joined'
        />

        <CampSite 
        backgroundImage='bg-bg-img-1'
        title='Isdang Katoliko Camp'
        subtitle='Legazpi, Albay'
        peopleJoined='50+ Joined'
        />
      </div>

      <div className="flexEnd mt-10 px-6 lg:-mt-60 lg:mr-6">
        <div className="bg-green-50 p-8 lg:max-[500px] xl:max-w-[736px] xl:rounded-5xl xl:p-16 xl:py-20 relative w-full overflow-hidden rounded-3xl">
          <h2 className="regular-24 md:regular-32 2xl:regular-54 text-white">
            <strong>Feeling Lost?</strong> hahaha dasurb sana di ka maligaw
          </h2>
          <p className="regular-14 xl:regular-16 mt-5 text-white">
          Sino bang nagsabi na kailangan kong mauna, hindi naman ito karera puwedeng magdahan-dahan, sa bawat panibagong umaga, ang pagsimula muli ay isang tagumpay na
          </p>

          <Image
            src={"/quote.svg"}
            alt="camp-2"
            height={186}
            width={219}
            className="camp-quote"
          />
        </div>
      </div>
    </section>
  )
}

export default Camp