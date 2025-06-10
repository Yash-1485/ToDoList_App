import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem'

const ToDoForm = () => {

    const [todoList, setToDoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);
    const [todo,setToDo]=useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();

        const task=e.target.todo.value.trim();
        // const task=todo;
        if(task === ""){
            return null;
        }

        // console.log(task);
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
    
    useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(todoList));
    },[todoList]);

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
        </>
    )
}

export default ToDoForm