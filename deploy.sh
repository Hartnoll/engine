#!/usr/bin/env bash

cd engine
rm -rf target
echo "Deleted build/ folder"

mvn package
echo "Generating jar file"

#Copy execute_commands_on_ec2.sh file which has commands to be executed on server... Here we are copying this file
# every time to automate this process through 'deploy.sh' so that whenever that file changes, it's taken care of
scp execute_commands_on_ec2.sh ubuntu@100.26.152.21:/home/ubuntu
echo "Copied latest 'execute_commands_on_ec2.sh' file from local machine to ec2 instance"

scp engine/target/engine-0.0.1-SNAPSHOT.jar eubuntu@100.26.152.21:/home/ubuntu
echo "Copied jar file from local machine to ec2 instance"

echo "Connecting to ec2 instance and starting server using java -jar command"
ssh ubuntu@100.26.152.21:/home/ubuntu ./execute_commands_on_ec2.sh
