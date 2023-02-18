import { Oswald } from "@next/font/google"
const oswald = Oswald({ weight: '500', subsets: ['latin'] })
const Navbar = () => {
  return (
    <div className="dark:bg-slate-800 text-white flex flex-row p-4 justify-between">
      <div className={"text-xl " + oswald.className}>INVNTRY</div>
      <div>03</div>
    </div>
  );
};

export default Navbar;
