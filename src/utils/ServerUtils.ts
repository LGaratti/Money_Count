// import { createServer, Model } from 'miragejs';
// import { Label, Operation } from '../interfaces/Operation';
// import { uuid } from 'uuidv4';
// 
// const ENDPOINT = import.meta.env.VITE_ENDPOINT;
// 
// export function makeServer({ environment = 'development' }) { 
//   return createServer({
//     environment,
//     // factories: {
//     //   operation:  
//     // }
//     models: {
//       operation: Model.extend<Partial<Operation>>({}),
//       label: Model.extend<Partial<Label>>({}),
//     },
//     routes() {
//       this.namespace = ENDPOINT;
//       this.get('operations_labels');
//     }
//   })
// }
// export default function () {
//   createServer({
//     
//     models: {
//       operation: Model.extend<Partial<Operation>>({}),
//       label: Model.extend<Partial<Label>>({})
//     },
// 
//     seeds(server) {
//       // Aggiungi qui i dati iniziali per le operazioni e le etichette
//       server.create("operation", { 
//         operation_id: uuid(),
//         name: "Pippo",
//         amount: 1000,
//         first_date: new Date(),
//         labels: {
//           label_id: uuid(),
//           name:"gain",
//           color_rgb: "green",
//         },
//       })
//     },
// 
//     routes() {
//       this.namespace = 'api';
// 
//       // Simula la fetch delle operazioni con le etichette
//       this.get('/operations_labels', (schema) => {
//         return schema.db.operations.map(operation => {
//           return {
//             operation: operation,
//             label: schema.db.labels.findBy({ operation_id: operation.id })
//           };
//         });
//       });
// 
//       // Simula la fetch delle etichette
//       this.get('/labels', (schema) => {
//         
//         return schema.db.labels.all();
//       });
// 
//       // Aggiungi qui altre route per inserire o modificare dati
//     },
//   });
// }
