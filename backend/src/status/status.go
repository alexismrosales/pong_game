package data

// This are some fast status to write to the desired connection
// The status availaible are:
// Status 10:  Connection succesfully with session, waiting to start game
// Status 20:  Session Full, game is about to start
// Status 21: Session Full, new player won´t be able to joint to the session

func MsgStatus(code int) (string, int) {
	status := ""
	switch code {
	case 10:
		status = "Status 10: Connection succesfully with session, player 1 joined. Waiting connection from the other player."
	case 20:
		status = "Status 20: Player 2 joined."
	case 30:
		status = "Status 30: Session full, game is about to start"
	case 31:
		status = "Status 31: Session full, new player won´t be able to join the session"

	default:
		status = "Status:  Not defined"
	}
	return status, code
}
