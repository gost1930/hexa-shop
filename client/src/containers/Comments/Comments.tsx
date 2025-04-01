import useFetch from '../../hooks/useFetch';
import ErrorPage from '../ErrorPages/ErrorPage';
import Spiner from '../ErrorPages/Spiner';

const Comments = ({ id }: { id: string }) => {
    const { data, loading, error } = useFetch(`rate/${id}`, "GET");

    if (error) return <ErrorPage text='Something went wrong' />
    if (loading) return <Spiner />

    return (
        <section className='w-full h-full my-4 border-2 border-gray-500 border-dashed rounded-lg p-3'>
            <h1 className='text-xl text-dark/95 dark:text-gray-200 mb-2'>Comments:</h1>
            <div className="flex flex-col items-start gap-2">
                {data && data.length > 0 ? (
                    data.map((c: any) => (
                        <div key={c.id} className='p-2 rounded-b-lg rounded-tr-lg bg-gray-100 dark:bg-gray-900 w-full relative mx-2'>
                            <div className='absolute top-[4px] -left-2 w-5 h-5 rotate-45 transform bg-gray-100 dark:bg-gray-900'></div>
                            <div className='flex gap-x-2 justify-between'>
                                <h1 className='text-base text-black/95 dark:text-gray-200 z-10' aria-label={`Username: ${c.username}`}>
                                    {c.username.charAt(0).toUpperCase() + c.username.slice(1)}
                                </h1>
                                <p className='text-sm text-zinc-500 dark:text-gray-200' aria-label={`Rate: ${c.rate}`}>
                                    Rate {c.rate}
                                </p>
                            </div>
                            <p className="text-sm text-zinc-500 dark:text-gray-200">{c.review}</p>
                        </div>
                    ))
                ) : (
                    <div className='flex flex-col items-center justify-center gap-1 w-full text-center'>
                        <h1 className='text-lg text-black/95 dark:text-gray-300'>No comments</h1>
                        <p className="text-sm text-zinc-500 dark:text-gray-400 italic">Feel free to add a comment</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Comments;
