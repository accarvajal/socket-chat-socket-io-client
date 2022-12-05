import { Component, OnInit } from '@angular/core';

import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit(): void {
  }

  salir() {
    this.chatService.logout();
  }
}
