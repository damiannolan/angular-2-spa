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

## Technology

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

## Architecture

## Features in the current state

## Limitations and Known Bugs

## Future Development

## Conclusion