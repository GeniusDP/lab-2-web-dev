import React from "react";
import "./ModalWindow.css";
import { CSSTransition } from "react-transition-group";
const ModalWindow = ({
	children,
	modalIsOpen,
	setModalIsOpen,
	submitHandler,
	submitEvent,
}) => {
	const classes = ["Modal"];
	if (modalIsOpen) {
		classes.push("modal-active");
	}
	return (
		<div className={classes.join(" ")} onClick={() => setModalIsOpen(false)}>
			<CSSTransition
				in={modalIsOpen}
				timeout={300}
				classNames="alert"
				unmountOnExit
			>
				<div
					className={"modal-content"}
					onClick={(event) => event.stopPropagation()}
				>
					{children}
					<div className={"button-group"}>
						<button
							onClick={(event) => {
								event.preventDefault();
								submitHandler(submitEvent);
								setModalIsOpen(false);
							}}
						>
							Yes
						</button>
						<button
							onClick={(event) => {
								event.preventDefault();
								setModalIsOpen(false);
							}}
						>
							Not now
						</button>
					</div>
				</div>
			</CSSTransition>
		</div>
	);
};

export default ModalWindow;
