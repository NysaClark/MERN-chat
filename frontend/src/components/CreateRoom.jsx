import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateRoom = ({ user, err, setErr, selectedUsers }) => {
	const [roomName, setRoomName] = useState("");

	let navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault();
		// console.log(roomName);
		// console.log(selectedUsers)

		if (roomName == "") {
			return setErr("You must give a room name")
		}

		// if (selectedUsers.length <= 1) {
		// 	return setErr("You must select more than one user")
		// }

		setErr();

		axios.post(`http://localhost:4000/api/users/${user._id}/room`, {
			roomName,
			users: selectedUsers
		}, { withCredentials: true }).then(res => {
			if (res.data.room) {
				navigate("/")
			}
		})


		setRoomName("")
	}

	return (
		<div className='form-wrapper' id='createRoom'>
			<div className="container">
				<h1>Create A Room</h1>
				{err &&
					<div className="err">
						<p>{err}</p>
					</div>
				}

				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Room Name"
						name="roomName"
						value={roomName}
						onChange={(event) => setRoomName(event.target.value)}
					/>

					<button type="submit" className='btn'>Create</button>
				</form>
			</div>
		</div>
	)
}

export default CreateRoom