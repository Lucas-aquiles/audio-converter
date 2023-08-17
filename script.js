class Queue {
  constructor() {
    this.items = [];
  }

  addqueue(item) {
    this.items.push(item);
  }

  async subtractqueue() {
    if (!this.isEmpty()) {
      const item = this.items.shift();
      await item();
    }
  }

  isEmpty() {
    return this.items.length === 0;
  }

  async processAll() {
    while (!this.isEmpty()) {
      await this.subtractqueue();
    }
  }
}

// Ejemplo de uso
const queue = new Queue();

queue.addqueue(async () => {
  console.log("Proceso 1 empezando...");
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulando un proceso que toma 3 segundos
  console.log("Proceso 1 completado.");
});

queue.addqueue(async () => {
  console.log("Proceso 2 empezando...");
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulando un proceso que toma 2 segundos
  console.log("Proceso 2 completado.");
});

queue.addqueue(async () => {
  console.log("Proceso 3 empezando...");
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulando un proceso que toma 4 segundos
  console.log("Proceso 3 completado.");
});

async function runQueue() {
  await queue.processAll();
  console.log("Todos los procesos han sido completados.");
}

runQueue();