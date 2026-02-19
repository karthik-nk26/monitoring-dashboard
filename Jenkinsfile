pipeline {
    agent any
    environment {
        IMAGE = "karthiknk26/monitoring-dashboard:v1"
    }
    stages {

        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/karthik-nk26/monitoring-dashboard.git'
            }
        }

        stage('Build Docker') {
            steps {
                sh 'docker build -t $IMAGE .'
            }
        }

        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh '''
                    echo $PASS | docker login -u $USER --password-stdin
                    docker push $IMAGE
                    '''
                }
            }
        }

        stage('Deploy to K8s') {
            steps {
                sh '''
                kubectl apply -f k8s/deployment.yaml
                kubectl apply -f k8s/service.yaml
                kubectl rollout restart deployment monitoring-dashboard
                '''
            }
        }
    }
}

