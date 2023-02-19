import { Oswald } from "@next/font/google"
import Link from "next/link"
import { GiBed, GiDoctorFace, GiHealthNormal } from "react-icons/gi"
import { HiUsers } from "react-icons/hi"
import { IoMdSettings } from "react-icons/io"
const oswald = Oswald({ weight: '500', subsets: ['latin'] })
const Navbar = () => {
  const r="bg-sexygray flex flex-col p-4 hover:bg-zinc-700 min-w-full items-center justify-center ";
  const s="pointer-events-none"
  return (
    <div className="bg-sexygray text-white flex flex-col items-center">
      <div className={"m-4 text-xl " + oswald.className}>INVNTRY</div>
      <Link href="/" className={r}><HiUsers  className="h-6 w-6 text-white"/><span className={s}>Patients</span></Link>
      <Link href="/medicine" className={r}><GiHealthNormal  className="h-6 w-6 text-white"/><span className={s}>Medicines</span></Link>
      <Link href="/doctors" className={r}><GiDoctorFace  className="h-6 w-6 text-white"/><span className={s}>Doctors</span></Link>
      <Link href="/beds" className={r}><GiBed  className="h-6 w-6 text-white"/><span className={s}>Beds</span></Link>
      <div className="grow"></div>
      <Link href="/settings" className={r}><IoMdSettings  className="h-6 w-6 text-white"/><span className={s}>Settings</span></Link>
    </div>
  );
};

export default Navbar;
