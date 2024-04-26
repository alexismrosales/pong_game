package status

import "log"

// This are some fast status to write to the desired connection
// The status availaible are:
// Status 10:  Connection succesfully with session, waiting to start game
// Status 20:  Session Full, game is about to start
// Status 21: Session Full, new player won´t be able to joint to the session

func status(code int) string {
	status := ""
	switch code {
	case 10:
		status = "Status 10: Connection succesfully with session, waiting to start the game ."
	case 20:
		status = "Status 20: Session full, game is about to start."
	case 21:
		status = "Status 21: Session full, new player won´t be able to join the session"
	default:
		status = "Status:  Not defined"
	}
	return status
}
