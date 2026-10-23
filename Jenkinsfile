
pipeline {
    agent any

    // Common values used by multiple stages
    environment {
        IMAGE_NAME = 'dockerp11/cicd-auto:latest'
        CONTAINER_NAME = 'cicd-auto-app'
    }

    stages {

        // Stage 1: Get the application code from GitHub
        stage('Checkout') {
            steps {
                checkout scm
                sh 'ls -l'
            }
        }

        // Stage 2: Check that required files exist
        stage('Validate') {
            steps {
                sh '''
                    test -f Dockerfile
                    test -f app.js
                    test -f package.json
                    echo "Required application files are present."
                '''
            }
        }

        // Stage 3: Confirm the Docker Hub repository is ready
        stage('Docker Hub Repository') {
            steps {
                echo 'Using existing repository: dockerp11/cicd-auto'
            }
        }

        // Stage 4: Build the image with the same tag used for pushing
        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build -t "$IMAGE_NAME" .
                    docker image inspect "$IMAGE_NAME" > /dev/null
                    echo "Docker image built successfully."
                '''
            }
        }

        // Stage 5: Log in securely and push the image
        stage('Push Docker Image') {
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
                        export DOCKER_CONFIG=$(mktemp -d)

                        # Remove temporary Docker credentials after this step
                        trap 'docker logout >/dev/null 2>&1 || true; rm -rf "$DOCKER_CONFIG"' EXIT

                        # Authenticate without putting the token in command arguments
                        printf '%s' "$DOCKERHUB_TOKEN" |
                            docker login \
                                --username "$DOCKERHUB_USERNAME" \
                                --password-stdin

                        # Push the exact image built in Stage 4
                        docker push "$IMAGE_NAME"

                        echo "Docker image pushed successfully."
                    '''
                }
            }
        }

        // Stage 6: Deploy the updated image on this EC2 instance
        stage('Deploy Application') {
            steps {
                sh '''
                    # Pull the latest image from Docker Hub
                    docker pull "$IMAGE_NAME"

                    # Remove the previous container if it exists
                    docker rm -f "$CONTAINER_NAME" 2>/dev/null || true

                    # Start the updated application
                    docker run -d \
                        --name "$CONTAINER_NAME" \
                        --restart unless-stopped \
                        -p 3000:3000 \
                        "$IMAGE_NAME"

                    echo "Application container started."
                '''
            }
        }

        // Stage 7: Check the application's HTTP response
        stage('Verify Deployment') {
            steps {
                sh '''
                    sleep 3

                    RESPONSE=$(curl --silent --show-error --fail \
                        http://localhost:3000/)

                    echo "Application response: $RESPONSE"

                    test "$RESPONSE" = "Hello from CI/CD Auto Project!"

                    echo "Deployment verified successfully."
                '''
            }
        }
    }
}
