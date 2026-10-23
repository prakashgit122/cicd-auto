# CI/CD Automation Using Jenkins, Docker, and AWS EC2
<img width="640" height="359" alt="image" src="https://github.com/user-attachments/assets/963bf7b9-d69b-45a2-9d93-c323c8a67165" />


## Project Overview

This project automates the build and deployment of a simple Node.js application using Jenkins, Docker, Docker Hub, and AWS EC2.

The application is packaged into a Docker image, pushed to Docker Hub, and deployed on an EC2 instance through a Jenkins pipeline.

## Tools Used

- **GitHub** – Source code management
- **Jenkins** – CI/CD automation
- **Docker** – Build and run containers
- **Docker Hub** – Store Docker images
- **AWS EC2** – Host Jenkins and the application
- **Node.js** – Application runtime

## Project Workflow

1. Store application code and the `Jenkinsfile` in GitHub.
2. Jenkins checks out the source code.
3. Jenkins validates the required application files.
4. Jenkins builds the Docker image.
5. Jenkins pushes the image to Docker Hub.
6. Jenkins deploys the container on AWS EC2.
7. Jenkins verifies the application response.

## Application

The application runs on port `3000` and displays:

`Hello from CI/CD Auto Project!`

## How to Access

Open the following URL in your browser:

`http://<EC2-PUBLIC-IP>:3000`

Replace `<EC2-PUBLIC-IP>` with your EC2 instance's public IPv4 address.

## Conclusion

This project demonstrates a basic end-to-end CI/CD workflow using Jenkins, Docker, Docker Hub, and AWS EC2. It helps automate application deployment and provides practical experience with DevOps tools.
