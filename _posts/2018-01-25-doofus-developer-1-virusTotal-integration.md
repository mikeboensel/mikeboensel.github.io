---
layout: post
title:  "Doofus Developer #1 Virus Scanning"
date:   2018-01-25 14:00:00 -0800
tags: 

imageFolder: "/images/2018-01-25-doofus-developer-1-virusTotal-integration"
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
	
</style>

Part of the <a href="" >Doofus Developer series</a>

Virus scanning downloaded files is the type of task that's not a clear time sink I should automate and yet not
trivially quick. I did a quick test and found it takes about a minute on average to open a tab, enter the URL,
navigate the file opener, then wait for the result. Here's the basic procedure. It's a little faster because it starts in the 
downloads folder. 

<iframe id="scanProcedure" width="480" height="270" src="https://www.youtube.com/embed/-m1lwTvRG1k" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

I do this several times a day typically, so its time to bite the bullet and automate.

# The goal

I wanted to be able to Right-Click and select "Scan With VirusTotal". So this meant changing the Windows Registry to
point at some code. 

## Implementing right-click

I've never been very comfortable working with the Registry. It feels like a dumping ground for 30
years of bad Windows design and poorly documented features. Fortunately, the changes I would need to make were simple to
<a href="https://www.howtogeek.com/107965/how-to-add-any-application-shortcut-to-windows-explorers-context-menu/">find</a>

I implement that below:

<iframe id="registryRightClickSetup" width="480" height="270" src="https://www.youtube.com/embed/CDU-ilOEPxk" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

That wasn't too bad.

## A VirusTotal client

### Thick client failure
I initially intended to make a Python or Java program that would call out to VirusTotal when the right-click occurs. I registered for VirusTotal's API. 
I figured they'd have a reference client. My use case is pretty simple. I got my API key and promptly started flailing. I have
no idea why it wouldn't work. I may revisit it in the future. But I put in a fruitless hour and a half of failing with their examples,
putting a proxy in between to observe the traffic on the wire, and several emails back and forth with a nice Customer Support rep
(no sarcasm, she was nice, unfortunately, my exact call worked on her end).

"It works on my machine". That's gotta be the most frustrating thing to hear. 


I moved on. I noticed in most cases (95+%) VirusTotal has already seen the file I'm scanning. So there's no need to
upload it, just to generate the SHA-256 hash, which is passed as a URL parameter. 

<figure>
	<img src='{{ page.imageFolder }}/VirusTotalHash.jpg'>
    <figcaption></figcaption>
</figure>

So I decided the web is the ultimate API, lets go a simple HTTP GET in the browser.

### A foray into PowerShell

I also decided to change targets. I really didn't want a dependency on something like the Java or Python Runtimes.
Nor did I want to have to compile. That left native scripting. On Windows that means batch files (old) or PowerShell. So this was a 
good opportunity to get acquinted.

This was my first time using PowerShell and some of the syntax seems a bit goofy, but the PowerShell ISE (Interactive Scripting Environment)
 isn't bad. I was able to use 
the interactive shell to work through the individual commands. The auto completion and command reference made it pretty 
easy to create a script that worked in the ISE. 

<figure>
	<img src='{{ page.imageFolder }}/Powershell_ISE_Overview.jpg'>
    <figcaption></figcaption>
</figure>


It SHOULD have worked outside it the ISE as well. Instead, on script execution I got this:

<figure>
	<img src='{{ page.imageFolder }}/ScriptExecutionPolicyError.jpg'>
    <figcaption>Fair enough. The link was even helpful.</figcaption>
</figure>

Reading up on <a href="https:/go.microsoft.com/fwlink/?LinkID=135170">the Script Execution Policy</a> explained a lot.
Windows by default prevents all scripts from running. It's set to "Restricted" or "Undefined" (same effect) due to safety concerns. 
No scripts (even ones written locally) will run. 

Reading the different category descriptions we want "RemoteSigning". That enables scripts we've written to run. Remote (downloaded 
from the internet) scripts can run if they are signed by a valid publisher OR if we use the Unblock-File commandlet. 
Pretty straightforward.

What followed was another hour of frustration. 

<figure>
	<img src='{{ page.imageFolder }}/DescentIntoMadness.jpg'>
    <figcaption>Me after re-reading the same documentation for a third time</figcaption>
</figure>


If you want to descend into madness, read on. To cheerfully jump over the pit of madness to the
solution, <a href="#Solution">skip below</a>.


<figure>
	<img src='{{ page.imageFolder }}/ChangingViewingExecPolicy_Admin.jpg'>
    <figcaption>Looks good...</figcaption>
</figure>

So what's going on above is I have elevated to Admin and I queried the execution policies using "Get-ExecutionPolicy -l". 
We see what we expect. Everything is "Undefined" which defaults to "Restricted". I set the LocalMachine policy to "RemoteSigned". 
We want anyone on the machine to be able to run this virus scan script. Then I query the policies again to make sure it took. Perfect.

As Admin the script ran. I went to the non-admin PowerShell session... it doesn't work. It doesn't even see the changes....

<figure>
	<img src='{{ page.imageFolder }}/ExecutionPolicyNonAdminNotReflected.jpg'>
    <figcaption></figcaption>
</figure>

So, in order, here's what I did:
<ol>
    <li>I closed the non-admin window and reopened. Maybe it was holding onto old environment variable values? Nope.
	</li>
    <li>I re-read the docs on Execution Policy. Seemed like everything was ok. Maybe for some reason it viewed my script as being 
		remote and needing to be signed??? I read about how Windows tracks file and ran the <a href="https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/unblock-file?view=powershell-5.1">Unblock-File commandlet</a>.
        No relief there.
    </li>
	<li>Went into the Windows Registry to view the policies directly. They looked right...
	</li>
    <li>Let's try setting the lowest security level of "Bypass" from the admin. Nope.
	</li>
	<li>Let's set all the categories to "Bypass". Maybe its not using the LocalMachine value (no idea why). Nope.
	</li>
    <li>The non-admin doesn't even seem to see the admin changes I started thinking about how Windows permissions work and
        wondering which policy would apply. For some reason the LocalMachine policy I was setting
        wasn't being picked up. Hell, it wasn't even being seen. Maybe the non-admin user's CurrentUser setting was
        overriding it? But how to change that value? You have to be Admin to change any of the policies. So I started looking
        at Group Policies. Ugh.
    </li>
    <li>Walked around the block.
	</li>
    <li>I started digging into vaguely conspiratorial StackOverflow threads about PowerShell bugs and incorrect
        documentation.
    </li>
    <li>Other things I've forgotten</li>
</ol>

<h2 id="Solution">The last place you look</h2>
And then I noticed a subtle difference. Can you spot it?

<figure>
	<img src='{{ page.imageFolder }}/Solution.jpg'>
    <figcaption></figcaption>
</figure>

PowerShell x86 vs PowerShell. Were they considered different applications (with different policies) by the OS? Yes...
Now everything works.

<figure>
	<img src='{{ page.imageFolder }}/SolutionAnnotated.jpg'>
    <figcaption></figcaption>
</figure>


So what did I get for my 4 hours in? If we assume I spend a minute or 2 a day on scanning files in 3-6 months I'm
breaking even. If other people gets some use out of it in a Kum ba yah, good karma type of way it feels like a faster break even.
Plus it's a source of writing material :).
