---
layout: post
title:  "How to evaluate technologies"
date:   2018-01-14 07:26:55 -0700
---

<style>
.pass{
	color: green;
}
.fail{
	color: red;
}
.partialCredit{
	color: orange;
}

li > :first-child{
	margin-bottom: 0px;
}
</style>

The title is promising a lot. You should be skeptical. "You're going to tell me how to evaluate anything in a couple pages? Anything?" 
But I think we can develop a framework if we start simple and look to find the important aspects. So let's start with the most 
trivial and unimportant thing I can come up with. This blog. 

# My problem domain

This blog is a solution to a problem. So my problem statement is:

* __Main problem: How do I write and then get it out to the wider world?__
* It should be affordable
* It shouldn't look terrible
* It should be fast
* I don't want to spend a much (really any) time on non-writing tasks

# Our ideal solution

So an ideal solution hits these points:
* __Get writing out to the world?__

  <span class='pass'>Pass.</span> Reaches every human being 
* Affordable?

  <span class='pass'>Pass.</span> Free!
* Looks good?

  <span class='pass'>Pass.</span> Looking good is objective, but let's define it as most people saying its not bad.
* Fast?

  <span class='pass'>Pass.</span> Sends only my article across the wire (can't do better than that)
* Few non-writing tasks?

  <span class='pass'>Pass.</span> Requires no maintenance to keep running. Big changes are easy. 

Obviously these criteria conflict and we will have to make some tradeoffs. We also aren't putting concrete metrics to things like "Affordable". But this is a 
toy problem. So cut me some slack. I don't want to bludgeon you with a 20 page post.

# Defining technologies

The word technology comes loaded with the imagery of whatever is the current state of the art. We think computers. Cell phones. Maybe VR.
I want to broaden that perception before we proceed. 

![Tech perception]({{ "/images/2018-01-14-Thoughts-on-frameworks/techPerception.jpg"}})

Imagine someone attempting to get the word out at various points in history. Different things would be promising. 
A simple soapbox allows you to elevate yourself above a crowd. Your voice carries further as its not 
muffled by blocking bodies. Or a cone concentrates the direction of your voice as you speak 
into it. You can just talk, not yell! 

![Still tech]({{ "/images/2018-01-14-Thoughts-on-frameworks/megaPhone.jpg"}})

Picture yourself speaking at a conference. The techs are running around nervously. The microphones aren't working. We're 5 
minutes from starting... but there are only 20 people in the room. 

![Not a great attendance]({{ "/images/2018-01-14-Thoughts-on-frameworks/emptyAuditorium.jpg"}})

You'd probably prefer to just ask everyone to move to the front row and address them from 
the stage. The PA system might start working, but pop and hiss occassionally. Why bother with it? Its not necessary. You aren't getting anything from it. Just 
added complexity. And those techs are sweating and running around. Why not make their life easier? "Relax guys we're fine". But if 
suddenly hundreds more people crowd in at the last minute.

![Not a great attendance]({{ "/images/2018-01-14-Thoughts-on-frameworks/standingRoomOnly.jpg"}})

Better try to get those mics working again fellas... Our environment changed, resulting in a changed problem. 

The ideal solution depends entirely on your unique problem. What do you value and optimize for? So a technology is tool or technique we adopt or create to 
address a problem. 

I also want to tease apart certain technologies that we group by default. For example: if you are using HTML its assumed you are using a computer and a browser. 
That's the reference implementation. However, you could use it independently. It's a display and layout technology. One can imagine receiving telegrams with 
HTML and CSS. You start furiously drawing the described page, flipping through the HTML and CSS specs to create a final rendering. Who wants to do that? No 
one if you can feed it into a browser instead of doing it painstakingly. But its important to recognize that it is independent of its how its typically found. 
Since it is, we can use it in other contexts than web browsing.

# Picking our technology stack

How should we implement this solution we are calling a blog?

### Exploring physical solutions

We can quickly discard any ideas that exist in the "physical" world. Sending out unsolicited mass mail would be expensive and wasteful. 
![Oh, an article on Javascript! Thanks! I'll put that right in the trash]({{ "/images/2018-01-14-Thoughts-on-frameworks/OhMailForMeThanks.jpg"}})

Holding a talk on each blog post? No one's showing up for that. A topic may only going to appeal to a small % of the population. To reach an appreciable, interested audience requires 
being accessible far beyond my immediate geography. Ok, so no need to waste more time here. 

Stick with me, this seem pedantic, but we're moving in a direction. Namely, we've evaluated a family of solutions in respect to our problem. Do they look 
promising? If so, we drill down. Since they don't we move on. 

### Exploring digital alternatives

#### Simple text file solution

To meet our cost concern the Internet seems promising. Distribution is relatively cheap. The simplest thing would be just putting a bunch of txt files up on a server. 

* __Get writing out to the world?__

  <span class='pass'>Pass.</span> Anyone with a computer. Its tough to reach more people when you're going digitally :) 
  They can use their browser to view the files. Or they can download them with a 
  utility like WGET. Text files are simple. No formatting, so no requirements on special software.
* Cheap?

  <span class='pass'>Pass.</span>  
* Looks good?

  <span class='fail'>Fail.</span> You can do a lot of things with ASCII, but the art, tables, and diagrams are more impressive 
  because you're making due with so little, than impressive for their own sake.
* Fast?

  <span class='pass'>Pass.</span> The best!
* Lot of maintenance?

  <span class='pass'>Pass.</span> Couldn't be a simpler setup.
  
4 out of 5 is normally good enough. But the styling is a huge zero. I really want a clean, nice design. Reading Text files isn't fun. It looks lazy.

#### A richer file format solution

Let's try to build on this start. We just need want a nicer appearance. What if we used Powerpoint or Word instead of Text files? 

* __Get writing out to the world?__

  <span class='fail'>Fail.</span> 
  
  1. Now we are requiring our reader have special software. If you don't you're screwed.
	 Ever looked at one of those files using just a basic editor? Good luck.
	 ![Well that was clear...]({{ "/images/2018-01-14-Thoughts-on-frameworks/RawWordDocViewed.jpg"}})

	 
  2. Then there's possible compatibility issues if they have Word 2008, or LibreOffice and you wrote it on Word Super Deluxe Edition. Is it all screwed up? 
     What features can you use and still reach most people?
  
  
  3. I have to download and open your possibly virus-ladden file... Hard pass.
  
No point going on from here. 

#### HTML/CSS solution

So how about HTML and CSS? They're both just Text files that have been given some structure.

* __Get writing out to the world?__

  <span class='pass'>Pass.</span> You can structure the document and serve it to anyone with a web browser. Not too shabby, that's several billion 
  people. Anyone with a modern browser is going to be good to go. Even if they don't you can kind of read an HTML file in a text editor.
  ![Not fun but doable.]({{ "/images/2018-01-14-Thoughts-on-frameworks/RawHTMLDocViewed.jpg"}})
* Cheap?

  <span class='pass'>Pass.</span>
* Looks good?

  <span class='pass'>Pass.</span> CSS will let me do anything design-wise I could want. I'm just limited by my poor design sense. Tough to work around that.
* Fast?

  <span class='pass'>Pass.</span> I'm just serving up words, an occasional image, some Javascript if I'm feeling frisky and want some interactivity.
* Lot of maintenance?

  <span class='partialCredit'>Ehhh. Maybe?</span> Finally we're left with time spent on non-writing tasks. Things like maintaining, or changing the look and feel. Here we have a problem. Let's imagine I 
  want to change the header (top line above every page) to read "Mike's Awesome and Humble Thoughts". I have to edit every page I've written. That boring, but straightforward. 
  Maybe its worth accepting, but I'm looking at this blog as something I'll use for years. A little change here and there over that time adds up to a lot of me doing 
  idiot work. Plus, everything I've been taught and read teaches DRY (Don't repeat yourself). So I need a fix.

I'm calling this 4.5 of of 5. We're making progress. We just need some way to write everything other than the 
blog article's content in one place, once and only once. Great news, I'm not the first person with this problem. We're looking for a templating engine. 


-----------------




This blog runs off of Jekyll https://jekyllrb.com/. It's a static website generator. 
https://davidwalsh.name/introduction-static-site-generators I'd debated whether a tool like this 
really made sense or whether I should just write the blog in HTML. In general I tend to shy away from frameworks. I understand the benefits and arguments of raising 
your level of abstraction. A good framework solves common domain problems, it enforces best practices, it hopefully saves you work. 

However, they also bring their own issues: 
1) Diversity of structure and opinion
There are many sensible ways to structure things. The framework's designers likely picked a means that is 
very different than I would have. There's nothing wrong with that and its beneficial to view the world from another perspective. Their way is probably 
better. After all its many people thinking about the best way to address a specific problem. How much time have I spent thinking about it myself? A small fraction 
of the man-hours they have. Spending some time cheating off their answer sheet, so to speak, wrapping my head around their paradigm will help open my mind to 
better possibilities. It's enlightening. It's also time consuming and so you have to consider how much better their solution could be then yours and whether 
its worth the investment. You could make the argument that knowledge is priceless. Well so is time. You have to balance that tradeoff.

