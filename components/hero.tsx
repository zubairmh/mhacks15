import Card from "./card";


const Hero = () => {
  return (
    <>
      <div className="bg-white dark:text-white dark:bg-sexyblack grow p-4 overflow-y-scroll">
        <div className="flex flex-col">
            {[...Array(25)].map((i,j)=>{
              return (
                <Card key={i}/>
              )
            })}
        </div>
      </div>
    </>
  );
};

export default Hero;
