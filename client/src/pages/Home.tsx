import { CategoryContainer, CategorieSection } from "../containers";
import { Divider } from "../components";
const Home = () => {
    return (
        <main className="min-h-screen dark:bg-gray-800">
            <CategoryContainer />
            <CategorieSection
            type="mens" 
            title="Men's Latest" 
            subTitle="Details to details is what makes Hexashop different from the other themes."
            catName="mens"
            />
            <Divider />
            <CategorieSection
            type="womens"
            title="Women's Latest" 
            subTitle="Details to details is what makes Hexashop different from the other themes."
            catName="womens"
            />
            <Divider />
            <CategorieSection
            type="kids"
            title="Kid's Latest" 
            subTitle="Details to details is what makes Hexashop different from the other themes."
            catName="kids"
            />
            <Divider />

        </main>
    )
};

export default Home;