import Medicine from "@/components/cardMedicine";
import { useEffect, useState } from "react";

type Med = {
  name: string;
  expiry: number;
  quantity: number;
};
export default function MedicinePage(props: {search:string}) {
  const [cardState, setcardState] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:8000/api/medicine`);

      setcardState(await res.json());
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);
  return (
    <>
      <div className="rounded-9xl overflow-y-auto">
        <div className="p-2 flex flex-col">
          {cardState.filter((el: Med) =>
              el.name.toLowerCase().includes(props.search.toLowerCase())
            )
            .sort((a: Med, b: Med) => {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            }).map((med: Med) => {
            return <Medicine
              name={med.name}
              on={med.expiry}
              quantity={med.quantity}
            />;
          })}
        </div>
      </div>
    </>
  );
}
