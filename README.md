# Photo booth Personal Project
 
Made by YCOM to let events have a simple, free photo booth for events.

## How it works
It uses the webcam/camera plugged into your computer in the photo booth.
The thing itself runs on a locally hosted webserver on your computer
I know it should really be hosted but this was meant to be free.  

**Your browser may send a warning about security, but rest assure this thing is not capable of
stealing your data (it runs on your own machine).**

## How to run the thing

1. Have node.js installed on the computer https://nodejs.org/en/download/
2. Get the repo either by pulling or downloading the zip (extract the file)
3. Navigate to the director where the folder is in via terminal
4. Run the following commands in a terminal to install the needed packages

        npm install
        npm install -g local-web-server
        ws --https
5. You should see something like this
        
        Listening on https://{Name}-1:8000, https://192.168.56.1:8000, 
        https://192.168.1.80:8000, https://127.0.0.1:8000
6. Use shift + c to turn off the server
   
7. Follow this tutorial to get https to work locally

    https://github.com/lwsjs/local-web-server/wiki/How-to-get-the-%22green-padlock%22-using-the-built-in-certificate


## How to use the thing (assuming the previous tutorial was done)

1. Navigate to the folder in a terminal
2. Enter this command

        ws --https
3. You should see something like this

        Listening on https://{Name}-1:8000, https://192.168.56.1:8000, 
        https://192.168.1.80:8000, https://127.0.0.1:8000
4. Ctrl + click or enter one of the links into a browser
5. Enter the template of choice. it should end with .json
6. Click the "choose" button to see the template
7. Click the "confirm" button to enter the booth
8. Click the "Take Photo" button to take picture
9. The image should automatically download into your computer
10. The image result should be loaded
11. Click the "End session" button to take another picture with the same template
12. Click the "Change Template" button to return to the initial page
13. input shift + c into the terminal to turn off the server

## How to make your own templates

1. Insert the image templates into the 'images' folder
2. Make a new .json file following the same format as the previous ones

### How the src works

Append the filename of the image you want for the template

      "src": "./images/{Name of file}"

### How the sizes work

1. X is for the image width
2. Y is for the image height

### How the locations work

It is a coordinate system based on each pixel on the template image.
For example, if the template image resolution is 2560 x 1440. 
The top left of the image being (0,0).

      "x": 0,
      "y": 0
The bottom right of the image being (2560,1440)

      "x": 2560,
      "y": 1440

So higher the X value, more to the right of the image.
Higher the Y value, lower into the image.

"sizes" and "locations" in the json both have four items in each list
because the booth currently supports four images within a template.
## Last remarks

Have fun with the photo booth! Feel free to modify the code to your needs with
a fork.
I know it's not made in the most elegant manner. Was made in a rush.
Thank you, God Bless.


        