I'll give you an example: Most people know that a magnetic field creates and electrical field and vice-versa. They create and collapse into each other 
propogating out forever. That's my understanding. I've been told that magnetism arises out of viewing electrical charges through 
the lense of relativity and that's a better way to frame the situation. http://physics.weber.edu/schroeder/mrr/MRRtalk.html. I've given it a 
shot (and believe them), but its 
not something I've been able to really wrap my head around. For my purposes it doesn't really matter. I can do all the work I've done 
with the understanding I have. Maybe if I was trying to wring every % of efficiency out of generator designs for GE it would be essential. Instead I 
occassionally toy around with pre-built stuff as a hobbyist. Undoubtably, it would be good for me to expose myself more to it. But the return on my time for my 
present situation is small.

2) Leaky abstractions + Magic = Disaster
https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/
Abstractions are the key to getting anything done. If you had to understand everything a computer was doing, all the way down to the semi-conductors before you 
used them we'd never get anywhere. And in truth we still wouldn't know and appreciate all the intricacies as evidence by the recent Spectre and Meltdown vulnerabilities. 
https://spectreattack.com/
As a quick explaination, it was recently discovered that every advanced processor for the past 20 years performs unsafe operations that can allow for the breakdown 
of protections and the theft of information. You certainly can't expect people to look at the CPU industry and shrug "I'll wait until its been mathematically proven 
to be safe and reliable". You weigh the benefits versus the rewards of using something sophisticated technology that you don't fully grasp. You look to see if there are many others 
also casting their lots with that same technology. Its not a perfect metric, but if everyone is jumping off a bridge, by the time you decide to the government may 
have put up a net. Now, worst case you're in a large group, who all have a similar problem. Our economic system is structured around handling this. There's profit to 
be made there. If things are really bad and its effecting everyone the government steps in. Its the old case of if you owe the bank $100 its your problem, if you owe them 
a million dollars its their problem. 


