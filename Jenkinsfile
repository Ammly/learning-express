pipeline {
  agent any
  stages {
    stage('build') {
      agent any
      steps {
        tool 'node'
        sh '''node --version
npm --version'''
      }
    }

  }
}