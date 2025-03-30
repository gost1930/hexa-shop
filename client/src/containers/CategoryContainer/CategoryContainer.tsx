import React, { useEffect } from 'react'
// img
import img from "../../assets/left-banner-image.jpg"
// components
import { CategoriesCard, Button } from "../../components";
import useFetch from '../../hooks/useFetch';
import Spiner from '../ErrorPages/Spiner';
import NoDataPage from '../ErrorPages/NoDataPage';
import ErrorPage from '../ErrorPages/ErrorPage';
const CategoryContainer = () => {
    const { data: dataCategory, loading: loadingCategory, error: errorCategory } = useFetch("category", "GET");




    return (
        <section className="flex flex-col md:flex-row gap-4 pt-12 px-6 h-fit">

            <div className="relative md:w-1/2">
                <img src={img} alt="cat-left" className='min-w-full' />
                <div className="flex flex-col items-center justify-center w-full
                absolute top-1/2 md:left-16  -translate-y-1/2 md:-translate-x-10
                gap-y-5
            " >
                    <h1 className="text-3xl md:text-5xl font-bold text-white" >We Are Hexashop</h1>
                    <p className="italic font-semibold text-white"> Awesome, clean & creative HTML5 Template </p>
                    <Button title="Purchase Now!" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:w-1/2 md:h-auto h-[100vh]">

            {
                    loadingCategory ? <Spiner /> :
                        !dataCategory?.categories || dataCategory?.categories.length <= 1 ?
                            <NoDataPage /> :
                            errorCategory ?
                                <ErrorPage text={errorCategory} /> :
                                dataCategory?.categories.slice(0, 4).map((c: any, index: number) => (
                                    <CategoriesCard key={index} img={`http://localhost:3001/${c.img}`} name={c.name.charAt(0).toUpperCase() + c.name.slice(1)} />
                                ))

                }

                {/* {dataCategory?.categories.slice(0, 4).map((c : any, index : number) => (
                    <CategoriesCard key={index} img={`http://localhost:3001/${c.img}`} name={c.name.charAt(0).toUpperCase() + c.name.slice(1)} />
                ))} */}


            </div>

        </section>
    )
}

export default CategoryContainer;
