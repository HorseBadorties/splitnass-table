import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import * as socketIo from "socket.io-client";
import { Spieltag } from "../model/spieltag";
import { Runde } from "../model/runde";
import { Spieler } from "../model/spieler";

const SERVER_URL = "http://localhost:8080";

@Injectable({
  providedIn: "root"
})
export class SocketService {
  private socket;

  constructor() {
    this.initSocket();
  }

  public initSocket(): void {
      this.socket = socketIo(SERVER_URL);
  }

  public onSpieltag(): Observable<Spieltag> {
    return new Observable<Spieltag>(observer => {
      this.socket.on("spieltag", (data: string) => observer.next(Spieltag.fromJSON(data)));
    });
  }

  public sendSpieltag(spieltag: Spieltag): void {
    const data = Spieltag.toJSON(spieltag);
    console.log(data);
    this.socket.compress(true).emit("spieltag", data);
  }

}
