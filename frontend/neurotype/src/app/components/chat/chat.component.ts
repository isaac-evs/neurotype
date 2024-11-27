import { Component, OnInit, OnDestroy } from "@angular/core";
import { WebsocketService } from "../../services/websocket.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";

@Component({
  standalone: true,
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  imports: [FormsModule, CommonModule],
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: any[] = [];
  inputMessage: string = "";
  private messageSubscription!: Subscription;

  constructor(private websocketService: WebsocketService) {}

  ngOnInit() {
    this.websocketService.connect();

    // Subscribe to the messages observable
    this.messageSubscription = this.websocketService.messages$.subscribe(
      (data) => {
        if (data.type === "response") {
          this.messages.push({ sender: "bot", content: data.content });
        }
      },
    );
  }

  sendMessage() {
    if (this.inputMessage.trim()) {
      this.messages.push({ sender: "user", content: this.inputMessage });
      this.websocketService.sendMessage(this.inputMessage);
      this.inputMessage = "";
    }
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
    this.websocketService.close();
  }
}
