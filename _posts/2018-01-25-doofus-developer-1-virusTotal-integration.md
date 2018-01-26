---
layout: post
title:  "Doofus Developer #1 Virus Scanning"
date:   2018-01-25 14:00:00 -0800
tags: 

imageFolder: "/images/2018-01-25-doofus-developer-1-virusTotal-integration"
---

<link rel="stylesheet" href="/libraries/bootstrap-3.3.7-dist/css/bootstrap-3.3.7.min.css">
<link rel="stylesheet" href="/libraries/bootstrap-3.3.7-dist/css/bootstrap-theme-3.3.7.min.css">
<script src="/libraries/jquery-3.2.1.js"></script>
<script src="/libraries/bootstrap-3.3.7-dist/js/bootstrap-3.3.7.min.js"></script>


<style>
    body {
      padding: 0;
      margin: 0;
    }	
	
	figure {
		width:60%; 
		margin:0px auto 10px auto; 
		display:block
	}
	
	.jumboFigure {
		width:95%;
		margin:30px auto 30px auto; 
	}
	
	
	figcaption {
		text-align: center;
	}
	
	
	.centeredSubContent { /*Takes into account the fact we are in a compressed, centered "reading area". Don't want to protrude from that. */
      max-width: calc(690px - (30px * 2));
	  text-align: center;
    }
	
	.youtubeDiv {
		text-align:center;
		margin: 10px 0;
	}
	
	  .carousel-inner > .item > img,
  .carousel-inner > .item > a > img {
      margin: auto;
  }
  
  #myCarousel {
	margin: 20px 0;
  }
  
  .site-nav {
	line-height: 20px; /* Bootstrap screws up minima theme nav bar, fixing */
  }
	
</style>

Part of the [Doofus Developer series]({{ site.baseurl }}{% link _posts/2018-01-22-doofus-developer-overview.md %})

Virus scanning downloaded files is the type of task that's not a clear time sink I should automate and yet not
trivially quick. I like to use <a href="https://www.virustotal.com/#/home/upload">VirusTotal</a> for reasons I'll outline in another post. 
They let you upload a given file and then scan it against many different anti-viruses.

It takes ~1 minute for me to:
+ Open a tab
+ Enter virustotal.com
+ Navigate the file opener

It's a little faster in the video because we get lucky and the file opener starts in the right place. 

<div class='youtubeDiv'>
	<iframe id="scanProcedure" width="480" height="270" src="https://www.youtube.com/embed/-m1lwTvRG1k" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

I do this several times a day typically, so its time to bite the bullet and automate.

## The goal

I wanted to be able to Right-Click and select "Scan With VirusTotal". So this meant changing the Windows Registry to
point at some code. Let's start with the Registry change.

### Implementing right-click

I've never been very comfortable working with the Registry. It feels like a dumping ground for 30
years of bad Windows design and poorly documented features. Fortunately, the changes I would need to make were simple to
<a href="https://www.howtogeek.com/107965/how-to-add-any-application-shortcut-to-windows-explorers-context-menu/">find.</a>

I implement that below, annotating the process:

<div class='youtubeDiv'>
	<iframe id="registryRightClickSetup" width="480" height="270" src="https://www.youtube.com/embed/CDU-ilOEPxk" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

That wasn't too bad. Now we just need to implement the code we'll call.

### A VirusTotal client

#### Thick client failure
I initially intended to make a Python or Java program that would call out to VirusTotal when the right-click occurs. I registered for VirusTotal's API. 
I got my API key and promptly started flailing. It said my API key was not authorized. I put in a fruitless hour and a half with their examples,
putting a proxy in between to observe the traffic on the wire, and several emails back and forth with a nice Customer Support rep
(no sarcasm, she was nice, unfortunately, my exact call worked on her end).

<figure>
	<img src='{{ page.imageFolder }}/Shrug.png'>
    <figcaption>The sound of despair: "It works on my machine".</figcaption>
</figure>


I moved on. I noticed in most cases (95+%) VirusTotal has already seen the file I'm scanning. So there's no need to
upload it, just to generate the SHA-256 hash, which is passed as a URL parameter. 

<figure class="jumboFigure">
	<img src='{{ page.imageFolder }}/VirusTotalHash2.jpg'>
    <figcaption>SHA-256 highlighted in red</figcaption>
</figure>

So I decided the web is the ultimate API, lets just automate opening up the browser and 
making a simple HTTP GET passing the SHA-256.

#### A foray into PowerShell

With the simpler approach I could drop the dependency on something like the Java or Python runtimes.
I didn't want to have to compile either. That left native scripting. On Windows that means batch files (old) or PowerShell. So this was a 
good opportunity to get acquinted.

This was my first time using PowerShell and some of the syntax seems a bit goofy, but the PowerShell ISE (Interactive Scripting Environment) 
isn't bad. I was able to use 
the interactive shell to work through the individual commands. The auto completion and command reference made it pretty 
easy to create a script that worked in the ISE. 

<figure class="jumboFigure">
	<img src='{{ page.imageFolder }}/Powershell_ISE_Overview.jpg'>
    <figcaption>Not bad at all.</figcaption>
</figure>

That script __SHOULD__ have worked outside it the ISE as well. Instead, on script execution I got this Unauthorized Access Error:

<figure class="jumboFigure">
	<img src='{{ page.imageFolder }}/ScriptExecutionPolicyError.jpg'>
    <figcaption>The link and error text was even helpful!</figcaption>
</figure>

Reading up on <a href="https:/go.microsoft.com/fwlink/?LinkID=135170">the Script Execution Policy</a> explained a lot.
Windows by default prevents all scripts from running. It's set to "Restricted" or "Undefined" (same effect) due to safety concerns. 
No scripts (even ones written locally) will run. 

