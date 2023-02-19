type NavProps = {
  icon: new()=>React.Component<any,any>;
  text: string;
};
function renderGreeting(Elem: new() => React.Component<any, any>) {
    return (
    <Elem className="h-6 w-6 text-white">
        Hello
    </Elem>
    )
}
export default function NavElement(props: NavProps) {
  return (
    <>
      <div className="bg-purple-900 flex flex-col p-4  min-w-full items-center justify-center">
        {renderGreeting(props.icon)}
        <span>{props.text}</span>
      </div>
    </>
  );
}