Every abstraction leaks, so raising my level of abstraction is introducing more complexity that I'll ultimately have to wrangle. 
I've never worked with one and not had it act in an unexpected way. Sometimes it actually buggy. More often I've misunderstood the framework's 
expectations and design and my misuse it the cause of the screw up. Regardless, to me it appears this black box is preventing me from doing work. Now I have to 
dig in deeply to understand everything its doing.

Its times like these when you wish you'd just built the thing directly. 
3) Magic!
This ties right into the leaky abstraction point. Something's magic if a) I don't understand it b) It just works.
Its going to work, right up until it doesn't. Or until you try to use it for a slightly different use case. Whatever external components you 
bring into your work you'd better either have a plan to replace it easily (good luck, I've never seen this), be able to pull it apart/understand it/fix it 
yourself, or have budgeted to pay an outside consultant to fix it. If you don't have one of these fallbacks the framework is dangerous and unusable. If I don't 
understand it, but rely on it, its unreliable.

When I see that fancy framework, with all the bells and whistle... well... I think the same thing as a new bright red sports car. "You're going to break and I'm 
going to have to open you up and fix it. Or pay someone else a fortune to do so." I'm a lot of fun at parties.


So if I look under the hood and its something like this. Just back away slowly. 

"Uh I'm pretty sure the problem is with the fusion core?"
![Rolling repair bill]({{ "/images/2018-01-14-Thoughts-on-frameworks/FerrariEngine.jpg"}})

