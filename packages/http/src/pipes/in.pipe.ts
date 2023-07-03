/******************************************************************
 * Copyright (C) 2022 LvChengbin
 *
 * File: pipes/in.pipe.ts
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 05/03/2022
 * Description:
 ******************************************************************/

import { PipeMetadata } from '@mimosa/core';
import { BadRequestException } from '../exceptions';
import { ExceptionResponseObject } from './interfaces';

export function In( list: any[], exception?: ExceptionResponseObject | Error ) {

    return <T>( value: T, context: any, application: any, metadata: PipeMetadata ): T => {
        if( value === undefined ) return value;
        if( list.includes( value ) ) return value;
        if( exception instanceof Error ) throw exception;

        const property = metadata?.data?.property;
        const str = `[ ${list.join( ', ' )} ]`;

        throw new BadRequestException( {
            message : [
                property ? `${String( property )} should be in ${str}.` : `parameter should be in ${str}.`
            ],
            ...( exception ?? {} )
        } );
    };
}
