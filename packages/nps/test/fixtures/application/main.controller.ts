/******************************************************************
 * Copyright (C) 2022 LvChengbin
 *
 * File: application/main.controller.ts
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 05/14/2022
 * Description:
 ******************************************************************/

import { Inject } from '@mimosa/injection';
import { Controller, Get } from '@mimosa/http';

@Controller()
export class MainController {

    @Inject( '$CONFIG' ) config: ConfigService;

    @Get()
    index(): string {
        return this.config.get( 'name' );
    }
}
