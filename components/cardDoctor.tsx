import { Arimo, Josefin_Sans } from "@next/font/google";
import { MdEdit, MdPersonRemove, MdRemove } from "react-icons/md";
const title = Arimo({ weight: "700", subsets: ["latin"] });
const buttontitle = Josefin_Sans({ weight: "400", subsets: ["latin"] });
type CardProps = {
    name: string
    age: number
    on: number
    doctor:string
}
const Doctor = (props: CardProps) => {
  return (
    <div className="h-36 p-4 m-4 ">
      <div className="rounded-sm flex flex-col text-white bg-sexygray justify-between p-5 overflow-x-auto">
        <h1 className={`text-3xl ${title.className}`}>{props.name}</h1>
        <div className="m-5" />
        <div className="flex flex-row space-x-3">
          <span className="rounded font-semibold bg-green-500 py-1 px-2">Enrolled on {new Date(props.on * 1000).toDateString()}</span>
          <span className="rounded font-semibold bg-amber-500 py-1 px-2">Age {props.age}</span>
          <span className="rounded font-semibold bg-purple-500 py-1 px-2">Doctor {props.doctor}</span>
          
          <div className="grow" />
          <div className="flex flex-row space-x-3">
            <button className="rounded-sm bg-sky-500 text-white py-1.5 hover:bg-sky-400 px-5">
              <div className="flex flex-row justify-between items-center space-x-2">
                <MdEdit /> <span className={buttontitle.className}>Edit</span>
              </div>
            </button>
            <button className="rounded-sm bg-red-700 text-white py-1.5 hover:bg-rose-600 px-5">
              <div className="flex flex-row justify-between items-center space-x-2">
                <MdPersonRemove /> <span className={buttontitle.className}>Remove</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Doctor;
