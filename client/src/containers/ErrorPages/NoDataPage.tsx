import img from "../../assets/no-data.png";
const NoDataPage = () => {
  return (
    <section className="h-full flex flex-col items-center justify-center">
        <img src={img} alt="" className="w-1/2 h-1/2" />
    </section>
  )
}

export default NoDataPage;
