pipeline {

    agent any

    stages {

        stage("Checkout") {
            steps {
                checkout scm
                sh 'ls -l'
            }
        }
        stage("Create Docker Hub Repository") {
            steps {
                echo 'Docker Hub repository dockerp11/cicd-auto is ready.'
            }
        }
        stage("Build Docker Image") {
            steps {
                sh 'docker build -t dockerp11/cicd-auto:lates .'
            }
        }
            
    }
}