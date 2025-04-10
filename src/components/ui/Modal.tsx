import { Dialog } from "primereact/dialog";
import React from "react";
import { IoMdClose } from "react-icons/io";
import bank from "../../assets/icons/bank.svg";
import card from "../../assets/icons/card.svg";
import circle from "../../assets/icons/circle.svg";
import plus from "../../assets/icons/plus.svg";
import circlefilled from "../../assets/icons/circle-filled.svg";
import TextInput from "../Forms/TextInput";

interface ModalProps {
  visible: boolean;
  onHide: () => void;
}
const Modal = (props: ModalProps) => {
  const options = [
    {
      id: 1,
      image: bank,
      name: "Bank Transfer",
      value: "bank",
    },
    {
      id: 2,
      image: card,
      name: "Add Debit Card",
      value: "card",
    },
  ];
  const [selectedOption, setselectedOption] = React.useState(options[0]);
  const [next, setnext] = React.useState(false);
  return (
    <Dialog
      onHide={props.onHide}
      visible={props.visible}
      className="w-full max-w-[500px] flex flex-col gap-6 relative py-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-[#FFFFFF] rounded-xl"
      content={() => (
        <>
          {next ? (
            <>
              <div className="flex items-center justify-between border-b-[.5px] border-b-[#E6E8F0] p-6">
                <div className="flex items-center">
                  <h1 className="text-2xl font-semibold text-[#1D1D1D] tracking-[-2%]">
                    Payment Details
                  </h1>
                  <p className="text-[#4F4F4F] mt-2 mb-6 whitespace-pre-line leading-[200%]"></p>
                </div>
                <IoMdClose
                  className="text-xl cursor-pointer"
                  onClick={props.onHide}
                />
              </div>
              <ul className="px-6 space-y-4">
                <TextInput
                  label="Card details"
                  type="number"
                  onChange={() => {}}
                  name="cardnumber"
                  high={true}
                />
                <TextInput
                  label="Expirt Date"
                  type="date"
                  onChange={() => {}}
                  name="date"
                  high={true}
                />
                <TextInput
                  label="CVV"
                  type="number"
                  onChange={() => {}}
                  name="cvv"
                  high={true}
                />
              </ul>

              <div className="p-6">
                <button
                  onClick={props.onHide}
                  className="w-full bg-[#F9D900] rounded-lg py-4 font-semibold"
                >
                  {"Pay Now"}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between border-b-[.5px] border-b-[#E6E8F0] p-6">
                <div className="flex items-center">
                  <h1 className="text-2xl font-semibold text-[#1D1D1D] tracking-[-2%]">
                    Payment Option
                  </h1>
                  <p className="text-[#4F4F4F] mt-2 mb-6 whitespace-pre-line leading-[200%]"></p>
                </div>
                <IoMdClose
                  className="text-xl cursor-pointer"
                  onClick={props.onHide}
                />
              </div>
              <ul className="px-6 space-y-4">
                {options.map((option: any) => {
                  const active = selectedOption.name == option.name;
                  return (
                    <li
                      key={option.id}
                      onClick={() => setselectedOption(option)}
                      className={`flex items-center cursor-pointer justify-between p-5 border rounded-lg  ${
                        !active ? "border-[#D8DAE5]" : "#5E5204"
                      }`}
                    >
                      <div className="flex gap-4">
                        <img src={option.image} alt={option.name} />
                        <h1 className="font-semibold text-[#474D66]">
                          {option.name}
                        </h1>
                      </div>
                      <img src={active ? circlefilled : circle} alt="" />
                    </li>
                  );
                })}
                <li
                  className={`flex items-center cursor-pointer justify-between p-5 
                `}
                >
                  <div className="flex gap-4">
                    <img src={plus} alt={"add"} />
                    <h1 className="font-semibold text-[#474D66]">
                      Add payment method
                    </h1>
                  </div>
                </li>
              </ul>

              <div className="p-6">
                <button
                  onClick={() => setnext(true)}
                  className="w-full bg-[#F9D900] rounded-lg py-4 font-semibold"
                >
                  {"Continue"}
                </button>
              </div>
            </>
          )}
        </>
      )}
    />
  );
};

export default Modal;
