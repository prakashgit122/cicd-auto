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
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKERHUB_USERNAME',
                    passwordVariable: 'DOCKERHUB_TOKEN'
                )])  {
                    sh '''
            echo "Checking Docker Hub authentication..."

            curl -sS -f \
              -H "Content-Type: application/json" \
              -d "{\"username\":\"$DOCKERHUB_USERNAME\",\"password\":\"$DOCKERHUB_TOKEN\"}" \
              https://hub.docker.com/v2/users/login/ \
              -o /tmp/dockerhub-auth.json

            echo "Authentication request completed."
        '''
                }
            }
        }
    }
}