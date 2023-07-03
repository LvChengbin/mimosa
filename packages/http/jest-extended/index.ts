/******************************************************************
 * Copyright (C) LvChengbin. 2022-2023 All Rights Reserved.
 *
 * @File: jest-extended/index.ts
 *
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 ******************************************************************/

import matchers from './matchers';

const jestExpect = ( global as any ).expect;

if( jestExpect !== undefined ) {
    jestExpect.extend( matchers );
} else {
    console.error( 'unable to fined Jest\'s global expect.' ); // eslint-disable-line
}
