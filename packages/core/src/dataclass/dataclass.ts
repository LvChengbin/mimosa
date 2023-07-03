/******************************************************************
 * Copyright (C) 2022 LvChengbin
 *
 * File: src/data-class.ts
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 05/23/2022
 * Description:
 ******************************************************************/

import 'reflect-metadata';
import { Constructor } from 'type-fest';
import { DesignTypeMetadata } from '@mimosa/method-interceptor';
import { Application } from '../application';
import { Pipe } from '../interfaces';
import { chain } from '../pipe';
import { DataclassMetadata } from './metadata';
import { DATACLASS_METADATA_KEY } from '../constants';

/**
 *
 * @example
 *
 * ```ts
 * @Dataclass()
 * class SampleData {}
 * ```
 */
export function Dataclass( ...pipes: Pipe[] ): ClassDecorator {
    return ( target: Function ): void => {
        const metadata: DataclassMetadata = Dataclass.metadata( target ) ?? new DataclassMetadata();
        metadata.pipes = pipes;
        Dataclass.defineMetadata( target, metadata );
    };
}

/**
 * Create a Dataclass object with a Dataclass constructor and initial data object.
 *
 * @example
 *
 * ```ts
 * @Dataclass()
 * class AccountData {}
 *
 * const account = Dataclass.create( AccountData, {} );
 * ```
 */
Dataclass.create = async <
    T extends Constructor<any>,
    C = any,
    A extends Application<C> = any,
    M = DesignTypeMetadata
>( dataclass: T, data: any, ...args: [ C?, A?, M? ] ): Promise<T | T[]> => {

    /**
     * Support passing an undefined or null value
     */
    if( !data ) return data;

    if( Array.isArray( data ) ) {
        const promises: Promise<T>[] = [];
        data.forEach( item => {
            promises.push( Dataclass.create( dataclass, item, ...args ) as Promise<T> );
        } );
        return Promise.all( promises );
    }

    const metadata = Dataclass.metadata<T>( dataclass );
    if( !metadata ) throw new Error( `${dataclass.name} is not a Dataclass.` );

    const output = {} as T;
    const promises: Promise<any>[] = [];

    Object.keys( metadata.properties ).forEach( name => {

        const { type, pipes } = metadata.properties[ name as keyof T ];

        if( Dataclass.metadata( type ) ) {
            const promise = Dataclass.create( type, data[ name ], ...args ).then( value => {
                if( value !== undefined ) output[ name as keyof T ] = value;
            } );

            promises.push( promise );
        } else {
            if( pipes.length === 0 ) {
                if( data[ name ] !== undefined ) output[ name as keyof T ] = data[ name ];
            } else {
                const promise = chain( pipes, data[ name ], ...args ).then( value => {
                    if( value !== undefined ) output[ name as keyof T ] = value;
                } );
                promises.push( promise );
            }
        }
    } );

    await Promise.all( promises );

    if( metadata.pipes.length === 0 ) return output;

    return chain( metadata.pipes, output, ...args );
};

Dataclass.defineMetadata = ( dataclass: Function, metadata: DataclassMetadata ): void => {
    Reflect.defineMetadata( DATACLASS_METADATA_KEY, metadata, dataclass );
};

Dataclass.metadata = <T = any>( dataclass: Function ): DataclassMetadata<T> | null => {
    if( typeof dataclass !== 'function' ) return null;
    return Reflect.getOwnMetadata( DATACLASS_METADATA_KEY, dataclass );
};
