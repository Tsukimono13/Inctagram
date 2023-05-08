import {getLayout} from "@/components/Layout/Layout";
import {NextPageWithLayout} from "@/pages/_app";

const Home: NextPageWithLayout = () => {
    return (
        <div>
            <h1>Hi Hello Yo-yo Hi</h1>
        </div>
    )
}

Home.getLayout = getLayout
export default Home;

