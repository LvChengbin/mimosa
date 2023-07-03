/******************************************************************
 * Copyright (C) 2022 LvChengbin
 *
 * File: application/index.ts
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 05/14/2022
 * Description:
 ******************************************************************/

import { Module } from '@mimosa/core';
import { Application } from '@mimosa/http';
import { MainController } from './main.controller';

@Module( {
    controllers : [ MainController ]
} )
export class TestApplication extends Application {
}
