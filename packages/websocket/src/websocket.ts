/******************************************************************
 * Copyright (C) 2022-2023 NextSeason
 *
 * @File: src/websocket.ts
 *
 * This file is part of NextSeason projects.
 * Code in this file can not be copied and/or distributed without the
 * express permission of NextSeason. Inc
 ******************************************************************/

import { Server as HTTPServer } from 'node:http';
import { Server as HTTPSServer } from 'node:https';
import { WebSocketServer, ServerOptions } from 'ws';
import { Application, registerServer } from '@mimosa/core';
import { getServerByPort } from '@mimosa/http';
import { Context, ContextOptions } from './context';

export const WEBSOCKET_REGISTERED_SERVER_NAME = Symbol( 'websocket#registered#server#name' );
export const WEBSOCKET_ROUTING_GROUP = Symbol( 'websocket#routing#group' );

export type WebSocketOptions = ServerOptions;

export function WebSocket( options: number | HTTPServer | HTTPSServer | WebSocketOptions = {} ): ClassDecorator {

    const opts: WebSocketOptions = typeof options === 'number'
        ? { port : options }
        : options instanceof HTTPServer || options instanceof HTTPSServer
            ? { server : options }
            : options;

    return ( target: object ): void => {

        let webSocketServer: WebSocketServer | undefined;

        registerServer( target, WEBSOCKET_REGISTERED_SERVER_NAME, {
            start() {
                const { port, server, ...rest } = opts;

                if( port && !server ) {
                    const httpServer = getServerByPort( port );
                    if( httpServer ) {
                        webSocketServer = new WebSocketServer( {
                            server : httpServer,
                            ...rest
                        } );
                    } else {
                        webSocketServer = new WebSocketServer( opts );
                    }
                } else {
                    webSocketServer = new WebSocketServer( opts );
                }

                webSocketServer.on( 'connection', ws => {
                    // console.log( 'connected' );

                    // ws.on( 'open', function message() {
                    //     console.log( 'open' );
                    // } );

                    // ws.on( 'upgrade', function message() {
                    //     console.log( 'upgrade' );
                    // } );

                    // ws.on( 'unexpected-response', function message() {
                    //     console.log( 'unexpected-response' );
                    // } );

                    ws.on( 'message', async ( message: Buffer ) => {
                        try {
                            const data = JSON.parse( message.toString() );
                            await handle.call( this, {
                                event : 'message',
                                data
                            } );

                        } catch( e: unknown ) {
                            // eslint-disable-next-line no-console
                            console.error( 'received: ', message.toString() );
                        }
                    } );

                    // ws.on( 'ping', function message( data ) {
                    //     console.log( 'ping', data );
                    // } );

                    // ws.on( 'pong', function message( data ) {
                    //     console.log( 'pong', data );
                    // } );

                    // setInterval( () => {
                    //     ws.ping();
                    // }, 2000 );
                } );

            },
            close() {
                webSocketServer?.close();
            },
            async handle( options: ContextOptions ): Promise<Context> {
                return handle.call( this, options );
            }
        } );
    };
}

export async function handle( this: Application, options: ContextOptions | Context ): Promise<Context> {
    const context = new Context( options );
    try {
        await this.visit( {
            group : WEBSOCKET_ROUTING_GROUP,
            namespace : context.event,
            path : context.path
        }, context );
    } catch( e: unknown ) {
        // eslint-disable-next-line no-console
        console.error( e );
    }
    return context;
}
