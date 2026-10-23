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
                echo "Preparing Docker Hub repository"
            }
        }
    }
}