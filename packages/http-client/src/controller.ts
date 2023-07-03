/******************************************************************
 * Copyright (C) 2022 LvChengbin
 *
 * File: src/controller.ts
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 05/08/2022
 * Description:
 ******************************************************************/

import {
    Controller as CoreController,
    ControllerOptions as CoreControllerOptions,
    InputMetadata
} from '@mimosa/core';
import { createInputDecorator } from '@mimosa/core/decorator';
import { Context } from './context';
import { joinPath } from './utils';

function fn( metadata: InputMetadata, context: Context ): void {
    const { options } = context;
    const { path = '/' } = metadata.data ?? {};

    if( !options.path ) {
        options.path = path;
        return;
    }

    options.path = joinPath( options.path, path );
}

export type ControllerOptions =
    & CoreControllerOptions
    & {
        path?: string;
    };

export function Controller( path: string | ControllerOptions ): ClassDecorator {
    const data = typeof path === 'string' ? { path } : path;
    const controller = CoreController( data );
    const input = createInputDecorator( fn, { data } );

    return ( target ): void => {
        controller( target );
        input( target );
    };
}
