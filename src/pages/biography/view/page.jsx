import { useParams } from "react-router-dom";
import Layout from "../../../layouts/Layout";
import scholarsData from "../../../datas/biography/scholars.json";
import { useEffect, useState } from "react";
import Breadcrumb from "../../../components/CustomComponents/Breadcrumb";
import images from "../../../configs/Images";

const SheikhBio = () => {
    const { sheikhname } = useParams();
    const [sheikh, setSheikh] = useState({});

    useEffect(() => {
        const sheikhData = scholarsData.great_imams.find(sheikh => sheikh.id === sheikhname)
            || scholarsData.recent_renowned_scholars.find(sheikh => sheikh.id === sheikhname);
        if (sheikhData) {
            document.title = `Sheikh ${sheikhData.name} - Biography`;
            setSheikh(sheikhData);
        } else {
            console.error("Scholar not found");
        }
    }, [sheikhname]);

    return (
        <Layout>
            <div className="py-5">
                <h1 className="text-xl md:text-2xl text-center font-semibold mt-10">Sheikh {sheikh.name}</h1>
            </div>
            <div className="my-5">
                <Breadcrumb
                    className="text-xs mb-12"
                    items={[
                        { title: "Biography", href: "/biography" },
                        { title: "Sheikh " + sheikh.name },
                    ]}
                />

                <div className="grid grid-cols-5">
                    <div className="col-span-5 md:col-span-2">
                        <img src={images[sheikh.id]} alt={sheikh.name}
                            className="h-[250px] w-[250px] object-cover object-center rounded-md"
                        />
                        <div className="font-[poppins]">
                            <div className="text-sm mt-2">
                                <p>Nationality: {sheikh.nationality}</p>
                                <p>Born: {sheikh.dateOfBirth}</p>
                                <p>Died: {sheikh.dateOfDeath}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3">
                        {sheikh && sheikh.biography && Object.keys(sheikh.biography).map((key, idx) => (
                            <div key={idx} className="mb-5">
                                <h1 className="text-lg font-semibold capitalize">{key.split("_").join(" ")}</h1>
                                <div className="text-sm mt-2">
                                    {Array.isArray(sheikh.biography[key]) ? (
                                        sheikh.biography[key].map((item, idx) => (
                                            <div key={idx} className="mb-2">
                                                <h2 className="text-lg font-mono">{item.title}</h2>
                                                <p className="ml-2">- {item.description}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>{sheikh.biography[key]}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </Layout>
    )
}

export default SheikhBio