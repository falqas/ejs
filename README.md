
# SPA vs Multi-Page Apps; EJS for Server-Side Rendering 

## TLDR;

Here are 2 different ways to write web apps; both will be used when we come to Rails.

### SPA vs multi-page:
1. Most of what we've done so far has been SPA
2. Multi-page apps have their place too (ie most of the internet)

### Server-side rendering:
1. Everything we've seen has been client-side rendering
2. There's another way: server-side rendering
3. For our purposes, not a lot of differences between them
4. Ruby on Rails does server-side

### SPA vs MPA:
MPA PROS & CONS 

MPA Pros:
+ MPAs are a simpler option when designing monolithic applications with only one state section.

+  The initial page load is normally faster than the initial page load of an SPA (ie no need to load the whole app at once, generally speaking)

MPA Cons:
- Subsequent pages take equally long to load because a request is sent to the server for data and UI rendering

- Not all code can be re-used for a mobile version of the application which means extra development time

SPA Pros:
+ Pages load faster when a user navigates within the application which results in a “snappier” user experience after the initial load.

+ More advanced, richer applications can be built with Single Page Applications

SPA Cons:
- It takes more time to initialize the application as it has to be downloaded to the user’s device. But this can be improved by server-side rendering.

- SPAs require the user to have JavaScript turned on.

- Memory leaks in JavaScript can lead to a drop in performance (or crash).

- Enterprise apps can be harder to design and maintain as SPAs due to the larger number of files generated as well as the need to maintain two states between the SPA and the RESTful API.

Up until now, we've only done client-side rendering. 

## How client-side rendering works
Client-side rendering means JavaScript running in the browser produces HTML or manipulates the DOM. The benefit is you can update the screen instantly when the user clicks, rather than waiting a few hundred milliseconds at least while the server is contacted to ask what to display. 

Sites where you mostly navigate and view static content can get away with mostly server-side rendering, but I can't think of any website that doesn't do any client-side rendering. Any portion of a page that's animated or highly interactive (a draggable slider, a sortable table, a dropdown menu) almost certainly uses client-side rendering.

When developers talk about client-side rendering, they’re talking about rendering content in the browser using JavaScript. So instead of getting all of the content from the HTML document itself, you are getting a bare-bones HTML document with a JavaScript file that will render the rest of the site using the browser.

This is a relatively new approach to rendering websites, and it didn't really become popular until JavaScript libraries started incorporating it into their style of development. Some notable examples are Vue.js and React.js,

## How server-side rendering works 

What is it? Rendering on the server, as opposed to on the client.

SSR is the process of taking a client-side js framework, and rendering it to static html and css on the srever. 

Server-side rendering means when the browser fetches the page over HTTP, it immediately gets back HTML describing the page. Server-side rendering is nice because:

Your content is visible to search engines like Google.
The page loads faster. 

Server-side rendering is the most common method for displaying information onto the screen. It works by converting HTML files in the server into usable information for the browser.

Why do it?
- Performance benefit for customers (it's faster - at least on initial page load)
- Makes pages more easily indexed by search engines (SEO performance)

## Why are we learning this? RAILS.

# Example of server-side rendering in Node

Express comes with the ability to plug in a whole variety of template engines

Express touts itself as *unopinionated* - means it likes you to have a choice

When it comes to view engines, this comes down to what developers like to use - an opinion.

Express gives you the ability to plug in your own template engines, that would then output on the response stream back down to the http response

So on the Express page, under "guide", you can see 

You just have to set the view engine:

`app.set('view engine', 'file extension');`

jade/pug is a little strange to use. 

But here's one that's been around a while: ejs

And remember, a template engine is just a utility that will take text and translate it into the html that shoudl be delivered in the http response.

So ejs, which can be found at ejs.co, is very simple:

Has some good features, missing some. It's inspired by asp.net web forms - a MS technology. It's good and simple for us to play with.

It uses these strange delimiters into which I put my code:

`<%= %>` 

But I can run js code inside of it and output data

So Express gives us the means to connect the URL of the file to the route, as well as the data that the template might need to use, and the code that's inside the template.

So, example:

`npm install ejs --save`

Now it's in my node_modules folder

Then in my Express server file, I use:

`app.set('view engine', 'ejs');` 

I set the extension as `ejs` so Express knows what files to look for.
By default, Express will look for these files in views.

So I can make a new file inside of the views folder called index.ejs
Then I can write some basic html in this file.

Then in my server.js, I all I have to do, is instead of sending the html manually, I can say `res.render();`
And what Express will do, is go to wherever the views are, and look for the file of the name you give it, plus the file extension you set for the view engine - so, index.ejs

This is nice, because if I ever switch view engines, I wouldn't have to change the file that I'm looking for - just change the extension.

So then I refresh my app, and it renders the html.

Then I can just change my content on the fly, and every time I change it, Express will change my content for me. Then a designer can come in and much more easily change my contents.

Let's make another one - `person.ejs`

Let's do the same thing. Paste in the content of index.js, but instead of 'Hello world' add this:

`<h1> Person: </h1>`

Now remember when we want to output something with ejs, we add these special characters. `<%= %>`

Write the word ID in it

This will be data given to the view, that it can run, parse, and generate the proper html.
How is it going to get this data? Well, this render method that Express uses... we can give it a js object that it can use to render those views. That js object can be anything that we want.
So if I say `{ ID: req.params.id }`
this ID can be used as a regular variable inside of our ejs file.
And most view engines work this way.
You don't even have to reference that object, you just automatically get properties on it. And you can even run js on it. So let's give it a try: 

Create a new route:

```javascript
app.get('/person/:id', (req, res) => {
    res.render('person', { ID: req.params.id });
});
```

And now with res.render and we pass in 'person', we are setting the filename, and express will look for person.ejs in views and then give this to ejs in order to figure out what to do when it sees these special characters, and ultimately generate the string for the response.

And it outputs correctly.

We can even add javascript!

This gives us a lot of flexibility.

Add `<%= ID.length %>` - you'll see the length of the string that was passed in.

I can give the object (often called the model) for loops, arrays of data...I can generate the entire html, the UI...that's the whole point of a template engine. Now ejs has something called 'include', so for example I can include a header and footer on every page.

Other templating engines are even more powerful, and have something called layouts, so I can define a single parent page and embed the contents of my other pages inside of it, and it gets combined...which is easier when it comes down to rewriting and restyling my pages later.

A lot of people like jade/pug because they don't have to type less than/greater than symbols. It's really up to you when it comes to view engines. All you have to do is npm install them, put it in your views folder, and render it!

This takes care of the idea of dynamically generating html on the fly.

This makes Express, combined with the idea of view engines, something you'll see a lot of, and something you will see in lots of apps.

