import logo from "../assets/checklist.png";
import ToDoForm from "./ToDoForm";
const ToDoList = () => {
    return (
        <div className="bg-white/90 min-h-[550px] md:w-md w-xs rounded-xl flex flex-col items-center p-8 shadow-[0_0_10px_rgba(255,255,255,0.3)] max-w-md">
            <div className="flex mt-4 w-full gap-3">
                <img src={logo} alt="ToDoList Image" className="w-10"/>
                <h1 className="text-3xl font-semibold">To-Do List</h1>
            </div>
            
            <ToDoForm />
        </div>
    )
}

export default ToDoList
