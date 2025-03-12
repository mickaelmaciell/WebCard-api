import { useEffect, useState } from "react";
import CardComponent from "../../components/CardComponent";
import instance from "../../api/instance";

export default function PageCartoes(){
    const [cartoes, setCartoes] = useState([])

    async function getCartoes(){
        const response = await instance.get("/creditcards")
            setCartoes(response.data)
}
    useEffect(() => {
        getCartoes()
    }, [])
    return (
        <div className="w-[100%] h-screen flex flex-col bg-cyan-100">
            <div className="w-full h-[15%] flex items-center justify-center">
                <h1 className="text-[28px] font-bold">Cartões cadastrados</h1>
            </div>
            <div className="w-full h-auto flex flex-wrap">
                {cartoes.map((event) => {
                    return <CardComponent key={event._id} nome={event.name} numero={event.number}/>
                })}
            </div>
        </div>
    )
}