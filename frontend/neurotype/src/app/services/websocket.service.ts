import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WebsocketService {
  private socket!: WebSocket;
  private messageSubject = new Subject<any>();
  public messages$: Observable<any> = this.messageSubject.asObservable();

  constructor() {}

  connect(): void {
    const token = localStorage.getItem("access_token");
    const wsUrl = `ws://your-backend-api-url/ws/chat?token=${token}`;
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = (event) => {
      console.log("WebSocket connection established:", event);
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message received:", data);
      this.messageSubject.next(data); // Emit the message
    };

    this.socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  sendMessage(message: string): void {
    const data = JSON.stringify({ type: "message", content: message });
    this.socket.send(data);
  }

  close(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
