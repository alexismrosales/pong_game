package main

import (
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	sts "src/status"
	"sync"
	"time"
)

// The server will be assigning to every connection with the code of the game where the player is  in
type Server struct {
	mu       sync.Mutex
	conns    map[*websocket.Conn]string
	sessions *Sessions
}

// Every session will allow a maximum of two connections by code
type Sessions struct {
	sessions map[string]map[int]*websocket.Conn
}

func NewServer() *Server {
	return &Server{
		conns:    make(map[*websocket.Conn]string),
		sessions: NewSession(),
	}
}

func NewSession() *Sessions {
	return &Sessions{
		sessions: make(map[string]map[int]*websocket.Conn),
	}
}

// Parameters of URL will be read and listener will start
func (s *Server) handleConnectionWebsocket(w http.ResponseWriter, r *http.Request) {
	// Getting header info from URL
	code := r.URL.Query().Get("code") // ws://localhost:8080/ws?code=code&player=player

	if code == "" {
		log.Panic("The header values are not valid... ")
	}

	// Creating upgrader
	upgrader := websocket.Upgrader{
		CheckOrigin:     func(r *http.Request) bool { return true },
		ReadBufferSize:  512,
		WriteBufferSize: 512,
	}
	conn, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		log.Panic("Error creating websocket connection:", err)
	} else {
		log.Println("New connection avalaible from: ", conn.RemoteAddr().String(),
			"\nCode: ", code, "\nURL Info:", r.URL.String())
	}

	s.mu.Lock()
	s.conns[conn] = code
	s.mu.Unlock()
	// Adding every new connection to their corresponded session
	addSessionData(s, conn, code)
}

// Player will be added to a new session, if there is no a new one will be created and the first
// player will be player 1 else player 2 will added to the session
func addSessionData(s *Server, conn *websocket.Conn, code string) {
	var player int
	if session, exists := s.sessions.sessions[code]; !exists {
		// Creating new session and adding player 1 to session
		player = 1
		session = make(map[int]*websocket.Conn)
		session[player] = conn
		s.mu.Lock()
		s.sessions.sessions[code] = session
		s.mu.Unlock()

		msg, _ := sts.MsgStatus(10)
		log.Println("Status 10:", msg)
	} else if len(session) == 2 {
		msg, _ := sts.MsgStatus(31)
		log.Panic("ERR: Status 31:", msg)

		conn.Close()
	} else {
		// Adding new player to session
		player = 2
		session[player] = conn
		s.mu.Lock()
		s.sessions.sessions[code] = session
		s.mu.Unlock()

		msg, _ := sts.MsgStatus(20)
		log.Println("Status 20: ", msg)

		// Creating a new session
		go s.sessionListener(session[1], session[2], code)
	}
}

// Concurrent function that will manage every game session avalaible, and will comunicate with both players
func (s *Server) sessionListener(p1Conn, p2Conn *websocket.Conn, code string) {
	wasDisplayed := false
	for {
		s.mu.Lock()
		session, exists := s.sessions.sessions[code]
		s.mu.Unlock()

		if exists {
			// In case the session has two player, the broadcast for every player will start
			if !wasDisplayed && len(session) == 2 {
				time.Sleep(time.Millisecond * 5000)
				s.writeStatusToConn(p1Conn, 30)
				s.writeStatusToConn(p2Conn, 30)
				wasDisplayed = true
			}
		}
	}
}

// Writing a message to the desired connection
func (s *Server) writeStatusToConn(conn *websocket.Conn, status int) {
	_, nStatus := sts.MsgStatus(status)
	data := map[string]interface{}{
		"statusCode": nStatus,
	}

	// Sending message to the selected connection
	conn.WriteJSON(data)
}

func main() {
	server := NewServer()
	http.HandleFunc("/ws", server.handleConnectionWebsocket)
	http.ListenAndServe(":8080", nil)
}
