
const StaticCard = ({title , icon , money} : {title : string , icon : any , money : string | number}) => {
  return (
    <div className='bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg dark:shadow-2xl flex items-center gap-5'>
      <div className="dark:text-gray-200 text-8xl h-fit">
        {icon}
      </div>
        <div className='flex flex-col justify-between w-2/3 gap-y-4'>
            <h1 className='text-2xl font-semibold dark:text-gray-200'>{title}</h1>
            <p className="text-zinc-500 dark:text-gray-200">{money} Da</p>
        </div>
    </div>
  )
}

export default StaticCard;
