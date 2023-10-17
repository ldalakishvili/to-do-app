import styled from "styled-components";
import Hills from "../assets/bg-desktop-light.jpg";
import Moon from "../assets/icon-moon.svg";
import Check from "../assets/icon-check.svg";
import Sun from "../assets/icon-sun.svg";
import DarkHills from "../assets/bg-desktop-dark.jpg";
import HillsMobile from "../assets/bg-mobile-light.jpg";
import DarkHillsMobile from "../assets/bg-mobile-dark.jpg";

import { useState } from "react";

export default function Header(props) {
	const [newTodo, setNewTodo] = useState(``);
	const Addtodo = (e) => {
		if (e.code === "Enter" && newTodo.trim() !== "") {
			const newStatus = props.isChecked;
			props.setTodoList([
				...props.todoList,
				{
					id: props.currentId,
					description: newTodo,
					status: newStatus,
				},
			]);
			props.setCurrentId(props.currentId + 1);
			setNewTodo(``);
		}
	};
	const handleCircleClick = () => {
		props.setIsChecked(!props.isChecked);
	};
	const changeTheme = () => {
		props.setDarkMode(!props.darkMode);
	};
	return (
		<HeaderBackground darkMode={props.darkMode}>
			<BackgroundContainer>
				<Title>
					<TiTleLogo> TODO</TiTleLogo>
					<ToggleImg src={props.darkMode ? Moon : Sun} onClick={changeTheme} />
				</Title>
				<InputBox darkMode={props.darkMode}>
					<Circle checked={props.isChecked} onClick={handleCircleClick} />
					<InputText
						darkMode={props.darkMode}
						value={newTodo}
						onChange={(e) => setNewTodo(e.target.value)}
						onKeyDown={Addtodo}
						type="text"
						placeholder="Create a new todo…"
					/>
				</InputBox>
			</BackgroundContainer>
		</HeaderBackground>
	);
}

const HeaderBackground = styled.div`
	background-image: url(${(props) => (props.darkMode ? Hills : DarkHills)});
	background-size: cover;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-top: 7rem;

	@media (max-width: 560px) {
		padding-top: 4.8rem;
		background-image: url(${(props) =>
			props.darkMode ? HillsMobile : DarkHillsMobile});
	}
`;
const BackgroundContainer = styled.div`
	max-width: 54.1rem;
	width: 100%;
	@media (max-width: 560px) {
		max-width: 32.5rem;
	}
`;
const Title = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const TiTleLogo = styled.h1`
	font-size: 4rem;
	font-weight: 700;
	line-height: 4rem;
	letter-spacing: 15px;
	text-align: left;
	color: white;
`;
const ToggleImg = styled.img`
	width: 2.1rem;
	height: 2.1rem;
`;

const InputBox = styled.div`
	background-color: ${(props) => (props.darkMode ? `#FFFFFF` : `#25273D`)};
	width: 100%;
	padding: 2rem 0 2rem 2.4rem;
	border: none;
	border-radius: 0.5rem;
	display: flex;
	justify-content: left;
	align-items: center;
	gap: 2.4rem;
	margin: 4rem 0 7.8rem;

	@media (max-width: 560px) {
		padding: 1.8rem 0 1.8rem 2rem;
		gap: 1.2rem;
	}
`;
const Circle = styled.div`
	cursor: pointer;
	width: 24px;
	height: 24px;
	border: solid 1px #e3e4f1;
	border-radius: 50%;
	background-image: ${(props) =>
		props.checked
			? `url(${Check}) , linear-gradient(135deg, #55ddff 0%, #c058f3 100%)`
			: "none"};
	background-repeat: no-repeat;
	background-position: center;
`;

const InputText = styled.input`
	background-color: transparent;
	width: 100%;
	border: none;
	font-size: 18px;
	font-weight: 400;
	line-height: 18px;
	letter-spacing: -0.25px;
	text-align: left;
	color: ${(props) => (props.darkMode ? `#494C6B` : `#767992`)};
	&:focus {
		outline: none;
	}

	@media (max-width: 560px) {
		font-size: 12px;
		line-height: 12px;
	}
`;
