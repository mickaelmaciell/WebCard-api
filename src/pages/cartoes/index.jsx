import CardComponents from "../../components/CardComponent";

export default function PageCartoes(){
    return (
        <div className="w-[100%] h-screen flex flex-col bg-cyan-100">
            <div className="w-full h-[15%] flex items-center justify-center">
                <h1 className="text-[28px] font-bold">Cartões cadastrados</h1>
            </div>
            <div className="w-full h-auto grid">
                <CardComponents nome="" numero=""/>
            </div>
        </div>
    )
}