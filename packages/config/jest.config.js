/******************************************************************
 * Copyright (C) LvChengbin. 2022-2023 All Rights Reserved.
 *
 * @File: config/jest.config.js
 *
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 ******************************************************************/

const { name } = require( './package.json' );

module.exports = {
    ...require( '../../jest.base.config.js' ),
    rootDir : __dirname,
    displayName : name,
    id : name
};
