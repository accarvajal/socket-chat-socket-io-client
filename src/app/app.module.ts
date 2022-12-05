import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { UsuariosConectadosComponent } from './componentes/usuarios-conectados/usuarios-conectados.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    FooterComponent,
    UsuariosConectadosComponent,
    MensajesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
