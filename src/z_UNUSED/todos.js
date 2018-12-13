import React from 'react'


const Todos = ({ todos, deleteTodo }) => {

    const todoList = todos.length ? todos.map(todo => {
        return (
            <>
                <div className="todos__item" key={todo.id}>

                    <span>{todo.content}</span>
                    <button onClick={() => deleteTodo(todo.id)}>delete</button>
                </div>

            </>
        );
    })
        : (<p>You have no todo's Yay</p>)

    return (
        <>

            <div className='todos'>
                {todoList}
            </div>
        </>
    )
}
export default Todos;

