import { Arimo, Josefin_Sans } from "@next/font/google";
import { useState } from "react";
import { HiEye } from "react-icons/hi";
import { MdEdit, MdPersonRemove, MdRemove } from "react-icons/md";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#12131B",
    color: "white",
    padding: "2rem",
  },
};

Modal.setAppElement("#root");
const title = Arimo({ weight: "700", subsets: ["latin"] });
const buttontitle = Josefin_Sans({ weight: "400", subsets: ["latin"] });
type CardProps = {
  name: string;
  age: number;
  on: number;
  doctor: string;
  records: string[];
};
const Patient = (props: CardProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    console.log("hi");
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="h-36 p-4 m-4 ">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-col justify-between space-y-6">
          <h1 className="text-2xl">Records</h1>
          {props.records.map((x) => {
            return <li>{x}</li>;
          })}
          <button
            className="rounded-full bg-rose-700 px-4 py-1"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </Modal>
      <div className="rounded-sm flex flex-col text-white bg-sexygray justify-between p-5 overflow-x-auto">
        <h1 className={`text-3xl ${title.className}`}>{props.name}</h1>
        <div className="m-5" />
        <div className="flex flex-row space-x-3">
          <span className="rounded font-semibold bg-green-500 py-1 px-2">
            Enrolled on {new Date(props.on * 1000).toDateString()}
          </span>
          <span className="rounded font-semibold bg-amber-500 py-1 px-2">
            Age {props.age}
          </span>
          <span className="rounded font-semibold bg-purple-500 py-1 px-2">
            Doctor {props.doctor}
          </span>

          <div className="grow" />
          <div className="flex flex-row space-x-3">
            <button
              onClick={openModal}
              data-modal-target="defaultModal"
              data-modal-toggle="defaultModal"
              className="rounded-sm bg-sky-500 text-white py-1.5 hover:bg-sky-400 px-5"
            >
              <div className="flex flex-row justify-between items-center space-x-2">
                <HiEye /> <span className={buttontitle.className}>View Records</span>
              </div>
            </button>
            <button className="rounded-sm bg-sky-500 text-white py-1.5 hover:bg-sky-400 px-5">
              <div className="flex flex-row justify-between items-center space-x-2">
                <MdEdit /> <span className={buttontitle.className}>Edit</span>
              </div>
            </button>
            <button className="rounded-sm bg-red-700 text-white py-1.5 hover:bg-rose-600 px-5">
              <div className="flex flex-row justify-between items-center space-x-2">
                <MdPersonRemove />{" "}
                <span className={buttontitle.className}>Remove</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Patient;
