#!/bin/bash

# System detection or information

printf "\n[ cat /proc/version ]:\n\n"
cat /etc/*-release
printf "\n[ lsb_release -a ]:\n\n"
lsb_release -a
printf "\n[ hostnamectl ]:\n\n"
hostnamectl
printf "\n[ uname -a ]:\n\n"
uname -a
printf "\n[ uname -mrs ]:\n\n"
uname -mrs
printf "\n[ cat /etc/*-release ]:\n\n"
cat /proc/version
printf "\n"'[ $OSTYPE ]:'"\n\n"
echo $OSTYPE

