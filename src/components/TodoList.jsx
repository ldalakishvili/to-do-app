import styled from "styled-components";
import Check from "../assets/icon-check.svg";
import Cross from "../assets/icon-cross.svg";
import { useState } from "react";

const TodoList = (props) => {
	const [filter, setFilter] = useState("all");

	const [hoveredItemId, setHoveredItemId] = useState(null);
	const checkClicked = (id) => {
		const updatedTodoList = props.todoList.map((item) => {
			if (item.id === id) {
				console.log(item);
				return {
					...item,
					status: !item.status,
				};
			}
			return item;
		});
		props.setTodoList(updatedTodoList);
	};
	const deleteTodo = (e, id) => {
		e.stopPropagation();
		const deletedTodoList = props.todoList.filter((item) => item.id !== id);
		props.setTodoList(deletedTodoList);
	};
	const filteredTodoList = props.todoList.filter((item) => {
		if (filter === "all") {
			return true;
		} else if (filter === "completed") {
			return item.status;
		} else {
			return !item.status;
		}
	});
	const clearCompleted = () => {
		const updatedTodoList = props.todoList.filter((item) => !item.status);
		props.setTodoList(updatedTodoList);
	};
	return (
		<Container>
			<ContainerTitle darkMode={props.darkMode}>
				<CheckImg src={Check} />
				<TitleText> Complete online JavaScript course</TitleText>
			</ContainerTitle>
			<UndorderedList darkMode={props.darkMode}>
				{filteredTodoList.map((item) => {
					const isHovered = item.id === hoveredItemId;

					return (
						<List
							key={item.id}
							onMouseEnter={() => setHoveredItemId(item.id)}
							onMouseLeave={() => setHoveredItemId(null)}
						>
							<ListCircle
								checked={item.status}
								onClick={() => checkClicked(item.id)}
							/>
							<TodoTask darkMode={props.darkMode}> {item.description}</TodoTask>
							{isHovered && (
								<ListCross
									src={Cross}
									onClick={(e) => deleteTodo(e, item.id)}
								/>
							)}
						</List>
					);
				})}
			</UndorderedList>
			<FiltersBox darkMode={props.darkMode}>
				<ItemsLeft> {`${props.todoList.length} items left`}</ItemsLeft>
				<Filters>
					<Filter active={filter === "all"} onClick={() => setFilter("all")}>
						All
					</Filter>
					<Filter
						active={filter === "active"}
						onClick={() => setFilter("active")}
					>
						Active
					</Filter>
					<Filter
						active={filter === "completed"}
						onClick={() => setFilter("completed")}
					>
						Completed
					</Filter>
				</Filters>
				<ItemsLeft onClick={clearCompleted}> Clear Completed</ItemsLeft>
			</FiltersBox>
		</Container>
	);
};

export default TodoList;

const Container = styled.div`
	background-color: ${(props) => (props.darkMode ? `#FFFFFF` : `#25273D`)};
	max-width: 54rem;
	width: 100%;
	background-color: white;
	display: flex;
	flex-direction: column;
	margin-top: -5.4rem;
	border-radius: 0.5rem;
	background-color: white;
	box-shadow: 0 35px 50px -15px #c2c3d680;
	@media (max-width: 560px) {
		max-width: 32.5rem;
	}
`;
const ContainerTitle = styled.div`
	background-color: ${(props) => (props.darkMode ? `#FFFFFF` : `#25273D`)};
	width: 100%;
	padding: 2rem 2.4rem;
	border: none;
	border-bottom: solid 1px #e3e4f1;
	border-radius: 0.5rem;
	display: flex;
	justify-content: left;
	align-items: center;
	gap: 2.4rem;
	@media (max-width: 560px) {
		padding: 1.8rem 2rem;
	}
`;
const CheckImg = styled.img`
	width: 24px;
	height: 24px;
	padding: 0.5rem;
	border-radius: 50%;
	background-image: linear-gradient(135deg, #55ddff 0%, #c058f3 100%);

	@media (max-width: 560px) {
		width: 1.8rem;
		height: 1.8rem;
	}
`;
const TitleText = styled.p`
	font-size: 18px;
	font-weight: 400;
	line-height: 18px;
	letter-spacing: -0.25px;
	text-align: left;
	color: #d1d2da;

	@media (max-width: 560px) {
		font-size: 12px;
		line-height: 12px;
	}
`;
const UndorderedList = styled.ul`
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: ${(props) => (props.darkMode ? `#FFFFFF` : `#25273D`)};
`;
const List = styled.li`
	width: 100%;
	padding: 2rem 2.4rem;
	border: none;
	border-bottom: solid 1px #e3e4f1;
	display: flex;

	/* justify-content: space-between; */
	align-items: center;
	gap: 2.4rem;

	@media (max-width: 560px) {
		padding: 1.8rem 2rem;
	}
`;
const ListCircle = styled.img`
	cursor: pointer;
	width: 24px;
	height: 24px;
	padding: 0.8rem;
	border-radius: 50%;
	/* background-image: linear-gradient(135deg, #55ddff 0%, #c058f3 100%); */
	background-image: ${(props) =>
		props.checked
			? `url(${Check}) , linear-gradient(135deg, #55ddff 0%, #c058f3 100%)`
			: "none"};
	background-repeat: no-repeat;
	background-position: center;
	border: solid 1px #d1d2da;
`;
const TodoTask = styled.p`
	font-size: 18px;
	font-weight: 400;
	line-height: 18px;
	letter-spacing: -0.25px;
	text-align: left;
	color: ${(props) => (props.darkMode ? `#494C6B` : `#C8CBE7`)};
	cursor: pointer;

	@media (max-width: 560px) {
		font-size: 12px;
		line-height: 12px;
	}
`;
const ListCross = styled.img`
	width: 24px;
	height: 24px;
	justify-self: flex-end;
	margin-left: auto;
	cursor: pointer;
`;
const FiltersBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 2rem 2.4rem;
	color: #9495a5;
	background-color: ${(props) => (props.darkMode ? `#FFFFFF` : `#25273D`)};

	@media (max-width: 560px) {
		justify-content: center;
	}
`;
const ItemsLeft = styled.p`
	font-size: 14px;
	font-weight: 400;
	line-height: 14px;
	letter-spacing: -0.1944444477558136px;
	text-align: left;
	cursor: pointer;
	@media (max-width: 560px) {
		display: none;
	}
`;
const Filters = styled.div`
	display: flex;
	max-width: 16.6rem;
	width: 100%;
	justify-content: space-between;
	align-items: center;
`;
const Filter = styled.p`
	font-size: 14px;
	font-weight: 700;
	line-height: 14px;
	letter-spacing: -0.1944444477558136px;
	text-align: left;
	cursor: pointer;
	${(props) =>
		props.active
			? `
      color:#3A7CFD;
    `
			: `
      color: #9495a5;
    `}
`;
