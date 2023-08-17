
document.addEventListener("DOMContentLoaded", () => {
  const one = document.getElementById("one");
  const two = document.getElementById("two");
  const three = document.getElementById("three");
  const btn = document.querySelector("#btn");
  const btn1 = document.querySelector("#btn1");

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

  const queue = new Queue();

  btn.addEventListener("click", () => {
    let colorstyle = ["change", "changetwo", "changethree"];
    let divContainer = [one, two, three];
    let time=[1000 , 2000 , 3000]
    for (let i = 0; i < colorstyle.length; i++) {
      queue.addqueue(async () => {
        console.log(` Proceso empezando ${colorstyle[i]}`);
        await new Promise((resolve) =>
          setTimeout(() => {
            divContainer[i].classList.add(colorstyle[i]);
            resolve();
          }, time[i])
        );
        console.log(` Proceso  terminando ${colorstyle[i]}`);
      });
    }

    runQueue();
  });

  async function runQueue() {
    await queue.processAll();
    console.log("Todos los procesos completados");
  }
  btn1.addEventListener("click", () => {
    location.reload();
  });
});
