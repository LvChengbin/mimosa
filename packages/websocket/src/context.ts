/******************************************************************
 * Copyright (C) 2022-2023 NextSeason
 *
 * @File: src/context.ts
 *
 * This file is part of NextSeason projects.
 * Code in this file can not be copied and/or distributed without the
 * express permission of NextSeason. Inc
 ******************************************************************/

export type WebSocketEventType =
    | 'message'
    | 'ping'
    | 'pong';

export interface WebSocketData {
    path: string;
}


export interface ContextOptions {
    event: WebSocketEventType;
    data: WebSocketData;
}

export class Context {

    event: WebSocketEventType;

    path: string;

    data: WebSocketData;

    constructor( options: ContextOptions ) {
        this.event = options.event;
        this.data = options.data;
        this.path = options.data.path;
    }
}
