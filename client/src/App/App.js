import "./App.css";
import React, { useState } from "react";
import Header from "../Header/Header";
import ModalWindow from "../Modal/ModalWindow";
import Incorrect from "../Incorrect/Incorrect";
import Loader from "../Loader/Loader";

function App() {
	const [yourName, setYourName] = useState("");
	const [yourSurname, setYourSurname] = useState("");
	const [text, setText] = useState("");
	const [confirmIsOpen, setConfirmIsOpen] = useState(false);
	const [submitEvent, setSubmitEvent] = useState({});
	const [buttonsDisabled, setButtonsDisabled] = useState(false); //during waiting for server response
	
	function emailValidator(string) {
		const regex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
		return regex.test(string);
	}

	function textValidator(string) {
		//if not empty => so good:)
		return string.length > 0;
	}

	function onSubmitHandler(event) {
		event.preventDefault();
		setYourSurname("");
		setText("");
		setYourName("");
		setButtonsDisabled(true);
		setLoaderIsVisible(true);
		fetch("/send_info/", {
			method: "POST",
			headers: new Headers({
				Accept: "application/json",
				"Content-Type": "application/json",
			}),
			mode: "same-origin",
			body: JSON.stringify({
				name: yourName,
				surname: yourSurname,
				text: text,
			}),
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (body) {
				setButtonsDisabled(false);
				setLoaderIsVisible(false);
				if (body.permission === "no")
					alert(
						"You cannot write a new letter more the 1 time per 30 sec. Try later."
					);
				else {
					if (body.sent === true) alert("Your letter was sent.");
					else
						alert(
							"Sending of your letter was aborted (look through your password and e-mail to fix the problem)" +
								'Also problem may be if you did not gave a permission to use "strange programs" to send e-mails if ' +
								"your google account."
						);
				}
			})
			.catch((error) => {
				alert("Something went wrong with server...\n Try later\n" + error);
			});
	}
	
	//validation
	const [nameValidated, setNameValidated] = useState(false);
	const [surnameValidated, setSurnameValidated] = useState(false);
	const [textValidated, setTextValidated] = useState(false);
	const [loaderIsVisible, setLoaderIsVisible] = useState(false);
	
	return (
		<form onSubmit={onSubmitHandler} className="App">
			<Loader visible={loaderIsVisible} />
			<Header />
			<ModalWindow
				modalIsOpen={confirmIsOpen}
				setModalIsOpen={setConfirmIsOpen}
				submitHandler={onSubmitHandler}
				submitEvent={submitEvent}
			>
				<h1>Do you want to send this e-mail?</h1>
			</ModalWindow>

			<input
				type={"text"}
				value={yourName}
				placeholder={"your name"}
				onChange={(event) => {
					event.preventDefault();
					setYourName(event.target.value);
					if (textValidator(event.target.value)) {
						setNameValidated(true);
					} else {
						setNameValidated(false);
					}
				}}
			/>
			{!nameValidated && <Incorrect type={"name"} />}

			<input
				type={"text"}
				value={yourSurname}
				placeholder={"your surname"}
				onChange={(event) => {
					event.preventDefault();
					setYourSurname(event.target.value);
					if (textValidator(event.target.value)) {
						setSurnameValidated(true);
					} else {
						setSurnameValidated(false);
					}
				}}
			/>
			{!surnameValidated && <Incorrect type={"surname"} />}

			<textarea
				value={text}
				maxLength={500}
				onChange={(event) => {
					event.preventDefault();
					setText(event.target.value);
					if (textValidator(event.target.value)) {
						setTextValidated(true);
					} else {
						setTextValidated(false);
					}
				}}
			/>
			{!textValidated && <Incorrect type={"text"} />}
			<button
				disabled={buttonsDisabled}
				type={"submit"}
				onClick={(event) => {
					event.preventDefault();
					if (
						yourName.length > 0 &&
						yourSurname.length > 0 &&
						text.length > 0
					) {
						setSubmitEvent(event);
						setConfirmIsOpen(true);
					} else {
						alert("You have to validate form before sending email");
					}
				}}
			>
				Send!
			</button>

			<button
				disabled={buttonsDisabled}
				type={"reset"}
				onClick={(event) => {
					event.preventDefault();
					setYourSurname("");
					setText("");
					setYourName("");
				}}
			>
				Cancel!
			</button>
		</form>
	);
}

export default App;
