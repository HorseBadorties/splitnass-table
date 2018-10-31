import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import * as socketIo from "socket.io-client";
import { Spieltag } from "../model/spieltag";

const LOCAL_SERVER_URL = `http://localhost:${4200}`;
const REMOTE_SERVER_URL = `https://splitnass-table.herokuapp.com`;

@Injectable({
  providedIn: "root"
})
export class SocketService {
  private socket;

  constructor() {
    this.initSocket();
  }

  public initSocket(): void {
      this.socket = socketIo(LOCAL_SERVER_URL);
      this.socket.on("connect", _ => console.log(`connected to ${LOCAL_SERVER_URL}`));
      this.socket.on("connect_error", _ => this.connectToRemoteServer());
      this.socket.on("connect_timeout", _ => this.connectToRemoteServer());
  }

  private connectToRemoteServer() {
    if (this.socket) {
      this.socket.close();
    }
    this.socket = socketIo(REMOTE_SERVER_URL);
    this.socket.on("connect", _ => console.log(`connected to ${REMOTE_SERVER_URL}`));
  }

  public isConnected() {
    return this.socket && this.socket.connected;
  }

  public onSpieltag(): Observable<Spieltag> {
    return new Observable<Spieltag>(observer => {
      this.socket.on("spieltag", (data: string) => observer.next(Spieltag.fromJSON(data)));
    });
  }

  public sendSpieltag(spieltag: Spieltag): void {
    const data = Spieltag.toJSON(spieltag);
    this.socket.compress(true).emit("spieltag", data);
  }

  public requestLastSpieltag(): Observable<Spieltag> {
    const result = new Observable<Spieltag>(observer => {
      this.socket.on("lastSpieltag", (data: string) => {
        observer.next(Spieltag.fromJSON(data));
        observer.unsubscribe();
      });
    });
    this.socket.emit("lastSpieltag", "");
    return result;
  }

}
