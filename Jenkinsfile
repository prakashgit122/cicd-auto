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
                    set +x
                    rm -f /tmp/dockerhub-auth.json

                    echo "Checking Docker Hub authentication..."

                    AUTH_PAYLOAD=$(jq -n \
                    --arg identifier "$DOCKERHUB_USERNAME" \
                     --arg secret "$DOCKERHUB_TOKEN" \
                    '{identifier: $identifier, secret: $secret}')

                    AUTH_RESPONSE=$(curl --silent --show-error --fail \
                    --request POST \
                    --header 'Content-Type: application/json' \
                    --data "$AUTH_PAYLOAD" \
                    https://hub.docker.com/v2/auth/token)

                    printf '%s' "$AUTH_RESPONSE" |
                    jq -e '(.access_token // .token) | strings | length > 0' \
                    > /dev/null

                    echo "Docker Hub authentication succeeded."
                    '''

                }
            }
        }
    }
}