import React, { useState, useEffect } from 'react'

const CreateRoom = ({err, setErr}) => {
	const [roomName, setRoomName] = useState();

	return (
		<div className='form-wrapper'>
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
						placeholder="roomName"
						name="username"
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