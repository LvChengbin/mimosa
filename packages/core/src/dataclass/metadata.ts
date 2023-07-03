/******************************************************************
 * Copyright (C) 2022 LvChengbin
 *
 * File: src/metadata.ts
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 05/24/2022
 * Description:
 ******************************************************************/

import { Pipe } from '../interfaces';
import { Dataclass } from './dataclass';

export type PropertyName =
    | string
    | symbol;

export interface PropertyMetadata {
    type: any;
    pipes: Pipe[];
}

export class DataclassMetadata<T = any> {

    static pipes( metadata: DataclassMetadata ): Pipe[] {
        const output = [ ...metadata.pipes ];
        Object.values( metadata.properties ).forEach( item => {
            const { type, pipes } = item;
            output.push( ...pipes );
            if( Dataclass.metadata( type ) ) {
                output.push( ...DataclassMetadata.pipes( Dataclass.metadata( type ) as DataclassMetadata ) );
            }
        } );

        return output;
    }

    pipes: Pipe[] = [];

    properties = {} as Record<keyof T, PropertyMetadata>;

    setProperty( name: keyof T, type: any, ...pipes: Pipe[] ): void {
        this.properties[ name ] ??= { type, pipes };
    }

    getProperty( name: keyof T ): PropertyMetadata | null {
        return this.properties[ name ] ?? null;
    }
}
