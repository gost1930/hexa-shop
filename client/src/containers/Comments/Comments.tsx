import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import ErrorPage from '../ErrorPages/ErrorPage';
import Spiner from '../ErrorPages/Spiner';
import { FaBars } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const Comments = ({ id }: { id: string }) => {
    const [show, setShow] = useState<boolean>(false);
    const handlShow = () => setShow(p => !p);

    const { data, loading, error } = useFetch(`rate/${id}`, "GET");

    if (error) return <ErrorPage text='Something went wrong' />
    if (loading) return <Spiner />

    return (
        <section className='w-full h-full my-4 border-2 border-gray-500 border-dashed rounded-lg p-3 overflow-y-hidden'>
            <div className='flex items-center justify-between w-full'>
                <h1 className='text-xl text-dark/95 dark:text-gray-200 mb-2'>Comments:</h1>
                <FaBars className='text-2xl cursor-pointer dark:text-gray-200' onClick={handlShow} />
            </div>

            <AnimatePresence>
                {show && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-start gap-2 max-h-[50vh] overflow-y-auto overflow-x-hidden pr-5 pl-2"
                    >
                        {data && data.length > 0 ? (
                            data.map((c: any) => (
                                <div key={c.id} className='p-2 rounded-b-lg rounded-tr-lg bg-gray-100 dark:bg-gray-900 w-full relative mx-2'>
                                    <div className='absolute top-[4px] -left-2 w-5 h-5 rotate-45 transform bg-gray-100 dark:bg-gray-900'></div>
                                    <div className='flex gap-x-2 justify-between'>
                                        <h1 className='text-base text-black/95 dark:text-gray-200 z-10'>
                                            {c.username.charAt(0).toUpperCase() + c.username.slice(1)}
                                        </h1>
                                        <p className='text-sm text-zinc-500 dark:text-gray-200'>
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
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Comments;
