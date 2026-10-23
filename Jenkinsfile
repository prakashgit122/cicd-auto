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
        stage("Docker Push") {
            steps {
               withCredentials([
            usernamePassword(
                credentialsId: 'dockerhub-creds',
                usernameVariable: 'DOCKERHUB_USERNAME',
                passwordVariable: 'DOCKERHUB_TOKEN'
            )
        ]) {
            sh '''
                set +x
                echo "$DOCKERHUB_TOKEN" | docker login \
                    --username "$DOCKERHUB_USERNAME" \
                    --password-stdin

                docker push dockerp11/cicd-auto:latest

                docker logout
            ''' 
                }
            }
        }
            
    }
}