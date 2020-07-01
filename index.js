//Presentation Component: the component responsible for UI. 
//They are generally stateless, meaning that no state of any sort
//is needed. Data will be synced using props.

/*The general sketch for the project is as follows:
 * Title
 * TodoForm: create a user-input form to add a new item
 * TodoList: The collection of each Todo item
 * Todo: each individual item of the Todo list*/

//Functional components receives props as arguments
//and render JSX code. TodoForm has one prop: a handler 
//that handles the click event for adding a new Todo item.
//The value of the input is passed to the input member variable
//using React's ref.
const TodoForm = ({addTodo}) => {
	let input; //input tracker

	return (
		<div>
		<input ref={node => {
			input = node;
		}} />
		<button onclick={() => {
			addTodo(input.value);
			input.value = '';
		}}>
		+
		</button>
		</div>
	);
};

//TodoList is an <ul></ul> element that contains a loop of
//Todo components made of <li></li> elements.
const Todo = ({todo, remove}) => { //Remove property is an event handler
	//Each Todo
	return(<li onClick(remove(todo.id))>{todo.text}</li>);
}

const TodoList = ({todos, remove}) => {
	//Map through the todos
	const todoNode = todos.map((todo) => {
		return(<Todo todo={todo} key={todo.id} remove={remove} />)
	});
}

//Title shows the tilte of the application
const Title = () => {
	return(
		<div>
		  <div>
		    <h1>To-Do List</h1>
		  </div>
		</div>
	)
}

//Container Component (Todo App)
/*The container component is the heart of the application. It will regulate
 * the props and manage the state among the presentation components.
 */

//Todo id
window.id = 0;
class TodoApp extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data: []
		}
	}

	//addTodo handler for the input form
	addTodo(val){
		const todo = {text: val, id: window.id++} //assemble data
		this.state.data.push(todo); //Updata data
		this.setState({
			data: this.state.data
		}); //update state
	}

	//handleRemove handler to delete clicked items
	handleRemove(id){
		//Filter all todos except the one to be removed
		const remainder = this.state.data.filter((todo) => {
			if(todo.id !== id){
				return todo;
			}
		});

		//Update state with filter
		this.setState({
			data: remainder
		});
	}

	render(){
		//Render JSX
		return(
			<div>
			  <Title />
			  <TodoForm addTodo={this.addTodo.bind(this)}/>
			  <TodoList
			   todos={this.state.data}
			   remove={this.handleRemove.bind(this)} />
			  </div>
		);
	}
}
