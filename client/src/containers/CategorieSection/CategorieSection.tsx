import React from 'react'
import { SwiperSlide } from "swiper/react";
import useFetch from "../../hooks/useFetch";
// Ui comp
import { Card, Swiper } from "../../components";
import { Spiner, ErrorPage, NoDataPage } from "../../containers";

interface Prop {
    title: string
    subTitle: string
    // children: any
    catName: string
    type: string
}



const CategorieSection: React.FC<Prop> = ({ title, subTitle, catName, type }) => {
    const { data, loading, error } = useFetch(`product/getByCategoryName/${catName}`, "GET");

    console.log("data :", data?.data)

    if (loading) return <Spiner />;
    if (error) return <ErrorPage text={error} />;
    if (!data?.data || data?.data.length <= 1) return <NoDataPage />;
    return (
        <section className="mx-5 md:mx-40 my-20 -w-full">
            <h1 className="text-black/95 dark:text-gray-100 text-4xl font-bold">{title}</h1>
            <p className="text-gray-400 italic mt-3 mb-14">{subTitle}</p>
            <div className="grid place-content-center w-full">
                <Swiper type={type}>
                    {
                        data?.data.map((p, index) => (
                            <SwiperSlide key={index} className="relative overflow-hidden max-w-full">
                                <Card name={p.name} price={p.price} id={p.id} img={JSON.parse(p.img)?.[0]} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    )
}

export default CategorieSection;
