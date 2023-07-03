/******************************************************************
 * Copyright (C) 2022-2023 NextSeason
 *
 * @File: decorators/access-log.decorator.ts
 *
 * This file is part of NextSeason projects.
 * Code in this file can not be copied and/or distributed without the
 * express permission of NextSeason. Inc
 ******************************************************************/

import { Morgan } from '@mimosa/morgan';
import { Context } from '../context';

export function AccessLog( tag = 'Mimosa' ): ClassDecorator & MethodDecorator {
    const format = ':tag :ip :time :method :protocol :host:url :status :length :headers.referer :headers.user-agent :age';
    return Morgan( format, {
        tokens : {
            protocol : ( context: Context ): string | null => {
                const { req } = context.request;

                if( req ) {
                    return context.protocol?.toUpperCase() + '/' + req.httpVersion;
                }
                return 'NPS';
            },
            time : ( { time }: Context ): string => {
                return '[' + time.toString() + ']';
            },
            tag : () => '[' + tag + ']',
            ip : ( context: Context ): string => {
                return context.ip || '-';
            }
        }
    } );
}
