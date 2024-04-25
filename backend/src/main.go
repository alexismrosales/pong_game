package main

import (
	"fmt"
	"golang.org/x/net/websocket"
	"net/http"
	"sync"
)

type Server struct {
	mu       sync.Mutex
	conns    map[*websocket.Conn]string
	sessions *Sessions
}

type Sessions struct {
	sessions map[string]map[string]*websocket.Conn
}

func NewSession() *Sessions {
	return &Sessions{
		sessions: make(map[string]map[string]*websocket.Conn),
	}
}

func NewServer() *Server {
	return &Server{
		conns:    make(map[*websocket.Conn]string),
		sessions: NewSession(),
	}
}

func (s *Server) handleConnectionWebsocket(ws *websocket.Conn) {
	fmt.Println("New connection availible from:", ws.RemoteAddr())
	code := r.Header.Get("code") // ws://localhost:8080/ws?code={code}&player={player}
	player := r.Header.Get("player")
	session := make(map[string]string)
	session["code"] = code
	// mutex
	s.mu.Lock()
	s.conns[ws] = code
	s.mu.Unlock()
}

func main() {
	server := NewServer()

	http.Handle("/", websocket.Handler(server.handleConnectionWebsocket))

}
