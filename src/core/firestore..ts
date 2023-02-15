import { initializeApp, applicationDefault } from 'firebase-admin/app';

const app = initializeApp();

initializeApp({
  credential: applicationDefault(),
  projectId: 'base-template-vite-ts-56843'
});
