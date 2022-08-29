export default function Navbar(props:{name:string}){
    return(<>
        <div className="bg-gray-800">{props.name?props.name:"Navbar"}</div>
    </>)
}