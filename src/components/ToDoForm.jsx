import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem'
import tick from "../assets/tick.png";
import no_tick from "../assets/no_tick.png";

const ToDoForm = () => {
    
    const [todoList, setToDoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);
    const [todo,setToDo]=useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();
        
        const task=e.target.todo.value.trim();
        if(task === ""){
            return null;
        }
        
        const newToDo={
            id: Date.now(),
            text: task,
            isComplete: false
        }
        
        setToDoList([...todoList,newToDo]);
        setToDo("");
    }
    
    const deleteToDo=(id)=>{
        setToDoList((list)=>{
            return list.filter((todo)=>todo.id!=id);
        })
    }
    
    const toggle=(id)=>{
        setToDoList((list)=>{
            return list.map((td)=>{
                if(td.id===id){
                    return {...td,isComplete:!td.isComplete}
                }
                return td;
            })
        })
    }
    
    const [filter, setFilter] = useState("completed");

    const [filteredTodos,setFilteredTodos] = useState([]);

    useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(todoList));
        setFilteredTodos(todoList.filter((todo) => {
            if (filter === "completed") return todo.isComplete;
            if (filter === "uncompleted") return !todo.isComplete;
        }));
    },[todoList,filter]);
    

    return (
        <>
            <form className="flex items-center my-8 bg-zinc-200 rounded-full w-full shadow-[0_0_15px_rgba(10,10,10,0.25)] p-0" onSubmit={(e)=>{handleSubmit(e)}}> 
                <input type="text" name="todo" id="todo" placeholder="Add Your Task..." className="bg-trasparent border-0 pl-2 pr-1 md:pl-6 md:pr-4 py-2 md:py-4 rounded-full outline-none md:flex-1 placeholder:text-zinc-500 text-stone-800" value={todo} onChange={(e)=>{setToDo(e.target.value)}} autoFocus />
                <button type="submit" className="px-6 py-2 md:py-4 rounded-full border-0 cursor-pointer text-lg font-medium bg-indigo-500 text-white">ADD <span className="text-2xl">+</span></button>
            </form>

            <div className="todoList w-full overflow-auto h-80 scrollbar-thin">
                {
                    todoList.map((td,key)=>{
                        return <TodoItem key={key} text={td.text} id={td.id} isComplete={td.isComplete} deleteToDo={deleteToDo} toggle={toggle}/>
                    })
                }
            </div>

            <div className="btns flex justify-between w-full p-4 h-10">
                <button type="button" onClick={() => setFilter("completed")} className={`flex gap-2 cursor-pointer ${filter === "completed" ? "text-blue-500 text-lg transition-all" : ""}`}>
                    <img src={tick} alt="Tick Image" className="w-6 h-6" />
                    Completed Tasks
                </button>
                <button type="button" onClick={() => setFilter("uncompleted")} className={`flex gap-2 cursor-pointer ${filter === "uncompleted" ? "text-blue-500 text-lg transition-all" : ""}`}>
                    <img src={no_tick} alt="No Tick Image" className="w-6 h-6" />
                    Uncompleted Tasks
                </button>
            </div>

            <div className=" w-full bg-white/90 rounded-lg scrollbar-thin p-4 overflow-y-auto
                            flex flex-col justify-center items-start 
                            xl:absolute xl:left-[110%] xl:w-96 xl:h-60
                            static
                            z-10 md:z-auto my-8
                ">
                <h1 className="font-semibold mb-2 text-2xl">{filter==="completed"?"Completed Tasks":"Uncompleted Tasks"}</h1>
                {
                    filteredTodos.length > 0 ? (
                        <ul className='list-decimal p-4'>
                            { 
                                filteredTodos.map((td,key) => {
                                    return <li key={key}>{td.text}</li>
                                })
                            }
                        </ul>
                    ) : (
                        <p className="text-center text-zinc-500">No tasks {filter} found.</p>
                    )
                }
            </div>
        </>
    )
}

export default ToDoForm