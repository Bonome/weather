# Weather dashboard

This project is a weather dasboard web app.
You can add a city and the weather and temperature of all cities will be displayed on the dash.


## Getting Started

To get you started you can simply clone the weather_dash repository and install the dependencies:

### Prerequisites

You need git to clone the weather dashboard repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

### Clone weather_dash

Clone the weather_dash repository using [git][git]:

```
git clone https://github.com/Bonome/weather_dash.git
cd weather_dash
```
### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

Or 

  You can just run bower and link the repository to your www/ apache directory.

*Note that the `bower_components` folder would normally be installed in the root folder but
weather_dash changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.

Or

Browse at `http://localhost/weather_dash/app/index.html`.
