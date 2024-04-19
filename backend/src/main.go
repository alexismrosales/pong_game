package main

import (
	"fmt"
	"golang.org/x/net/websocket"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		conn, err := websocket.Dial("ws://localhost:8000", "", "http://localhost")
		if err != nil {
			fmt.Println("Error connecting ws", err)
			return
		}
		defer conn.Close()
		//Sending a mesage
		msg := "Hello sever"
		if err := websocket.Message.Send(conn, msg); err != nil {
			fmt.Println("Error sending message...", err)
			return
		}
	})
	http.ListenAndServe(":8000", nil)

}
