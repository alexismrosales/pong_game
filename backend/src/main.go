package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"sync"
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
			"\nCode: ", code, "\n URL Info:", r.URL.String())
	}

	// mutex
	s.mu.Lock()
	s.conns[conn] = code
	s.mu.Unlock()
	// Adding every new connection to their corresponded session
	addSessionData(s, conn, code)

}

func addSessionData(s *Server, conn *websocket.Conn, code string) {
	s.mu.Lock()
	defer s.mu.Unlock()
	var player int
	// Creating a new session if it not exists and assign player
	if _, exists := s.sessions.sessions[code]; !exists {
		session := make(map[int]*websocket.Conn)
		player = 1
		session[player] = conn
		s.sessions.sessions[code] = session
	} else {
		session := s.sessions.sessions[code]
		if len(session) == 2 {
			// Needs to bradcast message to the player who is trying to log with a session with two player
			log.Panic("Sessions Full")
			conn.Close()
		} else {
			// Adding new player to session
			player = 2
			session[player] = conn
			s.sessions.sessions[code] = session
		}
	}
	fmt.Println("Player", player, "joined succesfully ...")
}

func (s *Server) sessionListener(conn *websocket.Conn, code string) {
	for {
		if session, exists := s.sessions.sessions[code]; exists {
			// In case the session has two player, the broadcast for every player will start
			if len(session) == 2 {
				fmt.Println("starting game")
			}
		}
	}
}

func (s *Server) writeStatusToConn(conn *websocket.Conn, status int) {
	// Some status to write fast responses to
}
func main() {
	server := NewServer()
	http.HandleFunc("/ws", server.handleConnectionWebsocket)
	http.ListenAndServe(":8080", nil)
}
