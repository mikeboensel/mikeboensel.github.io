---
layout: post
title:  "A gentle introduction to Calculus."
date:   2017-09-10 15:26:55 -0700
categories: jekyll update
comments: true
---

Calculus is all about how things change. Remember getting the slope of lines? The old rise over run from 7th grade? That's the Derivative! 

How about finding the area for shapes? Rectangles were base times height,triangles were half a rectangle, etc.  
Perfect, thats the Integral! It's sometimes called the anti-Derivative, because just like if you add 5 to a number and then subtract 5, 
if you take the derivative and then take the integral nothing has changed.

So let's look at a rocket launch. We find that the velocity function* is v(t) = t

Let's plot that on a graph. Remember, how we construct graphs. The X-axis is considered the input. It doesn't have to be called X. 
Here were are going to call it t, because it represents Time in seconds.
The Y-axis is the function's output. In this case velocity in feet per second.

![RocketFunction]({{ site.url }}/_images/BasicRocketGraph.png)

Let's use some of our fancy new knowledge. Let's find the derivative (slope). Let's take a nice easy set of points. Our first point (p1) will be the origin (0,0). p2 will be (5,5).
Slope = rise/run = (p2 rise - p1 rise) / (p2 run - p1 run) = (5 ft/sec - 0 ft/sec) / (5 sec - 0 sec ) = (5 ft/sec) / (5 sec) = 1 ft/(sec * sec)

I included the units in our calculation, which highlights something very cool. The slope is the rate of change, right? Our graph is a graph of velocity. A change in velocity is acceleration. 
And that is what we found. We move 1 ft/sec faster EACH second.

Interesting. How about that Integral? Just like with the derivative we need to pick 2 points. Let's take the same 2 points. And that looks like a triangle, so 1/2 * 5 sec * 5 feet/sec = 12.5 ft

Again our unit changed! What does it mean? Well we notice that Integration seems to be the opposite of operation of the derivative. It removes a division by seconds term instead of adding it. 
So if velocity was a derivative of something and we just reversed that operation what do we have? Velocity is change in position. So now we have position above the launch pad. The units make sense.


So why have mathematicians made fancy new words? To confuse us? No, because we are adding methods to get slopes and areas for more complex shapes than lines. In the real 
world a function for a rocket's velocity would include wind resistance, air pressure, air temperature, etc. It would be pretty complex! We need power tools. With calculus we 
can get these values for really big inputs (imagine seeing the rocket's velocity hours after launch ) and with infinitely high precision (what is the slope at EXACTLY this point, which 
is trivial to do with a graph by hand for a line, since it has the same slope at all points, but much harder (read impossible) for anything more complex)! 


So you could certainly argue I've left a lot out. Where is the chain rule, the discussion of limits, quotient rule, trig functions, the problem sets? I don't disagree, especially about
a discussion of limits since that is conceptually very important, but we've established a baseline of understanding we can expand from. 

Should my own teaching prove too shallow there are plenty of sites that provide more depth.

Also, lets be honest, there are solvers and if the operation is hard, we're plugging it into Wolfram Alpha. Its a fun exercise if you have the time to work it out, but we've all got lives and time constraints. 
The interpretation of the results that's the value add most people provide, not the plug and chug.

