import * as TaskManager from 'expo-task-manager';


TaskManager.defineTask('myTask', async () => {
    console.log('Running background task...');
  
    // Your code here
  
    console.log('Background task complete.');
  });
  