import { useEffect, useState } from "react";  
import { FcSimCardChip } from "react-icons/fc";  
import { LuNfc } from "react-icons/lu";  

export default function CardComponents({ nome, numero }) {  
  const [sideCartao, setSideCartao] = useState("front");  

  useEffect(() => {  
    console.log(sideCartao);  
  }, [sideCartao]);  

  return (  
    <div  
      onMouseEnter={() => setSideCartao("back")}  
      onMouseLeave={() => setSideCartao("front")}  
      className=""  
    >  
      {sideCartao === "front" ? (  
        <div className="w-[480px] h-[280px] bg-black rounded-[20px] mt-[30px] ml-[70px]">  
          <div className="w-full h-[30%] flex">  
            <div className="w-[30%] h-full flex items-center justify-center gap-[5px]">  
              <div className="bg-gray-50 w-[70px] h-[70px] rounded-full"></div>  
              <div className="bg-gray-50 w-[50px] h-[50px] rounded-full"></div>  
            </div>  
            <div className="w-[70%] h-full flex items-start justify-end pr-[20px] pt-[15px]">  
              <p className="text-[23px] text-white font-bold">Banco Safra</p>  
            </div>  
          </div>  
          <div className="w-full h-[30%] pl-[20px] flex items-center">  
            <FcSimCardChip size={80} />  
            <LuNfc size={30} color="#ffffff" />  
          </div>  
          <div className="w-full pl-[27px]">  
            <p className="text-[30px] text-white">{numero || "0000 0000 0000 0000"}</p>  
            <p className="text-white text-[20px] font-bold">{nome || "Nome do Cartão"}</p>  
          </div>  
        </div>  
      ) : (  
        <div className="w-[480px] h-[280px] bg-gray-800 rounded-[20px] mt-[30px] ml-[70px] flex items-center justify-center text-white">  
           <div className="w-full h-[30%] flex items-end">
              <div className="w-full h-[75%] bg-neutral-900"></div>
            </div>
            <div className="w-full h-[70%] flex justify-center pt-[30px]">
                <div className="w-[70%] h-[55px] bg-gray-500 flex justify-end items-center pr-[20px]">
                  <p className="text-[26px]">000</p>
                </div>
            </div>
          </div>  
      )}  
    </div>  
  );  
}  