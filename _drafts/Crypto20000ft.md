---
layout: post
title:  "Cryptography at 20,000 feet"
date:   2018-01-07 14:26:55 -0700
---

<style>
figcaption{
text-align:center;
}
figure{
width:60%; 
margin:0 auto; 
display:block
}

</style>

<script type="text/javascript" src="{{ site.data.global.url }}/scripts/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="{{ site.data.global.url }}/scripts/cipher.js"></script>

Full warning, I'm no expert and crypography is complicated. One of the first things you are told is to NEVER
attempt to create your own cryptography. It really is a domain for mathematicians and experts if you want it done right.

<figure>
	<img src='{{ site.data.global.url }}/images/Crypto20000Ft/RollingOwnCrypto.jpg'>
    <figcaption>Hold my beer! Rolling my own crypto! (This will make more sense in a bit).
	</figcaption>
</figure>

That said as with many complex things, it has a simple goal that we can break down and analyze. The goal of all 
crypographic systems is summed up by the acronymn CIA.

## C - Confidentiality
Let's send a message that is secret (only our intended recipient can read it).


## I - Integrity
Let's make sure its obvious if it gets changed/messed with in transit.


## A - Authentication
Let's ensure that whoever gets this knows its from us. 

There's nothing unique about what computers do. They follow the same laws and rules that we do. When they perform actions they're bound by the same 
realities we are. They just happen to do things extremely fast, which makes them seem magical, unique, etc. With that in mind, it can be helpful to 
think about the parameters of a problem and how we would solve them ourselves before stepping into the specifics of how a computer does so. 

An old sealed envelope from the 1600s is a fair analogy for what we are looking to do. Obviously, it's not a perfect solution, but let's give credit 
where credit is due. These were people still throwing their feces into the street and wondering if the plague would come this winter. 
Its a good attempt for the time. 

<figure>
	<img src='{{ site.data.global.url }}/images/Crypto20000Ft/HistoricWaxSeal.jpg'>
    <figcaption>Ye old tyme message security.
	</figcaption>
</figure>

So let's break it down. 

C -> Confidentiality. As long as people don't open the envelope they can't read the note. This is kind of weak protection. To have a truly safe system you have to assume a bad actor 
will do everything possible. Yes, if the "Integrity" property holds opening it would mean they can't trick the reciever into thinking its 
never been opened, but they got our message! What if its orders for tommorrow's battle? This is very bad. So let's say we take 
our message in English (which we will call Plaintext) and transform it into something that looks like gibberish to an interceptor. This gibberish is 
called the Ciphertext. (we will flesh this out later). 

I -> Integrity. Let's pretend the wax seal and envelope are impossible to reproduce (really nice paper that only the sender has! really good wax that breaks into a 
million pieces when opening). Together they provide assurances that it hasn't been opened and had a different message put into it or the message altered.

A -> Authentication. Again, let's pretend its a super good wax seal. When I look in my book of seals that's the one from the king. No one but the king could punch that 
image into the wax. And its in royal purple! Its definetely from the king.

As long as our assumptions hold (the seal and envelope can't be duplicated or opened without it being obvious and the code is undecipherable) this is a perfect system.

# A simple cipher

Let's try to create a digital system. Let's start with encrypting our Plaintext to Ciphertext.

Plaintext: <input id="plainText" oninput="calcCeasarCipher()" placeholder="Matt loves to ride the bike"
/>

<p style="display:inline-block">Ciphertext: <p style="display:inline-block" id="cipherText"></p></p>

Ultimate goal, we are going to hide our messages in the vast space of all possible messages.  


# Quick aside on language
So before we go any further its helpful to think about what language (and information) is fundamentally. A language imposes order and structure.

## A set of characters

There's a set of acceptable letters we use, the alphabet. If I'm addressing English audiences and start using Cyrillic or Arabic characters, its meaningless to 
them. 

## A dictionary of words
From all the billions of possible combinations of letters we've arrived at a very small subset to create words. While languages do evolve over time with use and 
different groups diverge there's a generally accepted set of words. If I just make up my own words, I'm either a crazy person, 
trendsetter, or illiterate. If you need any proof hop on Twitter. I have no idea what "on fleck" means. I think people stopped using it, so I saved some time 
on that one. 

## Grammar
Finally, we need some rules for how to throw all the words together. For example: most sentences need a subject and a verb. They end in a period. A paragraph 
should be 3-5 sentences that encapsulate some thought. Etc. 

## Putting it all together

So that's what we have. Let's imagine another world where every possible word has a meaning. The language is uniformally distributed across all possibilities. 
Let's examine a 4 letter word.
[a-z][a-z][a-z][a-z]
Each spot has 26 possiblities, so we have 26^4 (~half a million) possible words.

Great, why waste our time on all these long words like "diarrhea". Let's just call it "axew". And "medicine" can be "axez". Well, suddenly a typo isn't 
recognizable. It's just another valid word! 
 
Communication is a lot closer to a crossword puzzle than you might recognize. The structure of our language lets us figure out meaning by restricting us 
to a small space of possibilities. We intuitively do it now, but rarely recognize it. Its only when you deal with something like terrible auto-correct 
text messages you can get a sense of what's your brain is doing under the surface. 

"Bring the Doug!"
That doesn't make much sense. "The" rarely precedes a first name. An occupation ("The king", "The doctor", etc.) sure. But unless you're a frat boy, there probably 
isn't someone in your life named "The Doug".

<figure>
	<img src='{{ site.data.global.url }}/images/Crypto20000Ft/TheDoug.jpg'>
    <figcaption>The Doug - Undefeated in beer pong combat</figcaption>
</figure>

So we look at context and the possibilities. Its a noun. Probably starts with a 'D'. 4 letters. "Dogs"? Do we have dogs? Do dogs make sense where we're going?
Say its a courtroom hearing. Not so much. But if we're meeting at the park, absolutely. If so then we show up with them. It might not be the right answer, but 
its a fair guess.

When every possibility has a meaning, its much harder (and in the extreme case impossible) to error correct.

This is what strong encryption does. When you attempt to reverse it, it could be EVERY possible message. You can't determine any structure from it. It's essentially 
random. 






Humans are bad random number generators. Even computers not so great. To see why imagine I tried to generate 100 digits. 
1325644839 at this point I'm looking and there aren't many 7s. So I try to even it out. Don't have any 4s either. Better add a few. 
I'm establishing a pattern. Or maybe I generate 12313123124112412313. Well that's just me using a single hand to rapidly hit my 100 digits. 
I don't repeat the same # very often. I'm normally in the same range. Again we have patterns. Patterns are bad. We want entropy. Pure as we can get it.
One thing you can resort to is tables of random #s. These have been determined via some random process being stimulated. We call it rolling dice, 
but in reality it could be the nuclear decay of an atom. These tables are great. The numbers will represent a true random sampling of the 
range (digits) we are interested in.. so long as no one knows which one we are using. If they know its from a published table, well then 
its a matter of going through each one and seeing what makes English come out of the cypher text. The keys lies in the unpredictableness. 

Let's go back to our human RNG. Imagine he's going along banging out digits. Does he repeat them very often? Probably not. "This doesn't look random, the boss
will think I'm just holding down a key". But even long strings of a single digit, pages and pages of them, is a possibility, its just a distant one. If that never
occurs then its a reduction of entropy. 



