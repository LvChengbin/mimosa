/******************************************************************
 * Copyright (C) 2022 LvChengbin
 *
 * File: pipes/parse-int.pipe.ts
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 05/03/2022
 * Description:
 ******************************************************************/

import { PipeFunction } from '@mimosa/core';

/**
 * Parse a value to int, `NaN` or `Infinity` may be returned as the parsing result.
 * Validate the value before parsing if you don't want unexpected values.
 *
 * @example
 *
 * ```ts
 * @Query( 'type', ParseInt() )
 * ```
 */
export function ParseInt( defaultValue?: number ): PipeFunction {

    function parse( value: undefined ): undefined;
    function parse( value: string ): number;

    function parse( value: string | undefined ): number | undefined {
        if( value === undefined ) return defaultValue ?? value;
        const n = parseInt( value );
        return isNaN( n ) ? defaultValue ?? n : n;
    }

    return parse;
}
