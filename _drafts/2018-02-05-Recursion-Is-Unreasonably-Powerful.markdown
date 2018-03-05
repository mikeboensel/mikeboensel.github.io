---
layout: post
title:  "Recursion is unreasonably powerful"
date:   2018-02-05 14:26:55 -0700
categories: 
---

Since leaving school I haven't found myself using recursion all that much. Occassionally an opportunity presents itself, but for 
the most part it seems simpler to just use an iterative solution. 

I'm doing some interview prep and came across a problem that I don't want to say is impossible with looping, but it seems like it.
| Generate all possible permutations of an input string.
| Example: "ab" => ['ab','bc']

So I dusted off the toolbox. A college professor I had used to say 
Step 1: Base case
Step 2: Reduce the problem size on each call
Step 3: Test
Step 4: Believe!

I can't think of a better summary. I know everything I did and the thought process, but I'm still amazed it works. There's just not much 
code there. If you asked me tomorrow why it worked the best I'd have for you is "Well the first few handchecked inputs work. And it seems 
like it should come together." I feel like you could get burned at the stake for something like this 300 years ago...

I'm sure it can be done more succinctly (and with better naming), but I don't want people to think I'm padding my blog with 
other people's work :) 

```Javascript
function permute(a){
	//The permutation of a single character is itself
	if(a.length == 1){
		return [a];
    }
	let out = [];
	//Multiple characters. Let's break them into 2 groups (a single element and all the remainder).
	//Each character will get to be that super special single element by the end of the loop.
	for(let i = 0; i < a.length; i++){
		let singleLetter = a.charAt(i);
		let theRest = a.slice(0,i).concat(a.slice(i+1));

		let temp = prependLetterToPermutations(singleLetter, theRest);
		
		// Need to "flatten" our arrays. Otherwise we end up with nested arrays(['a',['bc']], not ['abc','bac', ...])
		for(let t of temp){
			out.push(t);
		}
    }
	
	return out;
}

/*create pairing of our selected letter with EVERY permutation of the remainder 
Examples: 
	singleLetter: 'a', R:['b'] => ['ab']
	singleLetter: 'a', R: ['bc','cb'] => ['abc','acb']
*/
function prependLetterToPermutations(singleLetter, remainderGroup){
	let rPermutations = permute(remainderGroup);

	return rPermutations.map((i)=>singleLetter + i);
}

permute("a");
permute("ab");
permute("abc");
```