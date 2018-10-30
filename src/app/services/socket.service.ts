import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import * as socketIo from "socket.io-client";
import { Spieltag } from "../model/spieltag";

// import * as server from "../../../server";

// const SERVER_URL = `http://localhost:${4200}`;
const SERVER_URL = `https://splitnass-table.herokuapp.com`;

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
      console.log(`connected to ${SERVER_URL}`);
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

}
