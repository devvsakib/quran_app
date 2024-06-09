
import { Link } from "react-router-dom";
import Layout from "../../layouts/Layout";
import scholars from "../../datas/biography/scholars.json";
import images from "../../configs/Images";

const Biography = () => {

    return (
        <Layout>
            <div className="my-10">
                <div>
                    <h1 className="text-xl text-center font-semibold">Renowned Scholars</h1>
                </div>
                <div className="grid md:grid-cols-2 gap-10 mt-4">
                    {
                        Object.keys(scholars).map((key, idx) => (
                            <div
                                key={idx}
                            >
                                <h2 className="capitalize mb-5">{key.split("_").join(" ")}</h2>
                                {
                                    scholars[key].map((sheikh, idx) => (
                                        <Link key={idx} to={`/biography/${sheikh.id}`} className="p-5 bg-white rounded-md shadow-md flex  items-center gap-5">
                                            <img src={images[sheikh.id]} alt={sheikh.name}
                                                className="h-[100px] w-[100px] object-cover object-center rounded-md"
                                            />
                                            <div className="font-[poppins]">
                                                <p>Sheikh {sheikh.name}</p>
                                                <div className="text-sm mt-2">
                                                    <p>Nationality: {sheikh.nationality}</p>
                                                    <p>Born: {sheikh.dateOfBirth}</p>
                                                    <p>Died: {sheikh.dateOfDeath}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </Layout>
    );
}

export default Biography;