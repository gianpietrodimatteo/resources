#!/bin/env python2

f = open("/home/gcdm/tmp/demofile.txt", "r")
print("# f.read() (read already closes the file):")
print(f.read())
f = open("/home/gcdm/tmp/demofile.txt", "r")
print("# f.read(5):")
print(f.read())
f = open("/home/gcdm/tmp/demofile.txt", "r")
print("# f.readline() (readline does not close the file):")
print(f.readline())
print(f.readline())
f.close()
f = open("/home/gcdm/tmp/demofile.txt", "r")
print("# loop lines:")
for x in f:
    print(x)
print("# remember to close the file.:")
f.close()
