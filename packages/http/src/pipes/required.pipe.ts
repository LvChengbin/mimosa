/******************************************************************
 * Copyright (C) 2022-2023 NextSeason
 *
 * @File: pipes/required.pipe.ts
 *
 * This file is part of NextSeason projects.
 * Code in this file can not be copied and/or distributed without the
 * express permission of NextSeason. Inc
 ******************************************************************/

import { PipeMetadata } from '@mimosa/core';
import { Application } from '../application';
import { Context } from '../context';
import { BadRequestException } from '../exceptions';
import { ExceptionResponseObject } from './interfaces';

export function Required( exception?: ExceptionResponseObject | Error ) {

    /**
     * An error will be triggered by typescript if not adding the `unknown` constraint to `T`.
     * https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABMMAeAKgPgBSIB4Bci6iAlESQN4BQidiMwueiAvO4gOSdmKUC+tegCcAplBDCkeANzV+QA
     */
    return async <T>(
        value: T,
        ctx: Context,
        application: Application,
        metadata: PipeMetadata
    ): Promise<T> => {

        if( value as unknown === '' || value === undefined || value === null ) {

            if( exception instanceof Error ) throw exception;

            const property = metadata?.data?.property;

            throw new BadRequestException( {
                message : [
                    property ? `${String( property )} is required` : 'missing parameter'
                ],
                ...( exception ?? {} )
            } );
        }

        return value;
    };
}
