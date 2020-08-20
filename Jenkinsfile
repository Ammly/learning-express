pipeline {
  agent any
  
  stages {
    stage('build') {
      steps {
        nodejs('node'){
           npm install
           npm run prod
        }
      }
    }

  }
}
