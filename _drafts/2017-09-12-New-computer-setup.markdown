---
layout: post
title:  "New Computer Recommended Setup"
date:   2017-09-12 15:26:55 -0700
categories: jekyll update
comments: true
---

I recently got a new laptop from Dell. It's intended purpose is to act as a physical sandbox. Rather than willy nilly installing programs, languages runtimes, etc.
that interest me on a VM on my main laptop I'll use this. It's better from a security and usability wise. VMs have come a long way, but they're still a pain and exploits that 
can break out of the hypervisor are found frequently enough. No banking or important account logins happening on this machine. When I need to wipe it, I just wipe it.

The hardware is fine, for ~$500 I've got nothing to complain about, but unsurprisingly the software setup is pretty terrible.
I wish I'd started documenting the steps from the get go, ideally with screenshots and video, but I do this infrequently enough I always forget how much work it
really is. 
Midway through I started writing an outline.

It's a lot, but breaks down into 5 steps:
1. Update the device
2. Change settings to match best practices/my preferences/be less spywarey
3. Remove crap pre-installed by MS + Dell
4. Confirm removals via Sysinternals
5. Make a backup with the minimum additional stuff you need installed
6. Finally, use the laptop :)

It took me a couple hours, more than it should have. Now that I've gotten it Imaged, wiping the machine and starting over is quick and painless.

I really regret not getting all the Microsoft spying/aggressive cross promotional steps down. 
It came with Angry Birds (or some other unwanted game) installed, taking up 400-ish MB. Ok, fine. I'll just uninstall it, no big deal. 

<Hal-8000 image or "can't let you do that star fox" https://www.google.com/search?q=can%27t+let+you+do+that+starfox&tbm=isch&imgil=0ZoDycT-6Ub-6M%253A%253BMeR7-ZlFHQ7PVM%253Bhttp%25253A%25252F%25252Fknowyourmeme.com%25252Fmemes%25252Fi-can-t-let-you-do-that-starfox&source=iu&pf=m&fir=0ZoDycT-6Ub-6M%253A%252CMeR7-ZlFHQ7PVM%252C_&usg=__OhQ4UNOQOO1ek2JMLdSXYb9mbEM%3D&biw=1538&bih=774&ved=0ahUKEwiBgqXQrKHWAhXCqFQKHfS2AjQQyjcIPw&ei=Pbe4WcHvKsLR0gL07YqgAw#imgrc=cCPwtM6pqf7mwM:>

The eventual fix involved going into the registry. I feel like I'm merely renting my computer from Microsoft between 
all the calls home, key logging (!), constant pushing of Cortana/OneDrive/Edge... and other shady practices. It really feels like the only way to get what I want from the OS might 
be getting a cracked version that has this all removed. 

Here's what I want from you Microsoft. I want a runtime for the vast quantity of software that is written for Windows. I want security updates. 
Its truly an indictment of capitalism when a fanstatically profitable company (they made $20 billion in profits) can't simply ship a product that
doesn't feel like a constant upsell or attempt to abuse their consumer desktop monopoly to mine my data for advertising purposes. This behavior is
understandable for some small shareware download. But for a company providing a crucial component of the computing landscape...

They might really need to be broken up.


<!--Nuke them from orbit its the only way to be sure--> 

# Update

Update Windows

Update OEM drivers (You probably have software installed like HP Support Agent. That will check what updates there are for your machine and 
apply them. Optionally most companies have browser based updates too)

# Settings

Establish non-admin user account for general use. You should never be running as admin, but it started me off as such...

 Windows Privacy options
	Disable Cortana (might require more work to truly stop her...)
	BIOS/UEFI (disable microphone and web camera if you don't use them. Helps mitigate this feeling that windows is spying on me...)
 
 Disable Remote Assistance
 
 Change Computer Name ("About this PC")
 
 Power Settings (customize to fit your preferences (monitor/HD turnoff durations))
 
 Check firewall (Candy Crush Saga does not get a rule that allows it to go through... Fuck)
 
 Folder Explorer Options (More a personal preference here):
  View tab:
	Display the full path in title bar
	Show hidden files, folders, and drives
	Uncheck:
		Hide empty drives
		Hide extensions for known types
  Nav Pane:
	Expand to open folder
 
# Remove crap
 Uninstall unwanted installs from Dell and Windows via Add/Remove Software utility.
 Candy Crush sage required more work...

 Remove Windows 10 Retail Demo Content...
	Search "Manage Optional Features". Uninstall Retail Demo Content and Neutral Retail Demo
	Keeps coming back????
 
 
 
# Verify crap removal!

Sysinternals tools. Seriously, I take it back, Microsoft has done something good and its hire and aggressively
promote Mark Russinovich. I love this suite of utilities. I can only assume Microsoft has no idea how good it is 
and will fire an entire division and discontinue them when they discover they've delivered something customers
actually want.
 Use AutoRuns and MS Config to check start up process. 
	What's loaded initially? Some stuff will jump out at you as being unwanted. Other stuff, you should google and err on the side of caution (You're 
	going to see software for your audio, touchpad, etc. Disabling it is not a good idea)
	
	Chose how in depth you want to be. I didn't dig into the Microsoft stuff too much and allowed it to be filtered. Maybe I should be looking at it:
	Options -> Hide Microsoft Entries
	Options -> Hide Empty Entries
	Options -> Hide Windows Entries
	
	Options -> Scan Options... -> Verify code signatures
	Options -> Scan Options... -> Check VirusTotal.com
	Options -> Scan Options... -> Submit unknown Images
	
	Save a baseline once you've
	
 Use ProcExplorer to see what's running. Don't let the red items flashing in scare you. That just signals a process is being killed (which is totally normal).
 Some explaination and link to a Mark R video would be good here. 
	Add the following columns for Process Image: Verified Signer, VirusTotal, DEP Status, ALSR Enabled, Image Path
	Process -> Check VirusTotal
	Navigate and make sure all of these are checked:
	Options -> VirusTotal.com -> Check VirusTotal.com
	Options -> VirusTotal.com -> Submit unknown executables
	Options -> Verify Image Signatures
	
	Optionally, replace the Task Manager with ProcExplorer:
	Options-> Replace Task Manager
	
# Install the minimal stuff you need

 Use Disk Management to resize the Windows partition.
  Install your flavor of Linux w/ GRUB acting as Boot manager.
 
 Microsoft EMET

 Install software you absolutely want in the Image. For me that is:
  Chrome w/ uMatrix for script blocking and Ad Blocker
	Configure privacy items
  Notepad++ (everyone needs an editor)
  Firefox
  VLC (Video playback)
  
 Update Windows Defender virus definitions. Start Full Scan.	
 
 Disk Cleanup (Remove trash + temp files prior to imaging (final step))
 
 Defrag HD (spinning only)
 
 Image the disk partitions for backup purposes to a USB key or network share. I like Macrium Reflect Disk Imaging (free as of 3/1/2017)

 And with that we're finally done :)
 If you wipe/restore, update Windows/OEM drivers, and  create a new backup Image. It will save you some time on the next wipe/restore since Windows Update can take forever... 
 
 Did I miss anything? Have any advice for things I could do better?