Reading the different category descriptions we want "RemoteSigning". That enables scripts we've written to run. Remote (downloaded 
from the internet) scripts can run if they are signed by a valid publisher OR if we use the `Unblock-File` commandlet. 
Pretty straightforward...

What followed was another hour of frustration. 

<figure class="jumboFigure">
	<img src='{{ page.imageFolder }}/ChangingViewingExecPolicy_Admin.jpg'>
    <figcaption>Looks good...</figcaption>
</figure>

So what's going on above is (colors correspond to boxes in the image):

<p style="border:4px solid red; padding: 10px; border-radius: 10px"> 
	I have elevated to Admin and I queried the execution policies using <code class="highlighter-rouge">Get-ExecutionPolicy -l</code>. 
	We see what we expect. Everything is "Undefined" which defaults to "Restricted". 
</p>
<p style="border:4px solid green; padding: 10px; border-radius: 10px">
	The green box command sets the LocalMachine policy to "RemoteSigned" with <code class="highlighter-rouge">Set-ExecutionPolicy RemoteSigned LocalMachine</code> 
</p>

<p style="border:4px solid orange; padding: 10px; border-radius: 10px">
	We want anyone on the machine to be able to run this virus scan script. Then the orange box shows me checking the policies 
	again to make sure it took. Perfect.
</p>

As Admin the script ran. I went to the non-admin PowerShell session... it doesn't work. It doesn't even see the changes....

<figure class="jumboFigure">
	<img src='{{ page.imageFolder }}/ExecutionPolicyNonAdminNotReflected.jpg'>
    <figcaption>What gives? The <span style="color: red">red boxed policy</span> should say "RemoteSigned"...</figcaption>
</figure>

If you want to descend into madness, read on. To cheerfully jump to the solution, <a href="#Solution">click here</a>.

So, in increasing order of desperation, here's what I did:

<figure style="float:right">
	<img style="margin-left: 67px; height:400px" src='{{ page.imageFolder }}/DescentIntoMadness.jpg'>
    <figcaption></figcaption>
</figure>

1. I closed the non-admin window and __reopened__. Maybe it was holding onto old environment variable values? 
2. __Restarted.__ 
3. I __re-read the docs__ on Execution Policy. Seemed like everything was ok. Maybe for some reason it viewed my script as being 
		remote and needing to be signed??? I read about how Windows tracks files and ran the <a href="https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/unblock-file?view=powershell-5.1">Unblock-File commandlet</a>.
4. Check the Windows Registry to view the policies directly. They looked right...
5. Let everything through. I set the LocalMachine policy to the lowest security level of "Bypass" from the Admin. Nope.
6. Set every category to "Bypass". Maybe its not using the LocalMachine value (no idea why). Nope.
7. Started having crazy thoughts about how the Windows permissions model might work. Maybe somehow settings made by the Admin 
		account only applied to it? But then if you can't set them in non-admin, without becoming Admin, how do you ever set them for
		non-admin? That made no sense.
8. Walked around the block.
9. I __started digging into vaguely conspiratorial StackOverflow threads__ about PowerShell bugs and incorrect
        documentation.
10. Other things I've forgotten


<h2 id="Solution">The last place you look</h2>
And then I noticed a subtle difference. Can you spot it? The answer is on slide 3.

<!-- Carousel from https://www.w3schools.com/bootstrap/bootstrap_ref_js_carousel.asp 
Modified to remove animations, auto scrolling, and large ugly side bars
-->

<div id="myCarousel" class="carousel" data-ride="carousel" data-interval="false">
    <!-- Indicators -->
    <ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
	  <li data-target="#myCarousel" data-slide-to="2"></li>
    </ol>

    <!-- Wrapper for slides -->
    <div class="carousel-inner" role="listbox">

      <div class="item active">
        <img src='{{ page.imageFolder }}/Solution1.jpg'>
        <div class="carousel-caption">
          <h3>Working Admin shell</h3>
        </div>
      </div>

      <div class="item">
        <img src='{{ page.imageFolder }}/Solution2.jpg'>
        <div class="carousel-caption">
          <h3>Failing non-admin shell</h3>
		</div>
      </div>
	  
	  <div class="item">
        <img src='{{ page.imageFolder }}/Solution3.jpg'>
        <div class="carousel-caption">
          <h3>The key difference!</h3>
        </div>
      </div>
    </div>

    <!-- Left and right controls -->
    <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>


PowerShell x86 vs PowerShell. Were they considered different applications (with different policies and settings) by the OS? Yes...

There are 2 seperate PowerShells. x86 and unlabeled (presumably x64). What a world. What a time to be alive. I'm sure I saw the suffix at some point, it just wasn't even a consideration. 
My full thought on going to the start menu was "PowerShell. I need a PowerShell console. Elevated as Admin". Making sure I was setting the properties of the correct one fixed it. 

### The final PowerShell script:
```powershell
$fileName=$args[0]

if(!($fileName) -or !(Test-Path $fileName)){ #Null objects are falsy
#Error case
#Inform user
$wshell = New-Object -ComObject Wscript.Shell
$wshell.Popup("Bad file path passed: " + $fileName,0,"Done",0x1)
#Stop processing
exit
}

$browserLocation = 'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe';

$hash = (certutil.exe -hashfile $fileName SHA256)[1]

$virusTotalURL = 'https://www.virustotal.com/#/file/' + $hash

Start-Process -FilePath $browserLocation $virusTotalURL

```

So what did I get for my 4 hours in? 
1. A reminder to challenge all your assumptions if things are bizarre.
2. If we assume I spend a minute or 2 a day on scanning files I'm
breaking even on my time investment in 3-6 months. If other people gets some use out of it in a Kum ba yah, good karma type of way 
it feels like a faster break even. 
3. Writing material :P