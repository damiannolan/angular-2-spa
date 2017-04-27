## Introduction

In the following the project I set out with the mission in my mind of getting a single page web application – (SPA) up and running using Angular 2 and having the entire back-end written in Typescript using Restify and running on Node.js.

In the beginning I aspired to have a rich front end with various different features for users to interact with. My idea was to create a platform in which Musicians and like-minded individuals with an interest for music could come together and write article posts about experiences and act as a noticeboard for users to post about buying and selling equipment or musicians seeking like-minded people to collaborate with.
 
However, my focus was driven more towards learning about technologies that I was given little or no exposure to in college in order to apply myself and essentially test my ability of learning about new technologies when being thrown in the deep end. I found myself focusing less on the front-end I had in mind and becoming more of a full stack developer and enjoying building and structuring my Typescript Restify API more than working on front-end development. As a result of this and the limitations of time that come along with learning new technologies and balancing other modules, my single page web application became more primitive. However, what I gained in knowledge of building SPA’s, RESTful web services and how to structure and maintain a web based project is where I feel I succeeded.

I also gained good knowledge of learning how to use a Neo4j graph database with a Node.js application - that of which not a lot of information can be found online. Using a Graph Store database as part of the project gave me good insight of how useful they can be to create a simple and easy to follow schema. Much of my desire to use Neo4j as a database came from the project I carried out in Graph Theory which can be found [here!](https://github.com/damiannolan/graph-theory-project)

Much if not all of the technology used in the building of this project was brand new to me at the start of the development process. I was inspired to use Angular 2 and Typescript as I found good enjoyment in using Angular 1 & Python Flask in a project in semester 1 for Data Representation and Querying, this sparked my interest in what Angular 2 had to offer knowing that it used Typescript instead of Javascript as it's primary language. This led me to be intrigued at the prospects of creating an entire RESTful API using Typescript and how I could go about using what Typescript has to offer to my advantage.

## System Requirements

Prerequisites and dependancies have been specified on the front page README.md file of both repositories.
A sample Neo4j database directory shall be provided in a zip file and housed in the back-end repository.
The application has been primarily developed and tested using Google Chrome as the web browser and for debugging purposes.

## Technology & Architecture

### Why use Typescript?

Typescript is a free and open-source programming language developed and maintained by Microsoft. Typescript is a superset of Javascript, meaning it compiles or 'transpiles' to plain Javascript. Typescript offers the ability to make web development that would have previously been done using Javascript lean towards a more strongly typed nature and offers object-orientated design similar to that of Java or other object-orientated programming languages.
Anders Hejlsberg, who is the lead architect of the C# programming language has worked quite a lot on the development on Typescript and therefore has some similarites as well.

Some of the Typescript functionality showcased in this project both front and back end has been the use of:

- Interfaces
- Classes
- Inheritence (eg: Extending Restify.Request on backend)
- Arrow functions
- Use of of async / await (eg: All functions interacting with Neo4j are async)

### Angular 2

Angular 2 is the successor of Angular's very popular 1.6 version which has been around since 2010. Angular 2 or now simply referred to as *Angular* was released in September of 2016 and has already made its way to version 4.0 as of March, 2017.

Angular 2 has adopted Typescript which lends itself to use all of Typescript's most valuable features including the ones mentioned above. With the release of Angular 2, the concept of 'scope' or controllers has been abandoned an instead Angular 2 employs the use of a hierarchy of separate modules for features named Components.

Using the new Angular CLI tool which has been released with Angular 2 Components can be generated via the command line.

    ng generate component example

The command above will generate an entire new directory for a new componenet named Example under the src/app/ directory. The CLI cool can also be used for generating services among other very powerful features including building for release and serving for development using `ng serve`.

The use of a hierarchy of components means that components can be nested inside other components. Eg: An ArticleList Component may be made up of a series of Article Components.

Services in Angular 2 are whats known as Injectables. Injectables can be injected via dependency injection in the constructor of a component. Services are singletons in Angular 2 which means there is only ever one instance of a service existing through an applications lifecycle, whereas a Component has the lifecyle of initlisation on navigated to and destruction and garbage collected on navigated from the particular route in which they exist. 

Angular 2 offers a number of different lifecycle hooks in which you can tap into by implementing the appropriate interface and overriding the function name. Eg: Writing the ngOnInit() function or ngOnDestroy() function.

### The Event Loop

Node.js and browser based applications such as this one that uses javascript under the hood have a concurrency model based on what is known as the Event Loop. The Event Loop runs on a single thread and employs a queue of callback functions. When an asynchronous function is called, it is pushed onto the queue of callback functions and the Javascript engine doesn't run onto the next tick of the Event Loop until the async function has finished executing.

This model resembles the snippet below taken from [developer.mozilla.org](https://developer.mozilla.org/en/docs/Web/JavaScript/EventLoop)

    while (queue.waitForMessage()) {
        queue.processNextMessage();
    }

### Promises and Observables

#### Promises

Promises are in use throughout much of this entire project. Promises are a placeholder or proxy that represent the value or result of an asynchronous operation. A Promise has 3 states it can be in:

- Pending - where the asynchronous operation hasn't completed yet
- Fullfilled - where the asynchronous operation is resolved with a result
- Rejected - where the asynchronous operation is rejected with a reason for failure

In Angular 1.6, Promises were exposed using the $q service. In Angular 2 using Typescript we can have functions that return a Promise of a given type. Promises are considered to be *Thenable*, using the .then() function. The `then()` function takes two arguments which are callback functions to be run for either success or failure of the Promise and also returns a Promise. This is for the use of what is known as Promise chaining.

#### Observables

Observables are a huge part of Angular 2 and come from a library called [RXJS - Reactive Extensions](http://reactivex.io/rxjs/). Reactive Extensions offers a number of different features which employ Functional Reactive Programming. Functional Reactive Programming is a paradigm for asynchronous dataflow programming which uses Functional Programming elements. Reactive Extensions have libraries for various different languages like Java, C# and CPP and it not just catered to web development using Javascript.

Observables are a key concept of RX. An Observable can be thought of as a stream on which an *Observer* can tap into or `subscribe()`. Where Angular 1.6 uses a $http service based on the $q implementation of promises, Angular 2 uses Observables for making HTTP Requests. For example:

A request made to an endpoint for retrieving an array of Articles will return an Observable of type Response - `Observable<Response>`. RXJS offers a large number of different functions that can be used upon an Observable, the one we are most interested in for the case of this project is the `.map()` function. The `.map()` function takes an Observable stream and makes a projection of its data - eg: The stream contains a HTTP response and we want to project the JSON data or body of the response. This can be by calling `.map(res) => res.json()` this can be read as - Project the response, such that we extract the the response's json body.
However, these projections of data can be chained and we do not actually materialize the result until we call `.subscribe()`. In this instance, by calling `.subscribe(responseJSON)` we are materialising the projection of the response we got initially from our HTTP request. We can then act on the JSON the data that we were after.

The above example is taken from this project in `article.service.ts` file, in which a HTTP Request is made to the back-end to retrieve an array of articles.

##### Hot and Cold Observables

Observables can be either Hot or Cold. But what does this mean? A Hot Observable may start emitting data as soon as its created and is considered to be hot due to the fact that when an observer subscribes it begins recieving data somewhere in the middle of the data stream. A Cold Observable on the other hand will always emit data from the beginning of when it was created - meaning an observer who subscribes will get access to the data stream history and conceptually a window back in time - if the data has been manipulated since.

Example: Netflix uses Reactive Extensions and Observables for their streaming service. An episode of your favourite show on Netflix may be considered a Cold Observable as you have access to always jump from start to end or end to start of the data stream. However, a streaming service which provides Live Streaming may be considered to use Hot Observables as when you tune in, you are getting the data from the point in time at which you subscribed.

### Typescript Restify API Server

As previously mentioned on the front page README of this repository the Typescript Restify API Server which accompanies the front end Angular 2 project can be found at this url - https://github.com/damiannolan/typescript-api

Setting up a development environment for creating a Node.js server written in Typescript using `npm scripts` was quiet an arduous task. The back end for the project is written in Typescript and transpiled to Javascript using the tsc compiler and run on Node.js using an `npm script` for development process. By calling `npm run watch` when starting the Typescript Restify API Server there is a couple of different things going on. Firstly, a clean is done on the Javascript target directory - `lib`. Then the Typescript source code under the `src` directory is transpiled into `lib` where Node.js can run the target file `server.js` using [PM2-dev](http://pm2.keymetrics.io/docs/usage/pm2-development/) which allows you to start an application and restart it upon a file change. Using the npm concurrently package with -k: --kill-others which kills others processes if one exits or dies, we can then restart the whole chain of events by triggering this event when pm2-dev detects a change in `src` directory. By using -r and --raw flags on the scripts we can de-prettify any logging styling done by either of the packages and then pipe the output through Bunyan for logging - ` | bunyan`.

The server application has been created using Restify. Restify is a Node.js REST framework specically intended for use in the building of web service API's. Restify allows developers to get a simple REST service up and running, the ability to employ middleware eg: CORS - (Cross Origin Resource Sharing) and the creation of API routes for incoming HTTP requests.

The web service is intended to be loosely coupled and written in a modular fashion, paying close attention to the separtion of concerns. While building this web service, I have abstracted database interaction into it's own specific directory and imported needed functions into their respective routes. The main `server.ts` file is located in the root of the `src` directory of the back-end repository.

### Facebook Authorization

Through the lifecyle of the development of this project it was one of my main goals to include Facebook authentication as the primary means of logging into the application. For many weeks, I spent a lot of hands on time playing around with [passport.js](http://passportjs.org/), however due to limitations of time and having difficulties with the library, I chose to delegate the Facebook login system to a library on the front-end application called [hello.js](https://adodson.com/hello.js/). Hello.js is a client-side Javascript SDK for authentication with OAuth2 web services and handles querying a platforms API such as Facebook or Twitter.

### JWT - JSON Web Tokens

From my time spent researching OAuth2 and Facebook Authentication I grew more interested in authorization as a whole and began thinking about how I could secure my own API routes. I learned about JSON Web Tokens and how they can be used to provide a client with a Authorization Bearer token. Having accomplished securing a user's Facebook Access Token on my client side using Hello.js, I saw it fit to then exchange the Facebook Access Token for my own JWT created on my back-end.

The application follows the procedure in the following order:

1. Secure Facebook Access Token
2. HTTP Post to server-side route - `/auth/facebook`
3. Verify that the token is valid by hitting the Facebook API
4. Create a new user in the database if they do not already exist
5. Issue them with a JSON Web Token created on my own Typescript Restify Server

While carrying this process out I truly began to see the benefits of Restify and Typescript. When hitting my API route `/auth/facebook`, I provided an array of functions to be executed in sequence by calling Restify's `next()` function. The aforementioned functions dealt with with each of the tasks - Verify Facebook Token, Creating a User if not already existing and Issuing of a JSON Web Token. I was able to use Typescript's inheritence to tag on my user profile to the Request object and then access it in my create user function for saving to the database.

From this, I could then store my JWT on my client side using LocalStorage and decode my user object from the token using Javascript's `atob()` function - for base64 decoding.

#### Protecting Restify API Routes

The primary reason for issuing a client with a JWT is to protect the routes of the Restify API by using the middleware provided by JWT. The node JSONWebToken package allows the use of middleware to protect routes unless they are whitelisted in the JWT Configuration. By doing this, we then need the Bearer token issued by the server to successfully make HTTP requests to endpoints across the server. The bearer token can be provided in a HTTP authorization header.

To demonstrate the protected routes, screenshots are provided below.

#### Without Authorization Header

![example1](http://i.imgur.com/gQkqCoq.png)

#### With Authorization Header

![example2](http://i.imgur.com/bjh0eB1.png)

#### Creating an Auth Guard

A further benefit of storing a JWT in LocalStorage then meant I could setup an Authorization Guard for routes on my front end. All routes on the front end application except for /login are protected by using an Auth Guard in Angular 2. To create an Auth Guard one most implement the CanActivate interface and override the `canActive()` function. By doing this, we can then employ the Auth Guard to protect whatever routes we choose in `app.module.ts`.

### What are Graph Databases and Neo4j?

Graph databases are databases which use graph structures for storing and collating data to represent meaningful information for a given data set. A Graph database is a database management system with CRUD (Create, Read, Update and Delete) operations working on a graph data model.

In Graph databases vertices are referred to as nodes and perhaps the most key concept for storing data is how edges between vertices or nodes are known as relationships. Relationships depicted via edges directly relate data items within the store and can be uses for traversal of a node tree within a database.

Other types of database such as SQL based databases compute relationships at a rather expensive query time whereas Graph databases store relationships as 'first-class citizens' to make 'join-like' queries of a database as in-expensive as possible.
Thus, Graph databases are considered to be NoSQL databases, however they offer much more complexity than that of a Document Store such as MongoDB or CouchDB.
To those who are experienced and comfortable with concepts such as entity relationship diagrams, the idea of storing data in a Graph-like manner should come quite naturally.

### Neo4j

Neo4j is an open-source NoSQL graph database implemented in Java and Scala. It has been under development since 2003 and available publicly since 2007. The entirity of Neo4j's source code is available on their [Github](https://github.com/neo4j/neo4j) where they have over 40,000 commits from over 140 different contributors. With Neo4j graphs are composed of two basic elements - Nodes and Relationships. Nodes and Relationships can be easily compared to vertices and edges of a traditional graph respectively. Nodes and Relationships allow for complex patterns throughout graph databases and can be much more expressive than static tables. Because it JVM based, Neo4j makes for a very useful database to be used cross platform and also offers Clustering and ACID Transactions like that of a SQL database.

### Cypher Query Language

CQL - Cypher Query Language or more commonly known as 'Cypher' is a declaritive query language created by Neo Technology for Neo4j but has since been made available and adopted by other graph databases such as SAP HANA and AgensGraph.
Much of Cypher's syntax is inspired from SQL so being familiar with a database such as MySQL will give users a decent base level of know how when adopting Cypher.
Being a declaritive language, Cypher allows users to state what they want to retrieve from a graph and not how to achieve doing it. Cypher allows for expressive and efficient querying and updating of data.
With Cypher Nodes are expressed using round brackets or parentheses: ( ), relationships as square brackets: [ ] and properties using curly braces: { }.

## Features in the current state

1. Securing a Facebook Access Token
2. Verification of Facebook Token on server
3. Exchanging the Facebook Access Token for a JSON Web Token
4. Authorization Guard & Protected API Routes using JWT
5. Ability to obtain article posts from server using Authorization Header in Request
6. Populating a category list from server
7. Ability to create an article post under a particular category using Reactive Forms
8. Ability to filter and livesearch posts using Observables

## Limitations and Known Bugs

Throughout the process of development there was a number of issues I faced which I feel held back my progression with getting the project to where I intitally aimed my target goal in setting out.

Hours and hours were spent trying to trying to debug an issue with Facebook Picture URL's and character encoding. The issue I was faced with was that in creating a JWT on my server side with the picture URL of a user as a property on the payload, I could not correctly decode the JWT on the client-side using Javascripts `atob()` function. I later learned from digging through Facebook's API that the picture URL's are base64 URL Encoded and not reguarly base64 Encoded, meaning that depending on certain characters in the URL issues could be faced when decoding with `atob()`. This was a nightmare of a problem to solve and really put a spoiler on working with Facebook as the issue was completely inconsistent and dependent on a URL having certain characters or not. In the current state of the application there is quite a 'hacky' fix for the problem I faced. At the moment the picture URL server side is being double wrapped by using `base64.encode()` on the picture URL payload property and then signing the JWT with the payload. This means that client side in `auth.service.ts` we must use `atob()` twice. Once on the tokenbody and again on the picture URL property.

Over the past number of days I having been reading up on libraries that can bypass this problem by not using `atob()` for decoding the token and employing a JWT Decoding library instead.

## Future Development

My future plans for development of the application are to get it to where I initially envisioned it to be when setting out in the beginning.

Features:

- Ability to sign up with various other platforms - Google, Twitter..etc
- Ability to sign up without a 3rd party platform
- Ability for users to follow one another
- Only show posts on home page for the current user and their follower list
- Ability to view a follower list and following list of users
- More dynamic post creation - Choose to post an article, advert or notice
- Replies on posts - forum threads
- Add a rich user profiling system - Allow users to customize their profile
- Customization of profile to include the user's ability regarding instruments, interests in genres etc.
- An inbox and messaging system to enable users to communicate through the app privately

## Conclusion

Although I am disappointed with how the application turned out visually or from a user's perspective, I feel I have learned a lot from the experience and a lot about myself as a developer. I initially set out to create a rich front end user experience with many features, which I later learned was a unrealistic ambition given the amount of time for the project and balancing that between other modules throughout the semester. Despite this, I feel my focus was lended more towards learning about new technologies and how to apply myself to learning about different frameworks and create a project using them in a limited amount of time.

I feel the time I spent applying myself to learning about full stack development was invaluable, and the hands on experience with an array of different libraries and technologies gave me true insight into real world development and the problems any developer can be faced with day to day. From my experiences using Typescript as the primary language for development throughout the project I feel it has a lot to offer and I would be recommending it to many web developers to allow them have a richer programming experience by using it.

Overall I think this has been more of learning experience than anything else and I am happier for that than attempting to build a market ready application with low value. This application is not market ready however the skills I have developed throughout building it have given me true insight into the development of single page applications.

## References

[Typescript](https://www.typescriptlang.org/)
[Angular](https://angular.io/)
[RxJS](http://reactivex.io/rxjs/)
[Restify](http://restify.com/)
[PM2](http://pm2.keymetrics.io/)
[JWT](https://jwt.io/)
[Neo4j](https://neo4j.com/)
[Neo4j - Javascript Driver](https://github.com/neo4j/neo4j-javascript-driver)
[hellojs](https://adodson.com/hello.js/)
[Moment](https://momentjs.com/)
[bunyan](https://github.com/trentm/node-bunyan)