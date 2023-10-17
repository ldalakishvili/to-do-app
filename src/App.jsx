import "./reset.css";
import "./App.css";
import Header from "./components/Header";
import styled from "styled-components";
import { useState } from "react";
import TodoList from "./components/TodoList";

function App() {
	const [todoList, setTodoList] = useState([]);
	const [currentId, setCurrentId] = useState(1);
	const [isChecked, setIsChecked] = useState(false);
	const [darkMode, setDarkMode] = useState(false);

	return (
		<MainContainer darkMode={darkMode}>
			<Header
				darkMode={darkMode}
				setDarkMode={setDarkMode}
				isChecked={isChecked}
				setIsChecked={setIsChecked}
				setTodoList={setTodoList}
				todoList={todoList}
				currentId={currentId}
				setCurrentId={setCurrentId}
			/>
			<TodoList
				darkMode={darkMode}
				setDarkMode={setDarkMode}
				todoList={todoList}
				isChecked={isChecked}
				setIsChecked={setIsChecked}
				setTodoList={setTodoList}
			/>
		</MainContainer>
	);
}

export default App;

const MainContainer = styled.div`
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	/* justify-content: center; */
	background-color: ${(props) => (props.darkMode ? `#FFFFFF` : `#171823`)};
`;
