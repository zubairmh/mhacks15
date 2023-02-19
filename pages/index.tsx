import { useState, useEffect } from "react";
import Patient from "@/components/cardPatient";

type Patient = {
  _id: string;
  name: string;
  card: string[];
  remove: (c: string)=>void;
  enrolled_on: number;
  age: number;
  doctor: string;
  records: string[];
};

type HomeProps = {
  search: string;
};

export default function Home(props: HomeProps) {
  const [cardState, setcardState] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:8000/api/patient`);

      setcardState(await res.json());
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);
  function removeCard(key: string) {
    setcardState(cardState.filter((el: Patient) => el._id !== key));

    fetch(`http://localhost:8000/api/delete/${key}`)
        .then(response => response.json())

  }
  return (
    <>
      <div className="rounded-9xl overflow-y-auto">
        <div className="p-2 flex flex-col">
          {cardState
            .filter((el: Patient) =>
              el.name.toLowerCase().includes(props.search.toLowerCase())
            )
            .sort((a: Patient, b: Patient) => {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            })
            .map((patient: Patient) => {
              return (
                <Patient
                  _id={patient._id}
                  card={cardState}
                  remove={removeCard}
                  records={patient.records}
                  name={patient.name}
                  age={patient.age}
                  on={patient.enrolled_on}
                  doctor={patient.doctor}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
