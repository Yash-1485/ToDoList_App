import tick from "../assets/tick.png";
import no_tick from "../assets/no_tick.png";
import remove from "../assets/delete.png";

const TodoItem = ({text, id, isComplete, deleteToDo, toggle}) => {
    return (
        <div className="flex items-center my-4 p-2 gap-3 w-full">
            <div className="flex gap-3 w-full cursor-pointer" onClick={()=>{toggle(id)}}>
                <img src={isComplete ? tick : no_tick} alt="No_Tick Image" className="w-6 h-6" />
                <p className={`text-[17px] text-stone-800 decoration-zinc-900 ${isComplete ? "line-through" : ""}`}>{text}</p>
            </div>

            <img src={remove} alt="Delete Icon" className="w-5.5 h-5.5 cursor-pointer" onClick={()=>{deleteToDo(id)}} />
        </div>
    )
}

export default TodoItem
