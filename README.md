# EZ Git.io
EZ Git.io is a tool to request custom (vanity) [git.io](https://git.io/) shortlinks for any GitHub URL. This is done using `curl` for PHP.
Yes, you can do this with command line `curl` without this tool; for instructions on that, check [this blog post](https://blog.github.com/2011-11-10-git-io-github-url-shortener/).

## Try it!
[Click Here](https://nick.marcopo.li/EZGitVanity/index.html), it works right in your browser.

## FAQ
__Can I create multiple git.io shortlinks for a GitHub page?__  
No, you can only create one shortlink per page. I recommend adding an empty query (a question mark character) after the URL if you want to create multiple shortlinks to the same page (i.e if a shortlink has been created for https://github.com/, try shortening it as https://github.com/?). Thanks to [this Stack Overflow post](https://stackoverflow.com/questions/44347129/delete-git-io-shortened-url) for this good advice.  
__I made a mistake! Can I delete a shortened URL?__  
I have not found any way to do this from the user's end. I would try [contacting GitHub](https://github.com/contact) to see if they can delete a shortlink for you. If you know something I don't, though, let me know!  
__Can I create a git.io shortlink for X website?__  
If X website is not a GitHub-owned URL, you cannot shorten it with git.io.

## Credits
Most of the site's formatting is based on [Matt Holt's](https://github.com/mholt) project, [curl-to-Go](https://mholt.github.io/curl-to-go/). Big thanks to [that blog post](https://blog.github.com/2011-11-10-git-io-github-url-shortener/) I mentioned earlier for getting me started with git.io.