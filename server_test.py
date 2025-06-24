#Standards
import math,time,random

#File ops
import glob

#Internet stuff
import socket
import ssl

# Server Configuration
HOST = '127.0.0.1'  # Localhost
PORT = 8443        # Port for SSL
CERT_FILE = 'cert.pem'  # Path to your server certificate
KEY_FILE = 'key.pem'   # Path to your server private key

#Source file to serve
jsloc = "test.html"

#Assets to be sent- images and such
assets = glob.glob("assets/*")
assets = [a.split("/")[-1] for a in assets]

#List out the assets identified
print("Assets:",assets)

# Create a socket
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind((HOST, PORT))
server_socket.listen(5)

# Create SSL context
context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
context.load_cert_chain(CERT_FILE, KEY_FILE,password='1113')

#Not the socket is open
print(f"Server listening on {HOST}:{PORT}...")

#Do forever-
while True:
    # Accept connection
    conn, addr = server_socket.accept()
    print(f"Connection from {addr}")

    # Wrap socket with SSL
    ssl_conn = context.wrap_socket(conn, server_side=True)

    try:
        # Receive data from client
        data = ssl_conn.recv(1024)

        # If there's data to handle
        if data:
            dat = data.decode().split("\n") #Decode the data sent by line

            key_req = dat[0] #Grab the main request from the GET
            req_dat = {} #Data from the request

            #For everything else in the data
            for a in dat[1:]:
                if len(a)>3: #If it's not a trivial character
                    d_i = 0
                    while ((a[d_i]!=":") and (d_i<len(a)-1)): #loop over the characters to the :
                        d_i+=1
                    req_dat[a[:d_i]] = a[d_i+1:-1] #Left of the : is the key, right is the data

            #Note the request type
            print(key_req)
            for a in req_dat:
                print(a,req_dat[a])
            print("--------")

            #Figure what the request actually is
            asset_req = key_req.split(" ") #Break up by spaces

            #If it's looking for a file we have-
            if asset_req[1][1:] in assets:
                asset = open("assets/"+asset_req[1][1:],'rb') #Grab the asset as a binary
                DATA_FILE = asset.read() #read in the binary data
                asset.close() #Close it before something goes wrong

                #Make up a socket-level HTTP reply under SSL
                ssl_conn.sendall(b'HTTP/1.1 200 OK\r\n')

                s = 'Content-Type: '+req_dat['Sec-Fetch-Dest']+'/*\r\n'
                ssl_conn.sendall(s.encode('utf-8'))

                ssl_conn.sendall(b'\r\n')
                ssl_conn.sendall(DATA_FILE) #Send the actual data

            else: #If it's not looking for an asset, try a page
                htmlSend = key_req.split(" ")[1][1:]
                print("HTML SEND:",htmlSend)
                if htmlSend == '':
                    fil = jsloc
                else:
                    fil = htmlSend

                try: #Go looking for the file
                    jsfil = open(fil,'r') #Open up the source file
                    HTTP_FILE = jsfil.read() #Read it in
                    jsfil.close() #close it quick before it gets corrupted
                except: #no file
                    HTTP_FILE = "<h2> LINK NOT FOUND </h2> <br/> Maybe there's a typo?"

                #Build up a socket ssl connection and make the HTTP reply
                ssl_conn.sendall(b'HTTP/1.1 200 OK\r\n')
                ssl_conn.sendall(b'Content-Type: text/html\r\n')
                ssl_conn.sendall(b'\r\n')
                ssl_conn.sendall(HTTP_FILE.encode('utf-8')) #encode and send over the file

        else: #If there's no proper data, just note it and move on
            print("No data received. Closing connection.")

    #When all done-
    finally:
        # Close connection
        ssl_conn.close()
        print(f"Connection from {addr} closed.")

