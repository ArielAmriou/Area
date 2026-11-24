# Spike: Backend technology

    Conducted by: Juliette Sistovaris
    Backlog Work Item: Server
    Sprint: Bootstrap that started on the 24th of November

# Goal

To create a server we need a technology that :
- can set up the basis quickly
- with few or no external dependencies
- quick to pick up
- simple to understand

With this spike we will test out the Go language to see if it can satisfy those
requirements.

# Method

To test out the Go language we will use a prototype spike with the following
instructions :
- create a server listening on port 8080
- answer a GET request on the /ping rout with the body : "{"status":"ok"}"
- read the port from an environment variable rather than a literal in the source
This must be done under 30 minutes.

# Evidence

With the Go language I managed to create a server listening on port 8080 in one
line. I was confused by the json syntax. In the code I used from an example I
didn't understand where the server was being created.

# Conclusions

The Go language can natively create a server very simply but the syntax is not
very instinctive especially the function variables. Indeed after some research
I found out that the Go language has functions as values and that was the line
that was being used to create a server. I thought this line was a function call.
