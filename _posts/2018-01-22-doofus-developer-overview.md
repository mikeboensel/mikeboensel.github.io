---
layout: post
title:  "Doofus Developer Series Overview"
date:   2018-01-22 11:00:00 -0800
tags: 

imageFolder: "/images/2018-01-22-doofus-developer-overview"
---

<style>
    body {
      padding: 0;
      margin: 0;
    }	
	
	figure{
		width:60%; 
		margin:0px auto 10px auto; 
		display:block
	}
	
	.centeredSubContent { /*Takes into account the fact we are in a compressed, centered "reading area". Don't want to protrude from that. */
      max-width: calc(690px - (30px * 2));
	  text-align: center;
    }
	
	figcaption {
		text-align: center;
	}
	
</style>

Imposter syndrome is a major issue in our industry. It's understandable. Think about the different events that bring you into interact with peers:

# Interviews

Interviews at the bigger tech companies are rough. You sit in a room for a full work day and 5-7 different people file in and out to ask you increasingly 
difficult questions, trying to figure out if you're up to snuff. It feel like an 8 man battle royale.

<figure>
	<img src='{{ page.imageFolder}}/8ManBattleRoyale.jpg'>
    <figcaption>Ask me a sorting related question! DO IT! I spent an hour reviewing Radix sort!</figcaption>
</figure>  

Would you mind writing coding your idea up on that whiteboard while talking it through? Oh, so that's an ok answer, but can you do it without 
requiring additional memory? That's a little better. Can we do it any faster? What if I told you <vague hint>? Ok, 
thanks I'm out of time. I'll send in the next guy to try to find out you don't belong here. Good luck. 

In fairness, these style of interviews feel better than small companies where you only get one, possibly two, interview and they focus on minutia. 
Those feel like trying to get into a prohibition speakeasy. You have to knock twice and then say the magic phrase. Oh you don't know the Java Reflections 
API by heart? <crickets> Uh, well, how about how to create a Spring singleton? 

Its worth acknowledging hiring is hard problem, for both employers and potential employees. Also, in my experience everyone has been nice and 
pleasant, but the situation is undeniably stressful and ego bruising.

# Talks, demos, meetups, products on the market

Rule of thumb: If someone's standing on stage presenting they're probably proud of their work. If they're selling it, even more so. You're seeing a solution they've 
spent a lot of time thinking about. It seems effortless to you, because it was effortless to you. They talk about the problem to frame things. Here's what 
I'm fixing. Here's why it matters. 
You start thinking about it and it seems like a lot of work. How would you do it? Then 3 minutes later they present something better and shinier 
than what you had in mind. This guy's some kind of wizard! 

You might see a crack in the fascade, a template string being displayed raw, rather than processed. Maybe a crash. But they've put a fair amount of time 
into it and are pretty far down the road. What you don't tend to see is them struggling to get there.

# Meetings

You've got a bunch of your peers in a room. Possibly your boss. Everyone might like each other and the group dynamic might be great. That said 
you're competing for raises, promotions, desirable projects, etc. Everyone's trying to present their progress this week in the best terms possible. Clearly, 
better workplaces are going to have more open and honest communication, but there's no escaping this dynamic. 

<figure>
	<img src='{{ page.imageFolder}}/PromotedForSure.jpg'>
    <figcaption></figcaption>
</figure>  


No one is volunteering the fact that they spent 2 hours today before realizing images weren't loading because of a mixup between the Linux filesystem's 
case sensitivity vs Windows. The day before there was another issue. I didn't have a stop watch, but that was probably an hour. And before that...
It might get mentioned as an aside. But the gist of what comes out of your mouth is "Made a lot of progress this week, we've got our remote 
image syncing and display working! Next week I'm moving on to...". 
<br/>
<br/>

--------------------------

<br/>

I had some apprehension about this series. If I was a potential employer, I might look at this post and think "Pass on
this guy". 

However, now with 10 years experience under my belt I feel confident in the fact that:
1. I'm not terrible.
2. Everyone who works in a technical capacity goes through the same thing (probably quietly, hoping all the other smart people don't stop by and 
notice you snuck into this job).

This silence contributes to a general imposter syndrome within the industry. Everyone just sees other peoples' finished product, 
not the boneheaded moments. It leads to a sense that maybe there's something else I should be doing in life, like flipping burgers or 
moving furniture. I could probably be good at that. 

So I'm starting a series, "Doofus Developer." The concept is writing about losing inordinate amounts of time on often 
trivial issues. The thing is everything's trivial once it's done, everything is obvious in hindsight. At the time though, you go stumbling down 
many paths before coming to the actual problem. 

I think this reality is why tweets like this get so much traction.

<figure>
	<img src='{{ page.imageFolder}}/IAmDevloper.jpg'>
    <figcaption>Oh, thank god I'm not alone</figcaption>
</figure>