pipeline {
    agent any
    
    tools {
        nodejs "nodejs"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking code'
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                echo 'Installing dependency'
                bat 'npm install'
                echo 'Build complete'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests'
                bat 'npm test'
                echo 'Tests passed'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying application'
                bat 'start /b npm start'
                echo 'Deployed'
            }
        }
        
        stage('Health Check') {
            steps {
                echo 'Health monitoring'
                sleep(time: 5, unit: 'SECONDS')
                script {
                    try {
                        bat 'curl -f http://localhost:3000/health'
                        echo 'Check passed'
                    } catch (Exception e) {
                        echo 'Check failed'
                    }
                }
            }
        }
        
        stage('Notify') {
            steps {
                echo 'Completed'
                echo 'Pipeline successful'
            }
        }
    }
}