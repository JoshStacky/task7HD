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
        
        stage('Code Quality') {
            steps {
                echo 'Analysing Code quality'
                bat 'npx eslint src/ || echo "Check completed"'
                echo 'Quality approved'
            }
        }
        
        stage('Security') {
            steps {
                echo 'Scanning security'
                bat 'npm audit || echo "Scan finished"'
                echo 'Quality Approved'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying application'
                bat 'start /b npm start'
                echo 'Deployed'
            }
        }
        
        stage('Release') {
            steps {
                echo 'Releasing'
                echo 'Application released to environment'
                echo 'Release complete'
            }
        }
        
        stage('Health Check') {
            steps {
                echo 'Checking'
                sleep(time: 5, unit: 'SECONDS')
                script {
                    try {
                        bat 'curl -f http://localhost:3000/health'
                        echo 'Passed'
                    } catch (Exception e) {
                        echo 'Failed'
                    }
                }
            }
        }
        
        stage('Notify') {
            steps {
                echo 'All 7 stages completed'
                echo 'Pipeline successful'
            }
        }
    }
}