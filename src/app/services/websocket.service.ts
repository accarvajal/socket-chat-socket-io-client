import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, of, switchMap } from 'rxjs';
import { io } from 'socket.io-client';

import { environment } from 'src/environments/environment';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket = io(environment.apiURL);
  public socketStatus = false;
  public usuario: Usuario = null;

  constructor(
    private router: Router
  ) { 
    this.checkConnectionStatus();
    this.loadUser();
  }

  checkConnectionStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
      this.loadUser();
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;      
    });
  }

  emit(evento: string, payload?: any, callback?: Function) {
    console.log('Emitiendo ', evento);
    this.socket.emit( evento, payload, callback );
  }

  getUsuario() {
    return this.usuario;
  }

  listen(evento: string) {
    return of(this.socket).pipe(switchMap(socket => fromEvent(socket, evento)));
  }

  loadUser() {
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario')!);
      this.login(this.usuario.nombre);
    }
  }

  login( nombre: string ) {
    return new Promise( (resolve, reject) => {
        this.emit('actualizar-usuario', { nombre }, () => {
          this.usuario = new Usuario( nombre );
          this.saveUser();
          resolve(null);
        })
    });
  }

  logout() {
    this.usuario = null;
    localStorage.removeItem('usuario');

    const payload = {
      nombre: 'pending ...'
    }

    this.emit('actualizar-usuario', payload, () => {});
    this.router.navigateByUrl('');
  }

  saveUser() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }
}
