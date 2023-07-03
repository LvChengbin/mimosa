# @mimosa/core

```ts
import { Application } from '@mimosa/core';

const application = const Application( {
    controllers : [],
    providers : []
} );
```

```ts
import { Module } from '@mimosa/core';

@Module( {
    controllers : [],
    providers : []
} )
class MainModule {}

const application = Application.create( MainModule );
```

```ts
import { Application, ApplicationOptions } from '@mimosa/core';

@Module( {
    controllers : [],
    providers : []
} )
class SampleApplication extends Application {
    constructor( options: ApplicationOptions ) {
        super( options );
    }
}
```

```ts
import { Application, ApplicationOptions, Module } from '@mimosa/core';

@Module( {
    controllers : [],
    providers : []
} )
class MainModule {}


@Module( MainModule )
class SampleApplication extends Application {
}
```
