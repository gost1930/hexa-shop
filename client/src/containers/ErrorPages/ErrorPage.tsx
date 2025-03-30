
const ErrorPage = ({text} : {text:string}) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-5">
        <h1 className="text-8xl text-black/95 text-shadow dark:text-gray-100">404</h1>
        <h2 className='text-2xl text-black/95 text-shadow dark:text-gray-100'>{text}</h2>
    </div>
  )
}

export default ErrorPage;