"Hey I know all these parts"

Just for the record I don't service my own car (other than basic fluids). But I could if I wanted to. And for that matter anyone with a service manual and wrench could. And 
the market knows that which keeps the price reasonable. I can't even imagine trying to get into that 


Whenever someone suggests you just restart your machine to fix a problem its basically an invocation to prayer. It time to face Mecca, take a knee and hope. It's 
an admission that the system is complicated. So much so that you hope that rather than having to unwrap whatever state its gotten itself into you can just wipe the slate 
clean and have everything working. If not, God help you, its time to figure out what all these different layers are doing and how it went wrong. Did you have anything 
important that isn't backed up? We should really just do a re-install... Oh, you don't have backups. Alright. I'll look into it.

The juice has to be worth the squeeze. Whatever problem is being solved had better be worth the complexity you've added to my stack. Oh, you're adding 30% to my CPU's 
performance by speculatively executing and reordering instructions? Wow that's complicated. But seems worth it. There's a major vulnerability related to it? That sucks. 
But I'm not mad. Let's fix it. Versus a common vector for vulnerabilites and exploits like fonts. You're letting me have arbitrary fonts... Don't we already have like 
10 on the computer? Who needs more than New Roman. You've got a vulnerability. Ok, remove this "solution" from my machine please.



So now is the part where I seem like a complete ingrate. Just to be clear, I like Jekyll. I appreciate that its a lot of work, done without compensation. I'm not 
trying to pick on them. I am however, picking them to demonstrate some of the issues that you should expect (regardless of who's framework you use and what 
problem domain you are in).

The only people who a solution works well for out of the box is people with problems that are simple and generic relative to what the expected end user's use case is. So I knew 
there was going to be work and work arounds needed. BTW I realize my use case is not some Great Work. Its just a blog. It happens to be just a bit more than the 
standard use case of "Just blogging over here" that Jekyll was designed around. 

Shortcut to minima gem. Need that. Only one thing i expect it to do long term and that's break. Not being harsh on jekyll. Thats the nature of reality. Everything is 
hurtling towards entropy.

Rebuild time. Unlike something like Grunt there isn't any transformation of the Javascript files. They get pulled right into the finished site. Unfortunately, Jekyll 
seems to poll the file system for changes pretty regularly. So if you make changes to 2 files 5 seconds apart, expect 2 rebuilds. The builds are not very intelligent. 
There might be a way to configure this, but I haven't found it. Even if you make a one line change in the Javascript, which gets put DIRECTLY in the finished site, the 
whole thing rebuilds. This takes 30+ seconds. While the auto-build is nice, this is not productive. It serves up the prior site until the rebuild completes, which is 
nice, but the minute I make a change I don't care about the prior site anymore. And if I have made 2 changes, I don't care about the first build's results. So now I'm 
waiting a minute+. So obviously, no good. Thankfully the directory structure is simple, so what I've started doing is bringing the finished artifact over to another server (Tomcat, but any will work). 
I serve and make edits to the Javascript there. Its instantenously reflected. When I'm all done I copy it back over to Jekyll, do a Diff to make sure I like everything, 
have it rebuild/serve once as a sanity check, then commit to Git. It sounds like a bad workflow, but the difference in iteration speed is huge. So long as all my Javascript 
changes only flow one way (Tomcat -> Jekyll) I never have to copy it over again. 


So why did I go with Jekyll?
1) I could work around it. Could write pure HTML and have it serve it if need be. No need to do any Markdown or use any of their structuring.
2) Brings me some experience working with Ruby (a first for me)
3) GitHub integrates it. So large support + easy push and publish.
4) It spits out a site. I can always take that and move onto a pure HTML solution if I want
5) I've been drilled for 14 years not to repeat myself, so the idea of not templating was a nonstarter.



Flow chart (https://www.draw.io/ sexy)

Do you understand it? Can you debug it if needed?
-NO: Vendor support or large community?
--NO: Open source?
---NO: Can you easily migrate and have done a quick test?
----Run away
---YES: Give it a shot
--YES: Does it solve a large enough problem if you assume you will have to hire someone to fix it when it breaks?
---YES: Give it a shot

-Yes: 

etc