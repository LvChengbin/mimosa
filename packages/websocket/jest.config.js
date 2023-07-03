/******************************************************************
 * Copyright (C) LvChengbin. 2022-2023 All Rights Reserved.
 *
 * @File: websocket/jest.config.js
 *
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 ******************************************************************/


const { name } = require( './package.json' );

module.exports = {
    ...require( '../../jest.base.config.js' ),
    setupFilesAfterEnv : [ 'jest-extended/all' ],
    rootDir : __dirname,
    displayName : name,
    id : name
};
