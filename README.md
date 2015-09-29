# Flow API [![Circle CI](https://circleci.com/gh/srmds/Flow-API/tree/master.svg?style=shield&circle-token=46d1551fd9854de4f8ca53006186dc35aeeb6889)](https://circleci.com/gh/srmds/Flow-API/tree/master) [![Join the chat at https://gitter.im/srmds/Flow-API](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/srmds/Flow-API?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Rest API: [https://flow-api.herokuapp.com](https://flow-api.herokuapp.com)

This REST API strives to aggregate data, for music events per month/week, per city. For artists and their music, may it be pre-recorded or live streamable audio, audio & video, or purchable tracks / EP's / albums, their upcoming shows/gigs per month/week, cities, genres and present it in a unified form.

Below are `mobile clients` that currently utilize this REST API:

* [Electro Deluxe iOS client](https://github.com/srmds/ElectroDeluxe-iOS-Obj-C)

* [Flow Android client](https://github.com/srmds/Flow-Android-client)

## Prerequisites

[Nodejs](https://nodejs.org)

or via [brew (OS X)](http://brew.sh):

    $ brew install node

[NPM](https://www.npmjs.com)

[MongoDB](https://www.mongodb.org)


## Install dependencies

NPM is used as dependencies/package manager.

To install the needed modules for this Nodejs app,
run the following command from the `root`of the project:

    $  sudo npm install

Note that these dependencies are not checked in on the repo
and thus are only available on the local machine.

## Build and Run

### Environment variables

Create a file named `.env` in the root directory of your project. Copy and paste contents of example below in the file and save it (*** are don't care values):

    DB_HOST=***
    DB_NAME=flow
    DB_PASSWORD=***
    DB_PORT=***
    DB_USER=***
    NODE_ENV=development
    LOCAL_HOST=localhost
    LOCAL_DBPORT=27017
    APP_URL=localhost:3000
    MS_USER=***
    MS_PASSWORD=***
    MS_HOST=***
    PRODAPIKEY=***
    APIKEY=***
    FB_APP_ID=***
    FB_APP_SECRET=***
    FB_CALLBACK_URL=***

### Import JSON sample data

Startup mongo by running:

	  $ mongo

Create and use a database named `flow`:

	  $ use flow


Sample data can be found in the [samples](https://github.com/srmds/FlowAPI/tree/master/samples) dir, import by running:

via the provided shell script, found in root:

 First open up a new tab in terminal via `cmd + t` (OSX), then:

    $ ./data_import.sh

or manually on each file:

    $ mongoimport -d db_name -c collection_name --file filename.json --jsonArray

### Start server

Finally, from `root` of the project run:

    $ nodemon app.js

Nodemon will monitor for any changes and automatically restart the server if needed.
Open up a new browser tab and go to the follow to check if server is properly running:

    $ open http://localhost:3000

#### Debugger

There are two ways of utilizing a debugger one: using `Node-Inspector` or using `Intellij Nodejs plugin`:

##### Node-Inspector

Starting server with node-inspector debugger:

First start the debugger:

    $ node-inspector

then start express with debug flag:

    $ nodemon --debug app.js

Finally, open the following via a browser:

    $ open http://127.0.0.1:8080/?ws=127.0.0.1:8080&port=5858

Breakpoints can be set to files in the `Sources` directory via the browser.

##### Intellij Nodejs plugin

Read the below instructions on installing and configuring Intellij IDEA, Nodejs plugin

[Plugin and Debugger configuration](https://www.jetbrains.com/idea/help/installing-updating-and-uninstalling-repository-plugins.html)    

## API Overview

See: [https://flow-api.herokuapp.com](https://flow-api.herokuapp.com)


## Mocha tests

For every API endpoint there are tests, see test dir.

To run the Mocha tests, from `root` run:

    $ mocha

To run Mocha tests, with Coverage report generations, run:

    $ mocha -r blanket -R html-cov > coverage.html

Finally, open the `coverage.html` file in the root of the project in a browser to.


Note that by running tests, the local mongodb and it's collections are dropped!

Every testcase will create a fresh collection of data and runs with that collection, afterwards
the collection will again be dropped. You will have to (re)run the `data_import.sh` script, as described [here](https://github.com/srmds/FlowAPI#import-json-sample-data), to
get sample data in to the database.

## Deployed backend
Every change to the master branch will trigger an *automatic deployment*
of the backend to **Heroku**, after a succeeded build by the CI build-server.

The backend is accessible via:

[https://flow-api.herokuapp.com](https://flow-api.herokuapp.com)

## MIT License
Copyright 2015 srmds

Licensed under the Apache License, Version 2.0 (the "Software");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
